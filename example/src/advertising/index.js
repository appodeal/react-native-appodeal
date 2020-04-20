import React from 'react';
import {
    Appodeal,
    AppodealAdType,
    AppodealInterstitialEvent,
    AppodealRewardedEvent,
    AppodealBannerEvent,
} from 'react-native-appodeal';


const constants = {
    appKey: 'dee74c5129f53fc629a44a690a02296694e3eef99f2d3a5f',
    adTypes: AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER,
    logLevel: 'debug',
    user: {
        age: 23,
        gender: 'male',
        id: 'some attribution id'
    },
}


const registerListeners = () => {
    // Interstitial callbacks
    Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, event => console.log("Interstitial loaded. Precache: ", event.isPrecache))
    Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => console.log("Interstitial shown"))
    Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () => console.log("Interstitial clicked"))
    Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () => console.log("Interstitial closed"))
    Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () => console.log("Interstitial failed to load"))
    Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () => console.log("Interstitial failed to show"))

    // Banner callbacks
    Appodeal.addEventListener(AppodealBannerEvent.LOADED, event => console.log("Banner loaded. Height: ", event.height + ", precache: " + event.isPrecache))
    Appodeal.addEventListener(AppodealBannerEvent.SHOWN, () => console.log("Banner shown"))
    Appodeal.addEventListener(AppodealBannerEvent.CLICKED, () => console.log("Banner clicked"))
    Appodeal.addEventListener(AppodealBannerEvent.FAILED_TO_LOAD, () => console.log("Banner failed to load"))

    // Rewarded video callbacks
    Appodeal.addEventListener(AppodealRewardedEvent.LOADED, () => console.log("Rewarded video loaded"))
    Appodeal.addEventListener(AppodealRewardedEvent.SHOWN, () => console.log("Rewarded video shown"))
    Appodeal.addEventListener(AppodealRewardedEvent.REWARD, event => console.log("Rewarded video finished. Amount: ", event.amount + ", currency" + event.currency))
    Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, event => console.log("Rewarded video closed: ", event.isFinished))
    Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_LOAD, () => console.log("Rewarded video failed to load"))
    Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_SHOW, () => console.log("Rewarded video failed to show"))
}

export const initialize = (consent, testing) => {
    // Setup callbacks
    registerListeners()
    // Set user settings
    Appodeal.setAge(constants.user.age)
    Appodeal.setGender(constants.user.gender)
    Appodeal.setUserId(constants.user.id)
    // Global settings
    Appodeal.disableLocationPermissionCheck()
    Appodeal.setLogLevel(constants.logLevel)
    Appodeal.setTesting(testing)
    // Initialize Appodeal
    Appodeal.initialize(
        constants.appKey,
        constants.adTypes,
        consent
    )
}