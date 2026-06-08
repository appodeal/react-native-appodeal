#!/usr/bin/env node
// Updates the README.md dependency blocks from the Appodeal Wizard API.
// API output is used verbatim; only the iOS Podfile target gets RN linking injected.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// API base URL — required, supplied via the APPODEAL_API_URL env var (set by the
// GitHub Action / your shell). No fallback: fail loudly rather than hit a guessed host.
const API = (() => {
  const raw = process.env.APPODEAL_API_URL;
  if (!raw) {
    throw new Error('APPODEAL_API_URL env var is required');
  }
  return raw.replace(/\/+$/, '');
})();
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const README = join(ROOT, 'README.md');

// Category codes returned by the /sdks endpoint.
const CATEGORY_NETWORK = 2;
const CATEGORY_SERVICE = 3;

/** Read the single source-of-truth version from package.json. */
async function getVersion() {
  const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
  if (!pkg.version) throw new Error('package.json has no "version" field');
  return pkg.version;
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'content-type': 'application/json', accept: '*/*' },
    signal: AbortSignal.timeout(30_000),
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API ${path} -> HTTP ${res.status} ${res.statusText}`);
  }
  return res;
}

/** Collect every version id from a list of {versions:[{id}]} entries. */
function collectVersionIds(entries) {
  return (entries ?? []).flatMap((e) => (e.versions ?? []).map((v) => v.id));
}

/** Run the 3-step recommended pipeline and return the rendered dependency text. */
async function fetchDependencyBlock(platform, version, lang) {
  // Step 1 — recommended mediations.
  const mediationsRes = await apiFetch(
    `/v4/${platform}/${version}/mediations?recommended=true`
  );
  const mediations = collectVersionIds((await mediationsRes.json()).mediations);

  // Step 2 — recommended sdks for those mediations, split into networks / services.
  const sdksRes = await apiFetch(`/v4/${platform}/${version}/sdks?recommended=true`, {
    method: 'POST',
    body: JSON.stringify({ mediations, networks: [], services: [] }),
  });
  const sdks = (await sdksRes.json()).sdks ?? [];
  const networks = collectVersionIds(sdks.filter((s) => s.category === CATEGORY_NETWORK));
  const services = collectVersionIds(sdks.filter((s) => s.category === CATEGORY_SERVICE));

  // Step 3 — render. iOS has no language suffix (always Ruby).
  const path =
    platform === 'ios'
      ? `/v4/${platform}/${version}/dependencies`
      : `/v4/${platform}/${version}/dependencies/${lang}`;
  const depsRes = await apiFetch(path, {
    method: 'POST',
    body: JSON.stringify({ mediations, networks, services }),
  });
  return (await depsRes.text()).replace(/\t/g, '    ');
}

/** Wrap rendered code in a fenced Markdown block. */
function fenced(lang, body) {
  return `${lang}\n${body.trimEnd()}\n\`\`\``;
}

/**
 * Keep only the `dependencies { ... }` block from the Android response. The Wizard
 * prepends a `repositories { ... }` block (already documented separately in the README's
 * "Add repository into android/build.gradle" section) and a build.gradle.kts label
 * comment, which would otherwise duplicate the repository setup and mislead readers.
 */
function androidDependenciesOnly(text) {
  const idx = text.search(/^dependencies\s*\{/m);
  if (idx === -1) {
    throw new Error('Could not find `dependencies {` in the Android API response');
  }
  return text.slice(idx);
}

/**
 * Inject the React Native linking lines into the iOS Podfile target. The Wizard renders
 * a plain native target (`target 'Sample' do ... end`); RN apps additionally need the
 * autolinking calls, otherwise the copied Podfile won't build. Everything else from the
 * API response is left untouched.
 */
function addReactNativeLinking(podfile) {
  const linking = [
    '',
    '    use_modular_headers!',
    '',
    '    config = use_native_modules!',
    '    use_react_native!(:path => config[:reactNativePath])',
  ].join('\n');
  // The target block is the last one in the response; insert before its closing `end`.
  const trimmed = podfile.trimEnd();
  const patched = trimmed.replace(/\n[ \t]*end$/, `${linking}\nend`);
  if (patched === trimmed) {
    throw new Error('Could not locate the iOS Podfile target `end` to inject RN linking');
  }
  return patched;
}

/**
 * Replace everything between the HTML-comment markers for `name` with `block`.
 * Markers live OUTSIDE the fenced code block so they stay invisible in rendered Markdown:
 *   <!-- appodeal-deps:NAME:start ... -->   ...block...   <!-- appodeal-deps:NAME:end -->
 */
function replaceBetweenMarkers(readme, name, block) {
  const startRe = new RegExp(`<!--\\s*appodeal-deps:${name}:start\\b[^>]*-->`);
  const endRe = new RegExp(`<!--\\s*appodeal-deps:${name}:end\\s*-->`);
  const startMatch = readme.match(startRe);
  if (!startMatch) throw new Error(`Marker appodeal-deps:${name}:start not found in README.md`);
  const startIdx = startMatch.index + startMatch[0].length;

  const endMatch = readme.slice(startIdx).match(endRe);
  if (!endMatch) throw new Error(`Marker appodeal-deps:${name}:end not found after start in README.md`);
  const endIdx = startIdx + endMatch.index;

  return `${readme.slice(0, startIdx)}\n${block}\n${readme.slice(endIdx)}`;
}

async function main() {
  const version = await getVersion();
  console.log(`Updating README dependency lists for Appodeal SDK ${version}`);

  // android uses kts (`kt`) verbatim; ios ignores the language, returns Ruby, and gets
  // the React Native linking injected into its target.
  const android = androidDependenciesOnly(await fetchDependencyBlock('android', version, 'kt'));
  const ios = addReactNativeLinking(await fetchDependencyBlock('ios', version));

  let readme = await readFile(README, 'utf8');
  readme = replaceBetweenMarkers(readme, 'android', fenced('``` kotlin', android));
  readme = replaceBetweenMarkers(readme, 'ios', fenced('```ruby', ios));

  await writeFile(README, readme, 'utf8');
  console.log('Done: README dependency blocks updated.');
}

main().catch((err) => {
  console.error(`\n✖ ${err.message}`);
  process.exit(1);
});
