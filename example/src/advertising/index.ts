import {
    Appodeal,
    AppodealAdType,
    AppodealInterstitialEvent,
    AppodealRewardedEvent,
    AppodealBannerEvent,
    AppodealLogLevel,
} from 'react-native-appodeal';
import { Platform } from 'react-native';


export const initialize = (consent: boolean, testing: boolean) => {
    // Setup callbacks
    registerListeners()
    // Set extras
    Appodeal.setExtras({
        "some_number": 10,
        "some_string": "string"
    })
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

export enum BannerShowStyle {
    BOTTOM = "Bottom",
    TOP = "Top",
    VIEW = "View",
    MREC = "MREC"
}


export const isViewBannerStyle = (style: BannerShowStyle) => style === BannerShowStyle.VIEW || style === BannerShowStyle.MREC; 

export const bannerAdType = (style: BannerShowStyle) => {
    switch (style) {
        case BannerShowStyle.BOTTOM: return AppodealAdType.BANNER_BOTTOM;
        case BannerShowStyle.TOP: return AppodealAdType.BANNER_TOP;
        default: return AppodealAdType.BANNER;
    }
}

const constants = {
    appKey: Platform.OS === "ios" ? 
        "dee74c5129f53fc629a44a690a02296694e3eef99f2d3a5f" : 
        "fee50c333ff3825fd6ad6d38cff78154de3025546d47a84f",
    adTypes: AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER | AppodealAdType.MREC,
    logLevel: AppodealLogLevel.DEBUG,
    user: {
        age: 23,
        gender: 'male',
        id: 'some attribution id'
    },
}

let levelsPlayed = 0;

const registerListeners = () => {
    // Interstitial callbacks
    Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, (event: any) =>
        console.log("Interstitial loaded. Precache: ", event.isPrecache)
    )
    Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => {
        console.log("Interstitial shown")
        levelsPlayed += 1
        Appodeal.setSegmentFilter({
            "levels_played": levelsPlayed,
            "player_rank": "gold",
            "paid": false
        })
    })
    Appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () => 
        console.log("Interstitial expired")
    )
    Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
        console.log("Interstitial clicked")
    )
    Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () => 
        console.log("Interstitial closed")
    )
    Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
        console.log("Interstitial failed to load")
    )
    Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
        console.log("Interstitial failed to show")
    )

    // Banner callbacks
    Appodeal.addEventListener(AppodealBannerEvent.LOADED, (event: any) =>
        console.log("Banner loaded. Height: ", event.height + ", precache: " + event.isPrecache)
    )
    Appodeal.addEventListener(AppodealBannerEvent.SHOWN, () =>
        console.log("Banner shown")
    )
    Appodeal.addEventListener(AppodealBannerEvent.EXPIRED, () =>
        console.log("Banner expired")
    )
    Appodeal.addEventListener(AppodealBannerEvent.CLICKED, () =>
        console.log("Banner clicked")
    )
    Appodeal.addEventListener(AppodealBannerEvent.FAILED_TO_LOAD, () =>
        console.log("Banner failed to load")
    )

    // Rewarded video callbacks
    Appodeal.addEventListener(AppodealRewardedEvent.LOADED, (event: any) =>
        console.log("Rewarded video loaded. Precache: ", event.isPrecache)
    )
    Appodeal.addEventListener(AppodealRewardedEvent.SHOWN, () =>
        console.log("Rewarded video shown")
    )
    Appodeal.addEventListener(AppodealRewardedEvent.EXPIRED, () =>
        console.log("Rewarded video expired")
    )
    Appodeal.addEventListener(AppodealRewardedEvent.REWARD, (event: any) =>
        console.log("Rewarded video finished. Amount: ", event.amount + ", currency: " + event.currency)
    )
    Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, (event: any) =>
        console.log("Rewarded video closed: ", event.isFinished)
    )
    Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_LOAD, () =>
        console.log("Rewarded video failed to load")
    )
    Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_SHOW, () =>
        console.log("Rewarded video failed to show")
    )
}
