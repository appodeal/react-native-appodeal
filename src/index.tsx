/**
 * Main Appodeal SDK entry point
 * Provides access to all Appodeal functionality including ads, analytics, and events
 */

// Main Appodeal interface
import Appodeal from './RNAppodeal';

// React Native components
export { default as AppodealBanner } from './RNAppodealBanner';
export { default as AppodealMrec } from './RNAppodealMrec';

// Export the main Appodeal interface
export default Appodeal;

// Export all types and enums for convenience
export {
  AppodealAdType,
  AppodealLogLevel,
  AppodealConsentStatus,
  AppodealIOSPurchaseType,
  AppodealAndroidPurchaseType,
} from './types';

// Export all type definitions
export type {
  AppodealReward,
  AppodealIOSPurchase,
  AppodealAndroidPurchase,
  AppodealAdRevenue,
  AppodealPurchaseValidationResult,
  Map,
} from './types';

// Export event namespaces for ad event handling
export {
  AppodealSdkEvents,
  AppodealBannerEvents,
  AppodealInterstitialEvents,
  AppodealRewardedEvents,
} from './RNAppodealEvents';
