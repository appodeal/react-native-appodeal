package com.appodeal.rnappodeal.callbacks

import com.appodeal.ads.NativeAd
import com.appodeal.ads.NativeCallbacks
import com.appodeal.rnappodeal.RNAEventDispatcher
import com.appodeal.rnappodeal.constants.NativeEvents
import com.facebook.react.bridge.Arguments

/**
 * Callback handler for Appodeal native ad events.
 *
 * Appodeal 4.2.0 exposes these Java callbacks as platform types; Kotlin sees
 * the NativeAd parameters as nullable (`NativeAd?`).
 */
internal class RNAppodealNativeCallbacks(
    private val eventDispatcher: RNAEventDispatcher,
    private val handlers: RNAppodealEventHandler = RNAppodealEventHandlerManager
) : NativeCallbacks {

    override fun onNativeLoaded() {
        eventDispatcher.dispatchEvent(NativeEvents.ON_NATIVE_LOADED, null)
        handlers.handleEvent(NativeEvents.ON_NATIVE_LOADED, null)
    }

    override fun onNativeFailedToLoad() {
        eventDispatcher.dispatchEvent(NativeEvents.ON_NATIVE_FAILED_TO_LOAD, null)
        handlers.handleEvent(NativeEvents.ON_NATIVE_FAILED_TO_LOAD, null)
    }

    override fun onNativeShown(nativeAd: NativeAd?) {
        val params = createNativeAdParams(nativeAd)
        eventDispatcher.dispatchEvent(NativeEvents.ON_NATIVE_SHOWN, params)
        handlers.handleEvent(NativeEvents.ON_NATIVE_SHOWN, params)
    }

    override fun onNativeShowFailed(nativeAd: NativeAd?) {
        val params = createNativeAdParams(nativeAd)
        eventDispatcher.dispatchEvent(NativeEvents.ON_NATIVE_SHOW_FAILED, params)
        handlers.handleEvent(NativeEvents.ON_NATIVE_SHOW_FAILED, params)
    }

    override fun onNativeClicked(nativeAd: NativeAd?) {
        val params = createNativeAdParams(nativeAd)
        eventDispatcher.dispatchEvent(NativeEvents.ON_NATIVE_CLICKED, params)
        handlers.handleEvent(NativeEvents.ON_NATIVE_CLICKED, params)
    }

    override fun onNativeExpired() {
        eventDispatcher.dispatchEvent(NativeEvents.ON_NATIVE_EXPIRED, null)
        handlers.handleEvent(NativeEvents.ON_NATIVE_EXPIRED, null)
    }

    private fun createNativeAdParams(nativeAd: NativeAd?) = Arguments.createMap().apply {
        if (nativeAd == null) return@apply
        putString("title", nativeAd.title ?: "")
        putString("description", nativeAd.description ?: "")
        putString("callToAction", nativeAd.callToAction ?: "")
        putDouble("rating", nativeAd.rating.toDouble())
        putBoolean("containsVideo", nativeAd.containsVideo())
        putDouble("predictedEcpm", nativeAd.predictedEcpm)
    }
}
