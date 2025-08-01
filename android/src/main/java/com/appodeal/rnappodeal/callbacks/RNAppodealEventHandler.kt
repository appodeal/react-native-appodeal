package com.appodeal.rnappodeal.callbacks

import com.facebook.react.bridge.WritableMap

/**
 * Interface for handling Appodeal events.
 *
 * This interface defines a contract for objects that can handle Appodeal ad events.
 * Implementers of this interface can receive and process events with optional parameters.
 *
 * @param event The name of the event that occurred (e.g., "onBannerLoaded", "onInterstitialShown")
 * @param params Optional parameters associated with the event (can be null for events without data)
 */
internal interface RNAppodealEventHandler {
    fun handleEvent(event: String, params: WritableMap?)
}

/**
 * Centralized event handler manager for Appodeal events.
 *
 * This object implements the singleton pattern to manage multiple event handlers.
 * It maintains a list of registered handlers and forwards events to all of them.
 * This allows multiple components (like banner views) to receive the same events.
 *
 * **Usage:**
 * ```kotlin
 * // Register a handler
 * RNAppodealEventHandlerManager.registerHandler(myBannerView)
 *
 * // Handle events (called by callbacks)
 * RNAppodealEventHandlerManager.handleEvent("onBannerLoaded", params)
 *
 * // Unregister when done
 * RNAppodealEventHandlerManager.unregisterHandler(myBannerView)
 * ```
 */
internal object RNAppodealEventHandlerManager : RNAppodealEventHandler {

    /**
     * List of registered event handlers.
     * Uses a mutable list to allow dynamic registration/unregistration.
     */
    private val handlers = mutableListOf<RNAppodealEventHandler>()

    /**
     * Forwards an event to all registered handlers.
     *
     * This method is called by Appodeal callbacks when ad events occur.
     * It iterates through all registered handlers and calls their handleEvent method.
     *
     * @param event The name of the event that occurred
     * @param params Optional parameters associated with the event (can be null)
     */
    override fun handleEvent(event: String, params: WritableMap?) {
        // Create a copy of the list to avoid concurrent modification issues
        // This ensures that if a handler unregisters itself during event processing,
        // it won't affect the current iteration
        handlers.toList().forEach { handler ->
            handler.handleEvent(event, params)
        }
    }

    /**
     * Registers a new event handler to receive events.
     *
     * @param handler The event handler to register
     */
    fun registerHandler(handler: RNAppodealEventHandler) {
        handlers.add(handler)
    }

    /**
     * Unregisters an event handler from receiving events.
     *
     * @param handler The event handler to unregister
     */
    fun unregisterHandler(handler: RNAppodealEventHandler) {
        handlers.remove(handler)
    }
}

