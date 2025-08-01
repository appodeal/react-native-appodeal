# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Prerequisites

Before you can contribute to this project, make sure you have the following requirements installed:

### System Requirements

- **Node.js**: Version 18 or higher
- **Yarn**: Version 3.6.1 or higher (required for workspaces)
- **Java Development Kit (JDK)**: Version 17 or higher
- **Android Studio**: Latest version with Android SDK
- **Xcode**: Version 14 or higher (macOS only)
- **iOS Simulator**: Available through Xcode (macOS only)

### React Native Development Environment

Follow the official React Native environment setup guide:
- 📱 [React Native CLI Quickstart](https://reactnative.dev/docs/set-up-your-environment)
- 🏗️ [New Architecture Setup](https://reactnative.dev/docs/the-new-architecture/landing-page)

### Appodeal Account & Documentation

To fully understand and test the SDK, you'll need:

- 🔑 **Appodeal Account**: Sign up at [appodeal.com](https://appodeal.com)
- 📚 **Official Documentation**: 
  - [Appodeal Main Docs](https://docs.appodeal.com)
  - [React Native Integration Guide](https://docs.appodeal.com/react-native/get-started)
  - [Android SDK Documentation](https://docs.appodeal.com/android/get-started)
  - [iOS SDK Documentation](https://docs.appodeal.com/ios/get-started)

### Development Tools

This project uses modern development tooling:

- 🎯 **TypeScript** for type safety
- 🧹 **ESLint + Prettier** for code quality
- 🧪 **Jest** for unit testing
- 📦 **React Native Builder Bob** for library building
- 🏗️ **Turbo** for monorepo management
- 🔄 **Release-it** for automated releases
- 🪝 **Lefthook** for git hooks
- 📝 **Conventional Commits** for commit messages

## Development workflow

This project is a monorepo managed using [Yarn workspaces](https://yarnpkg.com/features/workspaces). It contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> Since the project relies on Yarn workspaces, you cannot use [`npm`](https://github.com/npm/cli) for development.

The [example app](/example/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

If you want to use Android Studio or XCode to edit the native code, you can open the `example/android` or `example/ios` directories respectively in those editors. To edit the Objective-C or Swift files, open `example/ios/AppodealExample.xcworkspace` in XCode and find the source files at `Pods > Development Pods > react-native-appodeal`.

To edit the Java or Kotlin files, open `example/android` in Android studio and find the source files at `react-native-appodeal` under `Android`.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
yarn example start
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "AppodealExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

### Architecture Support

This library supports both React Native architectures:

- ✅ **Old Architecture (Paper)** - Located in `android/src/oldarch/` and legacy iOS files
- ✅ **New Architecture (Fabric/TurboModules)** - Located in `android/src/newarch/` and modern iOS files

When making changes:
- **Shared Logic**: Place in `android/src/main/` and root iOS files
- **Architecture-Specific**: Use the respective `oldarch/` or `newarch/` directories
- **Testing**: Test on both architectures using the example app

### Code Quality

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typecheck
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

#### Development
- `yarn`: Setup project by installing dependencies
- `yarn typecheck`: Type-check files with TypeScript
- `yarn lint`: Lint files with ESLint (`yarn lint --fix` to auto-fix)
- `yarn test`: Run unit tests with Jest
- `yarn clean`: Clean all build directories

#### Example App
- `yarn example start`: Start the Metro server for the example app
- `yarn example android`: Run the example app on Android
- `yarn example ios`: Run the example app on iOS

#### Build & Release
- `yarn prepare`: Build the library using Bob
- `yarn release`: Create a new release using release-it

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

## Getting Help & Resources

### 📚 Documentation

- **React Native Appodeal SDK**: [Migration Guide](./PUBLISHER_MIGRATION_GUIDE.md)
- **Appodeal Platform**: [docs.appodeal.com](https://docs.appodeal.com)
- **React Native Docs**: [reactnative.dev](https://reactnative.dev)
- **React Native New Architecture**: [New Architecture Docs](https://reactnative.dev/docs/the-new-architecture/landing-page)

### 🐛 Issues & Support

- **Bug Reports**: Use [GitHub Issues](https://github.com/appodeal/react-native-appodeal/issues)
- **Feature Requests**: Open a [GitHub Discussion](https://github.com/appodeal/react-native-appodeal/discussions)
- **Appodeal Support**: Contact [Appodeal Support](https://appodeal.com/support)

### 🔧 Development Tips

- **Testing with Real Ads**: Use test mode during development (`Appodeal.setTesting(true)`)
- **Debugging**: Check Metro logs and native logs (Xcode Console/Android Logcat)
- **Architecture Testing**: Test both Paper and Fabric architectures
- **Native Development**: Use Android Studio and Xcode for native debugging

### 📱 Example App Configuration

The example app is pre-configured with:
- Both architecture support (can be toggled)
- Sample ad placements and events
- Proper Appodeal integration examples

To set up with your own Appodeal app key:
1. Sign up at [appodeal.com](https://appodeal.com)
2. Create a new app and get your app key
3. Replace the app key in `example/src/App.tsx`
