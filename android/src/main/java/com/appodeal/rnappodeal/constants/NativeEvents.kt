package com.appodeal.rnappodeal.constants

/**
 * Constants for native ad events.
 * Centralized event names that can be reused across the codebase.
 */
internal object NativeEvents {
    const val ON_NATIVE_LOADED = "onNativeLoaded"
    const val ON_NATIVE_FAILED_TO_LOAD = "onNativeFailedToLoad"
    const val ON_NATIVE_SHOWN = "onNativeShown"
    const val ON_NATIVE_SHOW_FAILED = "onNativeShowFailed"
    const val ON_NATIVE_CLICKED = "onNativeClicked"
    const val ON_NATIVE_EXPIRED = "onNativeExpired"

    // React Native event registration names
    const val ON_AD_LOADED = "onAdLoaded"
    const val ON_AD_FAILED_TO_LOAD = "onAdFailedToLoad"
    const val ON_AD_CLICKED = "onAdClicked"
    const val ON_AD_EXPIRED = "onAdExpired"
    const val ON_AD_SHOWN = "onAdShown"
}
