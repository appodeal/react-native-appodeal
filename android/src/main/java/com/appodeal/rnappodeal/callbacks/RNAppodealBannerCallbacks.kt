package com.appodeal.rnappodeal.callbacks

import com.appodeal.ads.BannerCallbacks
import com.appodeal.rnappodeal.RNAEventDispatcher
import com.appodeal.rnappodeal.constants.BannerEvents
import com.facebook.react.bridge.Arguments

/**
 * Callback handler for Appodeal banner ad events.
 *
 * This class implements the BannerCallbacks interface and handles banner ad lifecycle events
 * including loading, showing, clicking, and expiration. It forwards events to both:
 *
 * 1. **Event Dispatcher**: For advanced event management with priority handling
 * 2. **Event Handler Manager**: For Fabric/New Architecture event dispatching
 *
 * **Event Flow:**
 * ```
 * Appodeal SDK → RNAppodealBannerCallbacks → Event Dispatcher (priority queue)
 *                                    ↓
 *                              Handler Manager → Registered Views (Fabric)
 * ```
 *
 * @param eventDispatcher The RNAEventDispatcher instance used for advanced event management
 * @param handlers The event handler manager that forwards events to registered banner views
 */
internal class RNAppodealBannerCallbacks(
    private val eventDispatcher: RNAEventDispatcher,
    private val handlers: RNAppodealEventHandler = RNAppodealEventHandlerManager
) : BannerCallbacks {

    /**
     * Called when a banner ad is successfully loaded.
     *
     * This event is triggered when Appodeal successfully loads a banner ad.
     * It forwards the event to both the legacy event emitter and the handler manager
     * for Fabric event dispatching.
     *
     * @param height The height of the loaded banner ad in pixels
     * @param isPrecache Whether this is a precached ad (loaded in advance)
     */
    override fun onBannerLoaded(height: Int, isPrecache: Boolean) {
        // Create separate parameter maps for each event system
        val legacyParams = Arguments.createMap().apply {
            putInt("height", height)
            putBoolean("isPrecache", isPrecache)
        }

        val fabricParams = Arguments.createMap().apply {
            putInt("height", height)
            putBoolean("isPrecache", isPrecache)
        }

        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(BannerEvents.ON_BANNER_LOADED, legacyParams)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(BannerEvents.ON_BANNER_LOADED, fabricParams)
    }

    /**
     * Called when a banner ad fails to load.
     *
     * This event is triggered when Appodeal fails to load a banner ad.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onBannerFailedToLoad() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(BannerEvents.ON_BANNER_FAILED_TO_LOAD, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(BannerEvents.ON_BANNER_FAILED_TO_LOAD, null)
    }

    /**
     * Called when a banner ad is shown to the user.
     *
     * This event is triggered when a banner ad becomes visible to the user.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onBannerShown() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(BannerEvents.ON_BANNER_SHOWN, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(BannerEvents.ON_BANNER_SHOWN, null)
    }

    /**
     * Called when a user clicks on a banner ad.
     *
     * This event is triggered when a user interacts with a banner ad.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onBannerClicked() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(BannerEvents.ON_BANNER_CLICKED, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(BannerEvents.ON_BANNER_CLICKED, null)
    }

    /**
     * Called when a banner ad fails to show.
     *
     * This event is triggered when Appodeal fails to display a banner ad.
     * Currently not implemented - no event emitted.
     */
    override fun onBannerShowFailed() {
        // Not implemented - banner show failures are rare and usually handled
        // by the onBannerFailedToLoad event
    }

    /**
     * Called when a banner ad expires and is no longer valid.
     *
     * This event is triggered when a banner ad becomes invalid due to expiration.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onBannerExpired() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(BannerEvents.ON_BANNER_EXPIRED, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(BannerEvents.ON_BANNER_EXPIRED, null)
    }
}