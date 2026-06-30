/**
 * Appodeal Consent Types
 *
 * Contains all consent-related type definitions for GDPR compliance
 * and user privacy management.
 */

/**
 * Consent status for GDPR compliance
 */
export enum AppodealConsentStatus {
  UNKNOWN = 0,
  REQUIRED = 1,
  NOT_REQUIRED = 2,
  OBTAINED = 3,
}

/**
 * Privacy Entry Point requirement status for US State Regulations (CCPA, CPA,
 * VCDPA, and others) and EEA re-consent.
 *
 * Available since Appodeal SDK 4.2.0. Becomes meaningful only after
 * `requestConsentInfoUpdate` completes; before that it is `UNKNOWN`.
 *
 * Use it to decide whether to surface a "Do Not Sell or Share My Personal
 * Information" / Privacy Settings button in your app UI.
 */
export enum AppodealPrivacyOptionsStatus {
  UNKNOWN = 0,
  REQUIRED = 1,
  NOT_REQUIRED = 2,
}
