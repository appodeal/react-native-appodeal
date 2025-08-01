package com.appodeal.rnappodeal.constants

/**
 * Constants for banner ad events.
 * Centralized event names that can be reused across the codebase.
 */
internal object BannerEvents {
    const val ON_BANNER_LOADED = "onBannerLoaded"
    const val ON_BANNER_FAILED_TO_LOAD = "onBannerFailedToLoad"
    const val ON_BANNER_SHOWN = "onBannerShown"
    const val ON_BANNER_CLICKED = "onBannerClicked"
    const val ON_BANNER_EXPIRED = "onBannerExpired"

    // React Native event registration names
    const val ON_AD_LOADED = "onAdLoaded"
    const val ON_AD_FAILED_TO_LOAD = "onAdFailedToLoad"
    const val ON_AD_CLICKED = "onAdClicked"
    const val ON_AD_EXPIRED = "onAdExpired"
}