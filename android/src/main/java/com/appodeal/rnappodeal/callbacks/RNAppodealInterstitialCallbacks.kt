package com.appodeal.rnappodeal.callbacks

import com.appodeal.ads.InterstitialCallbacks
import com.appodeal.rnappodeal.RNAEventDispatcher
import com.facebook.react.bridge.Arguments

/**
 * Callback handler for Appodeal interstitial ad events.
 *
 * This class implements the InterstitialCallbacks interface and forwards interstitial ad events
 * to React Native through the event dispatcher. It handles all interstitial ad lifecycle events
 * including loading, showing, closing, and clicking.
 *
 * @param eventDispatcher The RNAEventDispatcher instance used for advanced event management
 */
internal class RNAppodealInterstitialCallbacks(
    private val eventDispatcher: RNAEventDispatcher
) : InterstitialCallbacks {

    /**
     * Called when an interstitial ad is successfully loaded.
     *
     * @param isPrecache Whether this is a precached ad
     */
    override fun onInterstitialLoaded(isPrecache: Boolean) {
        val params = Arguments.createMap().apply {
            putBoolean("isPrecache", isPrecache)
        }
        eventDispatcher.dispatchEvent("onInterstitialLoaded", params)
    }

    /**
     * Called when an interstitial ad fails to load.
     */
    override fun onInterstitialFailedToLoad() {
        eventDispatcher.dispatchEvent("onInterstitialFailedToLoad", null)
    }

    /**
     * Called when an interstitial ad fails to show.
     */
    override fun onInterstitialShowFailed() {
        eventDispatcher.dispatchEvent("onInterstitialFailedToShow", null)
    }

    /**
     * Called when an interstitial ad is shown to the user.
     */
    override fun onInterstitialShown() {
        eventDispatcher.dispatchEvent("onInterstitialShown", null)
    }

    /**
     * Called when an interstitial ad is closed by the user.
     */
    override fun onInterstitialClosed() {
        eventDispatcher.dispatchEvent("onInterstitialClosed", null)
    }

    /**
     * Called when a user clicks on an interstitial ad.
     */
    override fun onInterstitialClicked() {
        eventDispatcher.dispatchEvent("onInterstitialClicked", null)
    }

    /**
     * Called when an interstitial ad expires and is no longer valid.
     */
    override fun onInterstitialExpired() {
        eventDispatcher.dispatchEvent("onInterstitialExpired", null)
    }
} 