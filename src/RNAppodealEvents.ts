/**
 * Appodeal SDK Event Constants
 *
 * This file contains all event names used by the Appodeal SDK for ad lifecycle events.
 * Events are organized by ad type for better code organization and type safety.
 */

/**
 * General Appodeal SDK events
 */
export namespace AppodealSdkEvents {
  /** Fired when the SDK is successfully initialized */
  export const INITIALIZED = 'onAppodealInitialized';
  /** Fired when ad revenue is received */
  export const AD_REVENUE = 'onAppodealDidReceiveRevenue';
}

/**
 * Banner ad events
 */
export namespace AppodealBannerEvents {
  /** Fired when banner ad is loaded successfully */
  export const LOADED = 'onBannerLoaded';
  /** Fired when banner ad fails to load */
  export const FAILED_TO_LOAD = 'onBannerFailedToLoad';
  /** Fired when banner ad expires */
  export const EXPIRED = 'onBannerExpired';
  /** Fired when banner ad is shown */
  export const SHOWN = 'onBannerShown';
  /** Fired when banner ad is clicked */
  export const CLICKED = 'onBannerClicked';
}

/**
 * Interstitial ad events
 */
export namespace AppodealInterstitialEvents {
  /** Fired when interstitial ad is loaded successfully */
  export const LOADED = 'onInterstitialLoaded';
  /** Fired when interstitial ad fails to load */
  export const FAILED_TO_LOAD = 'onInterstitialFailedToLoad';
  /** Fired when interstitial ad expires */
  export const EXPIRED = 'onInterstitialExpired';
  /** Fired when interstitial ad is shown */
  export const SHOWN = 'onInterstitialShown';
  /** Fired when interstitial ad fails to show */
  export const FAILED_TO_SHOW = 'onInterstitialFailedToShow';
  /** Fired when interstitial ad is clicked */
  export const CLICKED = 'onInterstitialClicked';
  /** Fired when interstitial ad is closed */
  export const CLOSED = 'onInterstitialClosed';
}

/**
 * Rewarded video ad events
 */
export namespace AppodealRewardedEvents {
  /** Fired when rewarded video ad is loaded successfully */
  export const LOADED = 'onRewardedVideoLoaded';
  /** Fired when rewarded video ad fails to load */
  export const FAILED_TO_LOAD = 'onRewardedVideoFailedToLoad';
  /** Fired when rewarded video ad expires */
  export const EXPIRED = 'onRewardedVideoExpired';
  /** Fired when rewarded video ad is shown */
  export const SHOWN = 'onRewardedVideoShown';
  /** Fired when rewarded video ad fails to show */
  export const FAILED_TO_SHOW = 'onRewardedVideoFailedToShow';
  /** Fired when rewarded video ad is closed */
  export const CLOSED = 'onRewardedVideoClosed';
  /** Fired when user completes rewarded video and receives reward */
  export const REWARD = 'onRewardedVideoFinished';
  /** Fired when rewarded video ad is clicked */
  export const CLICKED = 'onRewardedVideoClicked';
}
