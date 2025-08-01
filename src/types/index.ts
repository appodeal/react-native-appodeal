/**
 * Appodeal SDK Type Definitions
 *
 * This file provides organized exports for all Appodeal SDK types.
 * Import from this file to get access to all type definitions.
 */

// Ad-related types
export { AppodealAdType } from './AppodealAdTypes';

export type { AppodealAdRevenue } from './AppodealAdTypes';

// Consent-related types
export { AppodealConsentStatus } from './AppodealConsentTypes';

// Purchase-related types
export {
  AppodealIOSPurchaseType,
  AppodealAndroidPurchaseType,
} from './AppodealPurchaseTypes';

export type {
  Map,
  AppodealIOSPurchase,
  AppodealAndroidPurchase,
} from './AppodealPurchaseTypes';

// Utility types
export { AppodealLogLevel } from './AppodealUtilityTypes';

export type { AppodealReward } from './AppodealUtilityTypes';

// Validation result type
export type { AppodealPurchaseValidationResult } from './AppodealPurchaseValidationResult';
