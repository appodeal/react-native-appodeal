package com.appodeal.rnappodeal.callbacks

import com.appodeal.ads.MrecCallbacks
import com.appodeal.rnappodeal.RNAEventDispatcher
import com.appodeal.rnappodeal.constants.MrecEvents
import com.facebook.react.bridge.Arguments

/**
 * Callback handler for Appodeal MREC ad events.
 *
 * This class implements the MrecCallbacks interface and handles MREC ad lifecycle events
 * including loading, showing, clicking, and expiration. It forwards events to both:
 *
 * 1. **Event Dispatcher**: For advanced event management with priority handling
 * 2. **Event Handler Manager**: For Fabric/New Architecture event dispatching
 *
 * **Event Flow:**
 * ```
 * Appodeal SDK → RNAppodealMrecCallbacks → Event Dispatcher (priority queue)
 *                                    ↓
 *                              Handler Manager → Registered Views (Fabric)
 * ```
 *
 * @param eventDispatcher The RNAEventDispatcher instance used for advanced event management
 * @param handlers The event handler manager that forwards events to registered MREC views
 */
internal class RNAppodealMrecCallbacks(
    private val eventDispatcher: RNAEventDispatcher,
    private val handlers: RNAppodealEventHandler = RNAppodealEventHandlerManager
) : MrecCallbacks {

    /**
     * Called when a MREC ad is successfully loaded.
     *
     * This event is triggered when Appodeal successfully loads a MREC ad.
     * It forwards the event to both the legacy event emitter and the handler manager
     * for Fabric event dispatching.
     *
     * @param isPrecache Whether this is a precached ad (loaded in advance)
     */
    override fun onMrecLoaded(isPrecache: Boolean) {
        // Create separate parameter maps for each event system
        val legacyParams = Arguments.createMap().apply {
            putBoolean("isPrecache", isPrecache)
        }

        val fabricParams = Arguments.createMap().apply {
            putBoolean("isPrecache", isPrecache)
        }

        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(MrecEvents.ON_MREC_LOADED, legacyParams)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(MrecEvents.ON_MREC_LOADED, fabricParams)
    }

    /**
     * Called when a MREC ad fails to load.
     *
     * This event is triggered when Appodeal fails to load a MREC ad.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onMrecFailedToLoad() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(MrecEvents.ON_MREC_FAILED_TO_LOAD, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(MrecEvents.ON_MREC_FAILED_TO_LOAD, null)
    }

    /**
     * Called when a MREC ad is shown to the user.
     *
     * This event is triggered when a MREC ad becomes visible to the user.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onMrecShown() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(MrecEvents.ON_MREC_SHOWN, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(MrecEvents.ON_MREC_SHOWN, null)
    }

    /**
     * Called when a user clicks on a MREC ad.
     *
     * This event is triggered when a user interacts with a MREC ad.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onMrecClicked() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(MrecEvents.ON_MREC_CLICKED, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(MrecEvents.ON_MREC_CLICKED, null)
    }

    /**
     * Called when a MREC ad expires and is no longer valid.
     *
     * This event is triggered when a MREC ad becomes invalid due to expiration.
     * It forwards the event to both the legacy event emitter and the handler manager.
     */
    override fun onMrecExpired() {
        // Emit to React Native (event dispatcher)
        eventDispatcher.dispatchEvent(MrecEvents.ON_MREC_EXPIRED, null)

        // Forward to registered handlers (Fabric event system)
        handlers.handleEvent(MrecEvents.ON_MREC_EXPIRED, null)
    }

    /**
     * Called when a MREC ad fails to show.
     *
     * This event is triggered when Appodeal fails to display a MREC ad.
     * Currently not implemented - no event emitted.
     */
    override fun onMrecShowFailed() {
        // Not implemented - MREC show failures are rare and usually handled
        // by the onMrecFailedToLoad event
    }
} 