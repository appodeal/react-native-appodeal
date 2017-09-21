'use strict';

import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

const RNAppodeal = NativeModules.RNAppodeal;

const eventHandlers = {
  onInterstitialLoaded: new Map(),
  onInterstitialClicked: new Map(),
  onInterstitialClosed: new Map(),
  onInterstitialFailedToLoad: new Map(),
  onInterstitialShown: new Map(),

  onBannerClicked: new Map(),
  onBannerFailedToLoad: new Map(),
  onBannerLoaded: new Map(),
  onBannerShown: new Map(),

  onRewardedVideoClosed: new Map(),
  onRewardedVideoFailedToLoad: new Map(),
  onRewardedVideoFinished: new Map(),
  onRewardedVideoLoaded: new Map(),
  onRewardedVideoShown: new Map(),

  onNonSkippableVideoClosed: new Map(),
  onNonSkippableVideoFailedToLoad: new Map(),
  onNonSkippableVideoFinished: new Map(),
  onNonSkippableVideoLoaded: new Map(),
  onNonSkippableVideoShown: new Map(),  
};

const NONE = 0;
const INTERSTITIAL = 3;
const BANNER = 4;
const BANNER_TOP = 8;
const BANNER_BOTTOM = 16;
const REWARDED_VIDEO = 128;
const NON_SKIPPABLE_VIDEO = 256;

const LogLevel = {
  none: 'none',
  debug: 'debug',
  verbose: 'verbose'
}

const addEventListener = (type, handler) => {
  switch (type) {
    case 'onInterstitialLoaded':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, (isPrecache) => { handler(isPrecache); }));
      break;
    case 'onInterstitialClicked':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onInterstitialClosed':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onInterstitialFailedToLoad':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onInterstitialShown':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;

    case 'onBannerLoaded':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, (height, isPrecache) => { handler(height, isPrecache); }));
      break;
    case 'onBannerFailedToLoad':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onBannerClicked':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onBannerShown':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;


    case 'onRewardedVideoClosed':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, (isFinished) => { handler(isFinished); }));
      break;
    case 'onRewardedVideoFailedToLoad':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onRewardedVideoFinished':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, (amount, currency) => { handler(amount, currency); }));
      break;
    case 'onRewardedVideoLoaded':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onRewardedVideoShown':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;

    case 'onNonSkippableVideoClosed':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, (isFinished) => { handler(isFinished); }));
      break;
    case 'onNonSkippableVideoFailedToLoad':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onNonSkippableVideoFinished':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onNonSkippableVideoLoaded':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    case 'onNonSkippableVideoShown':
      eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, handler));
      break;
    default:
      console.log(`Event with type ${type} does not exist.`);
  }
}

const removeEventListener = (type, handler) => {
  if (!eventHandlers[type].has(handler)) {
    return;
  }
  eventHandlers[type].get(handler).remove();
  eventHandlers[type].delete(handler);
}

const removeAllListeners = () => {
  DeviceEventEmitter.removeAllListeners('onInterstitialLoaded');
  DeviceEventEmitter.removeAllListeners('onInterstitialClicked');
  DeviceEventEmitter.removeAllListeners('onInterstitialClosed');
  DeviceEventEmitter.removeAllListeners('onInterstitialFailedToLoad');
  DeviceEventEmitter.removeAllListeners('onInterstitialShown');

  DeviceEventEmitter.removeAllListeners('onBannerLoaded');
  DeviceEventEmitter.removeAllListeners('onBannerFailedToLoad');
  DeviceEventEmitter.removeAllListeners('onBannerClicked');
  DeviceEventEmitter.removeAllListeners('onBannerShown');

  DeviceEventEmitter.removeAllListeners('onRewardedVideoFailedToLoad');
  DeviceEventEmitter.removeAllListeners('onRewardedVideoClosed');
  DeviceEventEmitter.removeAllListeners('onRewardedVideoFinished');
  DeviceEventEmitter.removeAllListeners('onRewardedVideoLoaded');
  DeviceEventEmitter.removeAllListeners('onRewardedVideoShown');

  DeviceEventEmitter.removeAllListeners('onNonSkippableVideoClosed');
  DeviceEventEmitter.removeAllListeners('onNonSkippableVideoFailedToLoad');
  DeviceEventEmitter.removeAllListeners('onNonSkippableVideoFinished');
  DeviceEventEmitter.removeAllListeners('onNonSkippableVideoLoaded');
  DeviceEventEmitter.removeAllListeners('onNonSkippableVideoShown');
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