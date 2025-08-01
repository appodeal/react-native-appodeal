/**
 * Appodeal SDK for React Native
 *
 * This module provides a complete interface to the Appodeal SDK for React Native applications.
 * It includes functionality for:
 * - Ad management (banner, interstitial, rewarded video, MREC)
 * - Analytics and revenue tracking
 * - In-app purchase validation
 * - Consent management (GDPR compliance)
 * - Event handling and callbacks
 *
 * The module uses React Native TurboModules for optimal performance and type safety.
 */

// Appodeal types and interfaces
import { AppodealAdType, AppodealLogLevel } from './types';
import type {
  AppodealAndroidPurchase,
  AppodealConsentStatus,
  AppodealIOSPurchase,
  AppodealReward,
  Map,
} from './types';

// Native module and validation types
import NativeAppodeal from './specs/NativeAppodealModule';
import type { AppodealPurchaseValidationResult } from './types/AppodealPurchaseValidationResult';

// Event manager
import AppodealEventManagerInstance from './RNAppodealEventManager';

// Type definitions
type EventHandler = (params?: any) => void;
type Event = string;

/**
 * Appodeal SDK interface using Turbo modules
 */
export interface Appodeal {
  /**
   * Adds event listeners to Appodeal SDK
   * @param event Event name
   * @param handler Event listener callback handler
   * @returns Subscription object with remove method
   */
  addEventListener(event: Event, handler: EventHandler): { remove: () => void };
  /**
   * Removes listener for specific event
   * @param event Event name
   * @param handler Event handler
   */
  removeEventListener(event: Event, handler: EventHandler): void;
  /**
   * Removes all event listener
   */
  removeAllListeners(): void;
  /**
   * Initialize Appodeal SDK
   * @param appKey Application app key
   * @param adTypes Ad types mask
   */
  initialize(appKey: string, adTypes: AppodealAdType): void;
  /**
   * Check that Appodeal SDK has been initialized for a given ad type mask
   * @param adTypes Ad type mask
   */
  isInitialized(adTypes: AppodealAdType): boolean;
  /**
   * Shows an ad if it has been loaded
   * @param adTypes Ad type to be shown
   * @param placement Optional placement name
   */
  show(adTypes: AppodealAdType, placement?: string): void;
  /**
   * Check if an ad is loaded
   * @param adTypes Ad types
   */
  isLoaded(adTypes: AppodealAdType): boolean;
  /**
   * Check if an ad can be shown for placement
   * @param adTypes Ad types
   * @param placement Optional placement name
   */
  canShow(adTypes: AppodealAdType, placement?: string): boolean;
  /**
   * Hides presented ad
   * @param adTypes Ad type mask
   */
  hide(adTypes: AppodealAdType): void;
  /**
   * Starting cache of an ad for specific ad type
   * @param adTypes Ad types mask
   */
  cache(adTypes: AppodealAdType): void;
  /**
   * Enables or disables autocache for specific ad type
   * @param adTypes Ad types mask
   * @param value Boolean flag indicating whether the autocache should be enabled or not
   */
  setAutoCache(adTypes: AppodealAdType, value: boolean): void;
  /**
   * Check that loaded ad is precache or not
   * @param adTypes Ad type
   */
  isPrecache(adTypes: AppodealAdType): boolean;
  /**
   * Force SDK use 728x90 or 320x50 banner size for top and bottom banner presentation size
   * @param value Boolean flag indicating tablet or phone banner size
   */
  setTabletBanners(value: boolean): void;
  /**
   * Enables or disables smart sizing that fills full width for banners
   * @param value Boolean flag indicating smart sizing supported
   */
  setSmartBanners(value: boolean): void;
  /**
   * Enables or disables banners refresh animation
   * @param value Boolean flag indicating banner refresh animation enabled
   */
  setBannerAnimation(value: boolean): void;
  /**
   * Sets that application is for kids
   * @param value Boolean flag indicating child directed treatment
   */
  setChildDirectedTreatment(value: boolean): void;
  /**
   * Returns current user consent status
   */
  consentStatus(): AppodealConsentStatus;
  /**
   * Revokes user consent
   */
  revokeConsent(): void;
  /**
   * Request consent parameters
   * @param appKey Appodeal app key
   */
  requestConsentInfoUpdate(appKey: string): Promise<AppodealConsentStatus>;
  /**
   * Shows consent form if consent status is REQUIRED
   */
  showConsentFormIfNeeded(): Promise<AppodealConsentStatus>;
  /**
   * Shows consent form
   */
  showConsentForm(): Promise<AppodealConsentStatus>;
  /**
   * Enables or disables test mode
   * @param value Boolean flag indicating test mode
   */
  setTesting(value: boolean): void;
  /**
   * Sets level of logged messages
   * @param value Log level
   */
  setLogLevel(value: AppodealLogLevel): void;
  /**
   * Enables or disables firing of callback on load in case precache ad was loaded
   * @param adTypes Ad type
   * @param value Boolean flag indicating precache callbacks activity
   */
  setTriggerPrecacheCallbacks(adTypes: AppodealAdType, value: boolean): void;
  /**
   * Disables ad network for specific ad types
   * @param network Network status
   * @param adTypes Ad type mask (defaults to ALL if not specified)
   */
  disableNetwork(network: string, adTypes?: AppodealAdType): void;
  /**
   * Get Appodeal SDK Plugin version
   */
  getVersion(): string;
  /**
   * Get Appodeal SDK Native Platform version
   */
  getPlatformSdkVersion(): string;
  /**
   * Set user identifier
   * @param id App specific user id
   */
  setUserId(id: string): void;
  /**
   * Set extras value in Appodeal SDK
   * @param key Nonnull extras key
   * @param value Nullable extras value
   */
  setExtrasValue(key: string, value: any | null): void;

  /**
   * Set custom state value in Appodeal SDK
   * @param key Nonnull custom state key
   * @param value Nullable custom state value
   */
  setCustomStateValue(key: string, value: any | null): void;

  /**
   * Returns reward parameters for given placement
   * @param placement Placement name
   */
  getRewardParameters(placement?: string): AppodealReward;
  /**
   * Returns predicted eCPM of loaded ad for ad type
   * @param adType Ad type
   */
  predictedEcpm(adType: AppodealAdType): number;
  /**
   * Track in app purchase
   * @param amount Purchase amount
   * @param currency Purchase currency
   */
  trackInAppPurchase(amount: number, currency: string): void;
  /**
   * Validate and track in app purchase
   * @param purchase Purchased product info
   * @returns Promise with validation result
   */
  validateAndTrackInAppPurchase(
    purchase: AppodealAndroidPurchase | AppodealIOSPurchase
  ): Promise<AppodealPurchaseValidationResult>;
  /**
   * Track in app event
   * @param name Event name
   * @param parameters Optional event parameters
   */
  trackEvent(name: string, parameters?: Map): void;

  /**
   * Set self-hosted Bidon environment endpoint
   * @param endpoint Bidon environment endpoint
   */
  setBidonEndpoint(endpoint: string): void;

  /**
   * Get self-hosted Bidon environment endpoint
   * @returns Bidon environment endpoint
   */
  getBidonEndpoint(): string | null;
}

/**
 * Plugin version constant
 */
const PLUGIN_VERSION = '3.8.1';

/**
 * Appodeal SDK implementation
 *
 * This object implements all the methods defined in the Appodeal interface.
 * Each method delegates to the corresponding native module method with proper
 * parameter handling and type conversion.
 */
const appodeal: Appodeal = {
  addEventListener: (
    event: Event,
    handler: EventHandler
  ): { remove: () => void } => {
    return AppodealEventManagerInstance.addEventListener(event, handler);
  },

  removeEventListener: (event: Event, handler: EventHandler): void => {
    AppodealEventManagerInstance.removeEventListener(event, handler);
  },

  removeAllListeners: (): void => {
    AppodealEventManagerInstance.removeAllListeners();
  },

  initialize: (appKey: string, adTypes: AppodealAdType): void => {
    NativeAppodeal.initialize(appKey, adTypes, PLUGIN_VERSION);
  },

  isInitialized: (adTypes: AppodealAdType): boolean => {
    return NativeAppodeal.isInitialized(adTypes);
  },

  show: (adTypes: AppodealAdType, placement?: string): void => {
    NativeAppodeal.show(adTypes, placement || 'default');
  },

  isLoaded: (adTypes: AppodealAdType): boolean => {
    return NativeAppodeal.isLoaded(adTypes);
  },

  canShow: (adTypes: AppodealAdType, placement?: string): boolean => {
    return NativeAppodeal.canShow(adTypes, placement || 'default');
  },

  hide: (adTypes: AppodealAdType): void => {
    NativeAppodeal.hide(adTypes);
  },

  cache: (adTypes: AppodealAdType): void => {
    NativeAppodeal.cache(adTypes);
  },

  setAutoCache: (adTypes: AppodealAdType, value: boolean): void => {
    NativeAppodeal.setAutoCache(adTypes, value);
  },

  isPrecache: (adTypes: AppodealAdType): boolean => {
    return NativeAppodeal.isPrecache(adTypes);
  },

  setTabletBanners: (value: boolean): void => {
    NativeAppodeal.setTabletBanners(value);
  },

  setSmartBanners: (value: boolean): void => {
    NativeAppodeal.setSmartBanners(value);
  },

  setBannerAnimation: (value: boolean): void => {
    NativeAppodeal.setBannerAnimation(value);
  },

  consentStatus: (): AppodealConsentStatus => {
    return NativeAppodeal.consentStatus();
  },

  revokeConsent: (): void => {
    NativeAppodeal.revokeConsent();
  },

  requestConsentInfoUpdate: (
    appKey: string
  ): Promise<AppodealConsentStatus> => {
    return NativeAppodeal.requestConsentInfoUpdateWithAppKey(appKey).then(
      (parameters) => parameters.status
    );
  },

  showConsentFormIfNeeded: (): Promise<AppodealConsentStatus> => {
    return NativeAppodeal.showConsentFormIfNeeded().then(
      (parameters) => parameters.status
    );
  },

  showConsentForm: (): Promise<AppodealConsentStatus> => {
    return NativeAppodeal.showConsentForm().then(
      (parameters) => parameters.status
    );
  },

  setChildDirectedTreatment: (value: boolean): void => {
    NativeAppodeal.setChildDirectedTreatment(value);
  },

  setTesting: (value: boolean): void => {
    NativeAppodeal.setTesting(value);
  },

  setLogLevel: (value: AppodealLogLevel): void => {
    NativeAppodeal.setLogLevel(value);
  },

  setTriggerPrecacheCallbacks: (
    adTypes: AppodealAdType,
    value: boolean
  ): void => {
    NativeAppodeal.setTriggerPrecacheCallbacks(adTypes, value);
  },

  disableNetwork: (
    network: string,
    adTypes: AppodealAdType = AppodealAdType.ALL
  ): void => {
    NativeAppodeal.disableNetwork(network, adTypes);
  },

  getVersion: (): string => {
    return PLUGIN_VERSION;
  },

  getPlatformSdkVersion: (): string => {
    return NativeAppodeal.getPlatformSdkVersion();
  },

  setUserId: (id: string): void => {
    NativeAppodeal.setUserId(id);
  },

  setExtrasValue: (key: string, value: any | null): void => {
    if (typeof value === 'string') {
      NativeAppodeal.setExtrasStringValue(key, value);
    } else if (typeof value === 'number' && Number.isInteger(value)) {
      NativeAppodeal.setExtrasIntegerValue(key, value);
    } else if (typeof value === 'number') {
      NativeAppodeal.setExtrasDoubleValue(key, value);
    } else if (typeof value === 'boolean') {
      NativeAppodeal.setExtrasBooleanValue(key, value);
    } else if (typeof value === 'object') {
      NativeAppodeal.setExtrasMapValue(key, value);
    } else if (value === null) {
      NativeAppodeal.removeExtrasValue(key);
    }
  },

  setCustomStateValue: (key: string, value: any | null): void => {
    if (typeof value === 'string') {
      NativeAppodeal.setCustomStateStringValue(key, value);
    } else if (typeof value === 'number' && Number.isInteger(value)) {
      NativeAppodeal.setCustomStateIntegerValue(key, value);
    } else if (typeof value === 'number') {
      NativeAppodeal.setCustomStateDoubleValue(key, value);
    } else if (typeof value === 'boolean') {
      NativeAppodeal.setCustomStateBooleanValue(key, value);
    } else if (typeof value === 'object') {
      NativeAppodeal.setCustomStateMapValue(key, value);
    } else if (value === null) {
      NativeAppodeal.removeCustomStateValue(key);
    }
  },

  getRewardParameters: (placement?: string): AppodealReward => {
    return NativeAppodeal.getRewardParameters(placement || 'default');
  },

  predictedEcpm: (adType: AppodealAdType): number => {
    return NativeAppodeal.predictedEcpm(adType);
  },

  trackInAppPurchase: (amount: number, currency: string) => {
    NativeAppodeal.trackInAppPurchase(amount, currency);
  },

  validateAndTrackInAppPurchase: (
    purchase: AppodealIOSPurchase | AppodealAndroidPurchase
  ): Promise<AppodealPurchaseValidationResult> => {
    return NativeAppodeal.validateAndTrackInAppPurchase(purchase);
  },

  trackEvent: (name: string, parameters: Map = {}) => {
    NativeAppodeal.trackEvent(name, parameters);
  },

  setBidonEndpoint: (endpoint: string): void => {
    NativeAppodeal.setBidonEndpoint(endpoint);
  },

  getBidonEndpoint: (): string | null => {
    return NativeAppodeal.getBidonEndpoint();
  },
};

export default appodeal;
