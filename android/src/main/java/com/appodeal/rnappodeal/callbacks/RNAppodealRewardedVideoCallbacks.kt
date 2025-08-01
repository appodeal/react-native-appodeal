package com.appodeal.rnappodeal.callbacks

import com.appodeal.ads.RewardedVideoCallbacks
import com.appodeal.rnappodeal.RNAEventDispatcher
import com.facebook.react.bridge.Arguments

/**
 * Callback handler for Appodeal rewarded video ad events.
 *
 * This class implements the RewardedVideoCallbacks interface and forwards rewarded video ad events
 * to React Native through the event dispatcher. It handles all rewarded video ad lifecycle events
 * including loading, showing, reward completion, and user interactions.
 *
 * @param eventDispatcher The RNAEventDispatcher instance used for advanced event management
 */
internal class RNAppodealRewardedVideoCallbacks(
    private val eventDispatcher: RNAEventDispatcher
) : RewardedVideoCallbacks {

    /**
     * Called when a rewarded video ad is successfully loaded.
     *
     * @param isPrecache Whether this is a precached ad
     */
    override fun onRewardedVideoLoaded(isPrecache: Boolean) {
        val params = Arguments.createMap().apply {
            putBoolean("isPrecache", isPrecache)
        }
        eventDispatcher.dispatchEvent("onRewardedVideoLoaded", params)
    }

    /**
     * Called when a rewarded video ad fails to load.
     */
    override fun onRewardedVideoFailedToLoad() {
        eventDispatcher.dispatchEvent("onRewardedVideoFailedToLoad", null)
    }

    /**
     * Called when a rewarded video ad fails to show.
     */
    override fun onRewardedVideoShowFailed() {
        eventDispatcher.dispatchEvent("onRewardedVideoFailedToShow", null)
    }

    /**
     * Called when a rewarded video ad is shown to the user.
     */
    override fun onRewardedVideoShown() {
        eventDispatcher.dispatchEvent("onRewardedVideoShown", null)
    }

    /**
     * Called when a rewarded video ad is closed by the user.
     *
     * @param finished Whether the user completed watching the video to receive the reward
     */
    override fun onRewardedVideoClosed(finished: Boolean) {
        val params = Arguments.createMap().apply {
            putBoolean("isFinished", finished)
        }
        eventDispatcher.dispatchEvent("onRewardedVideoClosed", params)
    }

    /**
     * Called when a user completes watching a rewarded video and earns a reward.
     *
     * @param amount The reward amount earned by the user
     * @param currency The currency of the reward (e.g., "coins", "points")
     */
    override fun onRewardedVideoFinished(amount: Double, currency: String) {
        val params = Arguments.createMap().apply {
            putDouble("amount", amount)
            putString("currency", currency)
        }
        eventDispatcher.dispatchEvent("onRewardedVideoFinished", params)
    }

    /**
     * Called when a rewarded video ad expires and is no longer valid.
     */
    override fun onRewardedVideoExpired() {
        eventDispatcher.dispatchEvent("onRewardedVideoExpired", null)
    }

    /**
     * Called when a user clicks on a rewarded video ad.
     */
    override fun onRewardedVideoClicked() {
        eventDispatcher.dispatchEvent("onRewardedVideoClicked", null)
    }
} 