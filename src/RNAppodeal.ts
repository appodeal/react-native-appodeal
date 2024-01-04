"use strict";

import { NativeModules, NativeEventEmitter, Platform } from "react-native";
import {
  AppodealLogLevel,
  AppodealConsentStatus,
  AppodealIOSPurchase,
  AppodealAndroidPurchase,
  AppodealReward,
} from "./RNAppodealTypes";

const RNAppodeal = NativeModules.RNAppodeal;

type Map = { [key: string]: any };
type EventHandler = (params?: any) => void;
type Event = string;
type AdType = number;

const dummyHandler = () => {};
const emitter = new NativeEventEmitter(RNAppodeal);
const subscriptions = new Map<EventHandler, any>();

const _addEventListener = (event: Event, handler: EventHandler) => {
  let listener = emitter.addListener(event, handler);
  subscriptions.set(handler, listener);
  return { remove: () => _removeEventListener(event, handler) };
};

const _removeEventListener = (event: Event, handler: EventHandler) => {
  const listener = subscriptions.get(handler);
  listener.remove();
  subscriptions.delete(handler);
};

const _removeAllListeners = () => {
  subscriptions.forEach((listener, key, map) => {
    listener.remove();
    map.delete(key);
  });
};

/**
 * Appodeal SDK interface
 */
export interface Appodeal {
  /**
   * Adds event listeners to Appodeal SDK
   * @param event Event name
   * @param handler Event listener callback handler
   */
  addEventListener(event: Event, handler: EventHandler): void;
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
  initialize(appKey: string, adTypes: AdType): void;
  /**
   * Check that Appodeal SDK has been initialized for a given ad type mask
   * @param adTypes Ad type mask
   */
  isInitialized(adTypes: AdType): boolean;
  /**
   * Shows an ad if it has been loaded
   * @param adTypes Ad type to be shown
   * @param placement Optional placement name
   */
  show(adTypes: AdType, placement?: string): void;
  /**
   * Check if an ad is loaded
   * @param adTypes Ad types
   */
  isLoaded(adTypes: AdType): boolean;
  /**
   * Check if an ad can be shown for placement
   * @param adTypes Ad types
   * @param placement Optional placement name
   */
  canShow(adTypes: AdType, placement?: string): boolean;
  /**
   * Hides presented ad
   * @param adTypes Ad type mask
   */
  hide(adTypes: AdType): void;
  /**
   * Starting cache of an ad for specific ad type
   * @param adTypes Ad types mask
   */
  cache(adTypes: AdType): void;
  /**
   * Enables or disables autocache for specific ad type
   * @param adTypes Ad types masl
   * @param value Boolean flag indicating whether the autocache should be enabled or not
   */
  setAutoCache(adTypes: AdType, value: boolean): void;
  /**
   * Check that loaded ad is precache or not
   * @param adTypes Ad type
   */
  isPrecache(adTypes: AdType): boolean;
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
  setTriggerPrecacheCallbacks(adTypes: AdType, value: boolean): void;
  /**
   * Disables ad network for specific ad types
   * @param network Network status
   * @param adTypes Ad type mask
   */
  disableNetwork(network: string, adTypes: AdType): void;
  /**
   * Get Appodeal SDK version
   */
  getVersion(): string;
  /**
   * Set user identifier
   * @param id App specific user id
   */
  setUserId(id: string): void;
  /**
   * Set extras value in Appodeal SDK
   * @param value Nullable extras value
   * @param key Nonnull extras key
   */
  setExtrasValue(value: any | null, key: string): void;
  /**
   * Get Appodeal SDK extras
   */
  getExtras(): Map;
  /**
   * Set custom state value in Appodeal SDK
   * @param value Nullable custom state value
   * @param key Nonnull custom state key
   */
  setCustomStateValue(value: any | null, key: string): void;
  /**
   * Get Appodeal SDK custom state
   */
  getCustomState(): Map;
  /**
   * Returns reward parameters for given placement
   * @param placement Placement name
   */
  getRewardParameters(placement: string): AppodealReward;
  /**
   * Returns predicted eCPM of loaded ad for ad type
   * @param adType Ad type
   * @param callback Callback returning predicted eCPM
   */
  predictedEcpm(adType: AdType): number;
  /**
   * Track in app purchase
   * @param amount Purchase amount
   * @param currency Purchase currency
   */
  trackInAppPurchase(amount: number, currency: string): void;
  /**
   * Validate and track in app purchase
   * @param purchase Purchased product info
   */
  validateAndTrackInAppPurchase(
    purchase: AppodealAndroidPurchase | AppodealIOSPurchase,
    callback?: EventHandler
  ): void;
  /**
   * Track in app event
   * @param name  Event name
   * @param parameters Optional additional parameters
   */
  trackEvent(name: string, parameters?: Map): void;
}

const appodeal: Appodeal = {
  addEventListener: (event: Event, handler: EventHandler): void => {
    _addEventListener(event, handler);
  },

  removeEventListener: (event: Event, handler: EventHandler): void => {
    _removeEventListener(event, handler);
  },

  removeAllListeners: (): void => {
    _removeAllListeners();
  },

  initialize: (appKey: string, adTypes: AdType): void => {
    RNAppodeal.initializeWithAppKey(appKey, adTypes);
  },

  isInitialized: (adTypes: AdType): boolean => {
    return RNAppodeal.isInitialized(adTypes);
  },

  show: (adTypes: AdType, placement?: string): void => {
    RNAppodeal.show(adTypes, placement || null);
  },

  isLoaded: (adTypes: AdType): boolean => {
    return RNAppodeal.isLoaded(adTypes);
  },

  canShow: (adTypes: AdType, placement?: string): boolean => {
    return RNAppodeal.canShow(adTypes, placement || null);
  },

  hide: (adTypes: AdType): void => {
    RNAppodeal.hide(adTypes);
  },

  cache: (adTypes: AdType): void => {
    RNAppodeal.cache(adTypes);
  },

  setAutoCache: (adTypes: AdType, value: boolean): void => {
    RNAppodeal.setAutoCache(adTypes, value);
  },

  isPrecache: (adTypes: AdType): boolean => {
    return RNAppodeal.isPrecache(adTypes);
  },

  setTabletBanners: (value: boolean): void => {
    RNAppodeal.setTabletBanners(value);
  },

  setSmartBanners: (value: boolean): void => {
    RNAppodeal.setSmartBanners(value);
  },

  setBannerAnimation: (value: boolean): void => {
    RNAppodeal.setBannerAnimation(value);
  },

  consentStatus: (): AppodealConsentStatus => {
    return RNAppodeal.consentStatus();
  },

  revokeConsent: (): void => {
    RNAppodeal.revokeConsent();
  },

  requestConsentInfoUpdate: (
    appKey: string
  ): Promise<AppodealConsentStatus> => {
    return RNAppodeal.requestConsentInfoUpdateWithAppKey(appKey).then(
      (parameters) => parameters.status
    );
  },

  showConsentFormIfNeeded: (): Promise<AppodealConsentStatus> => {
    return RNAppodeal.showConsentFormIfNeeded().then(
      (parameters) => parameters.status
    );
  },

  showConsentForm: () => {
    return RNAppodeal.showConsentForm().then(
      (parameters) => parameters.status
    );
  },

  setChildDirectedTreatment: (value: boolean): void => {
    RNAppodeal.setChildDirectedTreatment(value);
  },

  setTesting: (value: boolean): void => {
    RNAppodeal.setTesting(value);
  },

  setLogLevel: (value: AppodealLogLevel): void => {
    RNAppodeal.setLogLevel(value);
  },

  setTriggerPrecacheCallbacks: (adTypes: AdType, value: boolean): void => {
    RNAppodeal.setTriggerPrecacheCallbacks(adTypes, value);
  },

  disableNetwork: (network: string, adTypes: AdType): void => {
    RNAppodeal.disableNetwork(network, adTypes);
  },

  getVersion: (): string => {
    return RNAppodeal.getVersion();
  },

  setUserId: (id: string): void => {
    RNAppodeal.setUserId(id);
  },

  setExtrasValue: (value: any | null, key: string): void => {
    if (Platform.OS == "ios") {
      RNAppodeal.setExtrasValue(value, key);
    } else if (typeof value === "string") {
      RNAppodeal.setExtrasStringValue(value, key);
    } else if (typeof value === "number" && Number.isInteger(value)) {
      RNAppodeal.setExtrasIntegerValue(value, key);
    } else if (typeof value === "number") {
      RNAppodeal.setExtrasDoubleValue(value, key);
    } else if (typeof value === "boolean") {
      RNAppodeal.setExtrasBooleanValue(value, key);
    } else if (typeof value === "object") {
      RNAppodeal.setExtrasMapValue(value, key);
    } else if (value === null) {
      RNAppodeal.removeExtrasValue(key);
    }
  },

  getExtras: (): Map => {
    return RNAppodeal.getExtras();
  },

  setCustomStateValue: (value: any | null, key: string): void => {
    if (Platform.OS == "ios") {
      RNAppodeal.setCustomStateValue(value, key);
    } else if (typeof value === "string") {
      RNAppodeal.setCustomStateStringValue(value, key);
    } else if (typeof value === "number" && Number.isInteger(value)) {
      RNAppodeal.setCustomStateIntegerValue(value, key);
    } else if (typeof value === "number") {
      RNAppodeal.setCustomStateDoubleValue(value, key);
    } else if (typeof value === "boolean") {
      RNAppodeal.setCustomStateBooleanValue(value, key);
    } else if (value === null) {
      RNAppodeal.removeCustomStateValue(key);
    }
  },

  getCustomState: (): Map => {
    return RNAppodeal.getCustomState();
  },

  getRewardParameters: (placement: string): AppodealReward => {
    return RNAppodeal.getRewardParameters(placement);
  },

  predictedEcpm: (adType: AdType): number => {
    return RNAppodeal.predictedEcpm(adType);
  },

  trackInAppPurchase: (amount: number, currency: string) => {
    RNAppodeal.trackInAppPurchase(amount, currency);
  },

  validateAndTrackInAppPurchase: (
    purchase: AppodealIOSPurchase | AppodealAndroidPurchase,
    callback?: EventHandler
  ) => {
    RNAppodeal.validateAndTrackInAppPurchase(
      purchase,
      callback || dummyHandler
    );
  },

  trackEvent: (name: string, parameters?: Map) => {
    RNAppodeal.trackEvent(name, parameters || null);
  },
};

export default appodeal;
