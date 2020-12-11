'use strict';

import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import {
  AdTypeType,
  AppodealLogLevel,
  AppodealGender,
  AppodealConsentStatus,
  AppodealConsentRegulation
} from './RNAppodealTypes'

const RNAppodeal = NativeModules.RNAppodeal;

type EventHandler = () => void
type Event = string
type ConsentHandler = (status: AppodealConsentStatus, regulation: AppodealConsentRegulation) => void

const handler = () => {}
const emitter = new NativeEventEmitter(RNAppodeal);
const subscriptions = new Map<EventHandler, any>();

const addEventListener = (event: Event, handler: EventHandler) => {
  let listener = emitter.addListener(event, handler);
  subscriptions.set(handler, listener);
  return { remove: () => removeEventListener(event, handler) };
};

const removeEventListener = (event: Event, handler: EventHandler) => {
  const listener = subscriptions.get(handler);
  listener.remove();
  subscriptions.delete(handler);
};

const removeAllListeners = () => {
  subscriptions.forEach((listener, key, map) => {
    listener.remove();
    map.delete(key);
  });
};


export default {
  ...RNAppodeal,
  addEventListener,
  removeEventListener,
  removeAllListeners,
  initialize: (appKey: String, adTypes: AdTypeType, consent?: boolean) => {
    consent !== undefined ?
      RNAppodeal.initialize(appKey, adTypes, consent) :
      RNAppodeal.initializeWithConsentReport(appKey, adTypes)
  },
  synchroniseConsent: (appKey: String, handler: ConsentHandler) => {
    RNAppodeal.synchroniseConsent(appKey, handler)
  },
  show: (adTypes: AdTypeType, placement: string, callback = handler) => {
    RNAppodeal.show(adTypes, placement, callback)
  },
  isLoaded: (adTypes: AdTypeType, callback = handler) => {
    RNAppodeal.isLoaded(adTypes, callback)
  },
  canShow: (adTypes: AdTypeType, placement: string, callback = handler) => {
    RNAppodeal.canShow(adTypes, placement, callback)
  },
  cache: (adTypes: AdTypeType) => {
    RNAppodeal.cache(adTypes)
  },
  hide: (adTypes: AdTypeType) => {
    RNAppodeal.hide(adTypes)
  },
  setAutoCache: (adTypes: AdTypeType, value: boolean) => {
    RNAppodeal.setAutoCache(adTypes, value)
  },
  isPrecache: (adTypes: AdTypeType, callback = handler) => {
    RNAppodeal.isPrecache(adTypes, callback)
  },
  setTabletBanners: (value: boolean) => {
    RNAppodeal.setTabletBanners(value)
  },
  setSmartBanners: (value: boolean) => {
    RNAppodeal.setSmartBanners(value)
  },
  setBannerAnimation: (value: boolean) => {
    RNAppodeal.setBannerAnimation(value)
  },
  setBannerBackground: (value: boolean) => {
    RNAppodeal.setBannerBackground(value)
  },
  updateConsent: (value: boolean) => {
    RNAppodeal.updateConsent(value)
  },
  forceShowConsentDialog: (callback = handler) => {
    RNAppodeal.forceShowConsentDialog(callback);
  },
  setTesting: (value: boolean) => {
    RNAppodeal.setTesting(value)
  },
  setLogLevel: (value: AppodealLogLevel) => {
    RNAppodeal.setLogLevel(value)
  },
  setChildDirectedTreatment: (value: boolean) => {
    RNAppodeal.setChildDirectedTreatment(value)
  },
  setOnLoadedTriggerBoth:(value: boolean) => {
    RNAppodeal.setOnLoadedTriggerBoth(value)
  },
  disableNetwork: (network: string, adTypes: AdTypeType) => {
    RNAppodeal.disableNetwork(network, adTypes)
  },
  getVersion: (callback = handler) => {
    RNAppodeal.getVersion(callback)
  },
  setSegmentFilter: (filter: { [key: string]: any }) => {
    RNAppodeal.setSegmentFilter(filter)
  },
  setExtras: (extras: { [key: string]: any }) => {
    RNAppodeal.setExtras(extras)
  },
  trackInAppPurchase: (amount: number, currency: string) => {
    RNAppodeal.trackInAppPurchase(amount, currency)
  },
  getRewardParameters: (placement: string, callback = handler) => {
    RNAppodeal.getRewardParameters(placement, callback)
  },
  predictedEcpm: (adType: AdTypeType, callback = handler) => {
    RNAppodeal.predictedEcpm(adType, callback)
  },
  setAge: (age: string) => {
    RNAppodeal.setAge(age)
  },
  setGender: (gender: AppodealGender) => {
    RNAppodeal.setGender(gender)
  },
  setUserId: (id: string) => {
    RNAppodeal.setUserId(id)
  },
  hasConsent: (vendor: string, callback = handler) => {
    RNAppodeal.hasConsent(vendor, callback)
  },
  requestAndroidMPermissions: (callback = handler) => {
    RNAppodeal.requestAndroidMPermissions(callback)
  },
  muteVideosIfCallsMuted: (value: boolean) => {
    RNAppodeal.muteVideosIfCallsMuted(value)
  },
  showTestScreen: () => {
    RNAppodeal.showTestScreen()
  },
  disableLocationPermissionCheck: () => {
    RNAppodeal.disableLocationPermissionCheck()
  },
  disableWriteExternalStoragePermissionCheck: () => {
    RNAppodeal.disableWriteExternalStoragePermissionCheck()
  },
  setSharedAdsInstanceAcrossActivities: (value: boolean) => {
    RNAppodeal.setSharedAdsInstanceAcrossActivities(value)
  }
};