package com.appodeal.rnappodeal.constants

/**
 * Constants for MREC ad events.
 * Centralized event names that can be reused across the codebase.
 */
internal object MrecEvents {
    const val ON_MREC_LOADED = "onMrecLoaded"
    const val ON_MREC_FAILED_TO_LOAD = "onMrecFailedToLoad"
    const val ON_MREC_SHOWN = "onMrecShown"
    const val ON_MREC_CLICKED = "onMrecClicked"
    const val ON_MREC_EXPIRED = "onMrecExpired"

    // React Native event registration names
    const val ON_AD_LOADED = "onAdLoaded"
    const val ON_AD_FAILED_TO_LOAD = "onAdFailedToLoad"
    const val ON_AD_CLICKED = "onAdClicked"
    const val ON_AD_EXPIRED = "onAdExpired"
} 