'use strict';

import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

const RNAppodeal = NativeModules.RNAppodeal;

const NONE = 0;
const INTERSTITIAL = 3;
const BANNER = 4;
const BANNER_BOTTOM = 8;
const BANNER_TOP = 16;
const REWARDED_VIDEO = 128;
const NON_SKIPPABLE_VIDEO = 256;

const eventEmitter = new NativeEventEmitter(RNAppodeal);

const eventHandlers = {
  onInterstitialLoaded: 'onInterstitialLoaded',
  onInterstitialClicked: 'onInterstitialClicked',
  onInterstitialClosed: 'onInterstitialClosed',
  onInterstitialFailedToLoad: 'onInterstitialFailedToLoad',
  onInterstitialShown: 'onInterstitialShown',

  onBannerClicked: 'onBannerClicked',
  onBannerFailedToLoad: 'onBannerFailedToLoad',
  onBannerLoaded: 'onBannerLoaded',
  onBannerShown: 'onBannerShown',

  onRewardedVideoClosed: 'onRewardedVideoClosed',
  onRewardedVideoFailedToLoad: 'onRewardedVideoFailedToLoad',
  onRewardedVideoFinished: 'onRewardedVideoFinished',
  onRewardedVideoLoaded: 'onRewardedVideoLoaded',
  onRewardedVideoShown: 'onRewardedVideoShown',

  onNonSkippableVideoClosed: 'onNonSkippableVideoClosed',
  onNonSkippableVideoFailedToLoad: 'onNonSkippableVideoFailedToLoad',
  onNonSkippableVideoFinished: 'onNonSkippableVideoFinished',
  onNonSkippableVideoLoaded: 'onNonSkippableVideoLoaded',
  onNonSkippableVideoShown: 'onNonSkippableVideoShown',
};

const LogLevel = {
  none: 'none',
  debug: 'debug',
  verbose: 'verbose'
}

const Gender = {
  male: 'male',
  female: 'female',
  other: 'other'
}

const _subscriptions = new Map();

const addEventListener = (event, handler) => {
  const mappedEvent = eventHandlers[event];
  if (mappedEvent) {
    let listener;
    listener = eventEmitter.addListener(mappedEvent, handler);
    _subscriptions.set(handler, listener);
    return {
      remove: () => removeEventListener(event, handler)
    };
  } else {
    console.warn(`Trying to subscribe to unknown event: "${event}"`);
    return {
      remove: () => {},
    };
  }
};

const removeEventListener = (type, handler) => {
  const listener = _subscriptions.get(handler);
  if (!listener) {
    return;
  }
  listener.remove();
  _subscriptions.delete(handler);
};

const removeAllListeners = () => {
  _subscriptions.forEach((listener, key, map) => {
    listener.remove();
    map.delete(key);
  });
};

module.exports = {
  ...RNAppodeal,
  INTERSTITIAL,
  BANNER,
  BANNER_TOP,
  BANNER_BOTTOM,
  REWARDED_VIDEO,
  NON_SKIPPABLE_VIDEO,
  LogLevel,
  Gender,
  addEventListener,
  removeEventListener,
  removeAllListeners,
  showToast: (message) => RNAppodeal.showToast(message),
  initialize: (appKey, adTypes) => RNAppodeal.initialize(appKey, adTypes),
  show: (adTypes, placement, cb = () => {}) => RNAppodeal.show(adTypes, placement, cb),
  isLoaded: (adTypes, cb = () => {}) => RNAppodeal.isLoaded(adTypes, cb),
  cache: (adTypes) => RNAppodeal.cache(adTypes),
  hide: (adTypes) => RNAppodeal.hide(adTypes),
  setAutoCache: (adTypes, value) => RNAppodeal.setAutoCache(adTypes, value),
  isPrecache: (adTypes, cb = () => {}) => RNAppodeal.isPrecache(adTypes, cb),
  setTabletBanners: (value) => RNAppodeal.setTabletBanners(value),
  setSmartBanners: (value) => RNAppodeal.setSmartBanners(value),
  setBannerAnimation: (value) => RNAppodeal.setBannerAnimation(value),
  setBannerBackground: (value) => RNAppodeal.setBannerBackground(value),
  setTesting: (value) => RNAppodeal.setTesting(value),
  setLogLevel: (value) => RNAppodeal.setLogLevel(value),
  setChildDirectedTreatment: (value) => RNAppodeal.setChildDirectedTreatment(value),
  setOnLoadedTriggerBoth: (adTypes, value) => RNAppodeal.setOnLoadedTriggerBoth(adTypes, value),
  disableNetwork: (network, adTypes) => RNAppodeal.disableNetwork(network, adTypes),
  disableLocationPermissionCheck: () => RNAppodeal.disableLocationPermissionCheck(),
  disableWriteExternalStoragePermissionCheck: () => RNAppodeal.disableWriteExternalStoragePermissionCheck(),
  requestAndroidMPermissions: (cb = () => {}) => RNAppodeal.requestAndroidMPermissions(cb),
  muteVideosIfCallsMuted: (value) => RNAppodeal.muteVideosIfCallsMuted(appKey, adTypes),
  showTestScreen: () => RNAppodeal.showTestScreen(),
  getVersion: (cb = () => {}) => RNAppodeal.getVersion(cb),
  canShow: (adTypes, placement) => RNAppodeal.initialize(appKey, adTypes),
  setCustomStringRule: (name, value) => RNAppodeal.setCustomStringRule(name, value),
  setCustomBooleanRule: (name, value) => RNAppodeal.setCustomBooleanRule(name, value),
  setCustomIntegerRule: (name, value) => RNAppodeal.setCustomIntegerRule(name, value),
  setCustomDoubleRule: (name, value) => RNAppodeal.setCustomDoubleRule(name, value),
  trackInAppPurchase: (amount, currency) => RNAppodeal.trackInAppPurchase(amount, currency),
  getRewardParameters: (placement, cb = () => {}) => RNAppodeal.getRewardParameters(placement, cb),
  setAge: (age) => RNAppodeal.setAge(age),
  setGender: (gender) => RNAppodeal.setGender(gender),
  setUserId: (id) => RNAppodeal.setUserId(id),
};