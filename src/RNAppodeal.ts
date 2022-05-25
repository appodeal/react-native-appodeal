"use strict";

import { NativeModules, NativeEventEmitter, EventEmitter } from "react-native";
import {
  AppodealLogLevel,
  AppodealGDPRConsentStatus,
  AppodealCCPAConsentStatus,
  AppodealPurchaseType,
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
   * Shows an ad if it has been loaded
   * @param adTypes Ad type to be shown
   * @param placement Optional placement name
   * @param callback Optional callback indicating whether an ad was presented or not
   */
  show(adTypes: AdType, placement?: string, callback?: EventHandler);
  /**
   * Check if an ad is loaded
   * @param adTypes Ad types
   * @param callback Optional callback indicating whether an ad is loaded or not
   */
  isLoaded(adTypes: AdType, callback?: EventHandler);
  /**
   * Check if an ad can be shown for placement
   * @param adTypes Ad types
   * @param placement Optional placement name
   * @param callback Optional callback indicating whether an ad can be shown or not
   */
  canShow(adTypes: AdType, placement?: string, callback?: EventHandler);
  /**
   * Hides presented ad
   * @param adTypes Ad type mask
   */
  hide(adTypes: AdType);
  /**
   * Starting cache of an ad for specific ad type
   * @param adTypes Ad types mask
   */
  cache(adTypes: AdType);
  /**
   * Enables or disables autocache for specific ad type
   * @param adTypes Ad types masl
   * @param value Boolean flag indicating whether the autocache should be enabled or not
   */
  setAutoCache(adTypes: AdType, value: boolean);
  /**
   * Check that loaded ad is precache or not
   * @param adTypes Ad type
   * @param callback Optional callback indicating whether an ad is precache
   */
  isPrecache(adTypes: AdType, callback?: EventHandler);
  /**
   * Force SDK use 728x90 or 320x50 banner size for top and bottom banner presentation size
   * @param value Boolean flag indicating tablet or phone banner size
   */
  setTabletBanners(value: boolean);
  /**
   * Enables or disables smart sizing that fills full width for banners
   * @param value Boolean flag indicating smart sizing supported
   */
  setSmartBanners(value: boolean);
  /**
   * Enables or disables banners refresh animation
   * @param value Boolean flag indicating banner refresh animation enabled
   */
  setBannerAnimation(value: boolean);
  /**
   * Sets that application is for kids
   * @param value Boolean flag indicating child directed treatment
   */
  setChildDirectedTreatment(value: boolean);
  /**
   * Update GDPR consent status
   * @param value Consent status
   */
  updateGDPRConsent(value: AppodealGDPRConsentStatus);
  /**
   * Update CCPA consent status
   * @param value Consent status
   */
  updateCCPAConsent(value: AppodealCCPAConsentStatus);
  /**
   * Enables or disables test mode
   * @param value Boolean flag indicating test mode
   */
  setTesting(value: boolean);
  /**
   * Sets level of logged messages
   * @param value Log level
   */
  setLogLevel(value: AppodealLogLevel);
  /**
   * Enables or disables firing of callback on load in case precache ad was loaded
   * @param adTypes Ad type
   * @param value Boolean flag indicating precache callbacks activity
   */
  setTriggerPrecacheCallbacks(adTypes: AdType, value: boolean);
  /**
   * Disables ad network for specific ad types
   * @param network Network status
   * @param adTypes Ad type mask
   */
  disableNetwork(network: string, adTypes: AdType);
  /**
   * Get Appodeal SDK version
   * @param callback Callback returning current SDK version
   */
  getVersion(callback?: EventHandler);
  /**
   * Set user identifier
   * @param id App specific user id
   */
  setUserId(id: string);
  /**
   * Set extras value in Appodeal SDK
   * @param value Nullable extras value
   * @param key Nonnull extras key
   */
  setExtrasValue(value: any | null, key: string);
  /**
   * Get Appodeal SDK extras
   * @param callback Callback returning current SDK extras
   */
  getExtras(callback?: EventHandler);
  /**
   * Set custom state value in Appodeal SDK
   * @param value Nullable custom state value
   * @param key Nonnull custom state key
   */
  setCustomStateValue(value: any | null, key: string);
  /**
   * Get Appodeal SDK custom state
   * @param callback Callback returning current SDK custom state
   */
  getCustomState(callback?: EventHandler);
  /**
   * Returns reward parameters for given placement
   * @param placement Placement name
   * @param callback Callback returning reward parameters
   */
  getRewardParameters(placement: string, callback?: EventHandler);
  /**
   * Returns predicted eCPM of loaded ad for ad type
   * @param adType Ad type
   * @param callback Callback returning predicted eCPM
   */
  predictedEcpm(adType: AdType, callback?: EventHandler);
  /**
   * Track in app purchase
   * @param amount Purchase amount
   * @param currency Purchase currency
   */
  trackInAppPurchase(amount: number, currency: string);
  /**
   * Validate and track in app purchase
   * @param purchase Purchased product id
   * @param type Purchased product type
   * @param price Purchase price
   * @param currency Purchase currency
   * @param transaction Transaction id
   * @param parameters Custom parameters
   * @param callback Callback returning validation data
   */
  validateAndTrackInAppPurchase(
    purchase: string,
    type: AppodealPurchaseType,
    price: string,
    currency: string,
    transaction: string,
    parameters?: Map,
    callback?: EventHandler
  );
  /**
   * Track in app event
   * @param name  Event name
   * @param parameters Optional additional parameters
   */
  trackEvent(name: string, parameters?: Map);
}

const appodeal: Appodeal = {
  addEventListener: (event: Event, handler: EventHandler) => {
    _addEventListener(event, handler);
  },

  removeEventListener: (event: Event, handler: EventHandler) => {
    _removeEventListener(event, handler);
  },

  removeAllListeners: () => {
    _removeAllListeners();
  },

  initialize: (appKey: string, adTypes: AdType) => {
    RNAppodeal.initializeWithAppKey(appKey, adTypes);
  },

  show: (adTypes: AdType, placement?: string, callback?: EventHandler) => {
    RNAppodeal.show(adTypes, placement || null, callback || dummyHandler);
  },

  isLoaded: (adTypes: AdType, callback?: EventHandler) => {
    RNAppodeal.isLoaded(adTypes, callback);
  },

  canShow: (
    adTypes: AdType,
    placement?: string,
    callback?: EventHandler
  ) => {
    RNAppodeal.canShow(adTypes, placement || null, callback || dummyHandler);
  },

  hide: (adTypes: AdType) => {
    RNAppodeal.hide(adTypes);
  },

  cache: (adTypes: AdType) => {
    RNAppodeal.cache(adTypes);
  },

  setAutoCache: (adTypes: AdType, value: boolean) => {
    RNAppodeal.setAutoCache(adTypes, value);
  },

  isPrecache: (adTypes: AdType, callback?: EventHandler) => {
    RNAppodeal.isPrecache(adTypes, callback || dummyHandler);
  },

  setTabletBanners: (value: boolean) => {
    RNAppodeal.setTabletBanners(value);
  },

  setSmartBanners: (value: boolean) => {
    RNAppodeal.setSmartBanners(value);
  },

  setBannerAnimation: (value: boolean) => {
    RNAppodeal.setBannerAnimation(value);
  },

  updateGDPRConsent: (value: AppodealGDPRConsentStatus) => {
    RNAppodeal.updateGDPRConsent(value);
  },

  updateCCPAConsent: (value: AppodealCCPAConsentStatus) => {
    RNAppodeal.updateCCPAConsent(value);
  },

  setChildDirectedTreatment: (value: boolean) => {
    RNAppodeal.setChildDirectedTreatment(value);
  },

  setTesting: (value: boolean) => {
    RNAppodeal.setTesting(value);
  },

  setLogLevel: (value: AppodealLogLevel) => {
    RNAppodeal.setLogLevel(value);
  },

  setTriggerPrecacheCallbacks: (adTypes: AdType, value: boolean) => {
    RNAppodeal.setTriggerPrecacheCallbacks(adTypes, value);
  },

  disableNetwork: (network: string, adTypes: AdType) => {
    RNAppodeal.disableNetwork(network, adTypes);
  },

  getVersion: (callback?: EventHandler) => {
    RNAppodeal.getVersion(callback || dummyHandler);
  },

  setUserId: (id: string) => {
    RNAppodeal.setUserId(id);
  },
  setExtrasValue: (value: any | null, key: string) => {
    RNAppodeal.setExtrasValue(value, key);
  },

  getExtras: (callback?: EventHandler) => {
    RNAppodeal.getExtras(callback || dummyHandler);
  },

  setCustomStateValue: (value: any | null, key: string) => {
    RNAppodeal.setCustomStateValue(value, key);
  },

  getCustomState: (callback?: EventHandler) => {
    RNAppodeal.getExtras(callback);
  },

  getRewardParameters: (placement: string, callback?: EventHandler) => {
    RNAppodeal.getRewardParameters(placement, callback || dummyHandler);
  },

  predictedEcpm: (adType: AdType, callback?: EventHandler) => {
    RNAppodeal.predictedEcpm(adType, callback || dummyHandler);
  },

  trackInAppPurchase: (amount: number, currency: string) => {
    RNAppodeal.trackInAppPurchase(amount, currency);
  },

  validateAndTrackInAppPurchase: (
    purchase: string,
    type: AppodealPurchaseType,
    price: string,
    currency: string,
    transaction: string,
    parameters?: Map,
    callback?: EventHandler
  ) => {
    RNAppodeal.validateAndTrackInAppPurchase(
      purchase,
      type,
      price,
      currency,
      transaction,
      parameters || null,
      callback || dummyHandler
    );
  },

  trackEvent: (name: string, parameters?: Map) => {
    RNAppodeal.trackEvent(name, parameters || null);
  },
};

export default appodeal;
