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
