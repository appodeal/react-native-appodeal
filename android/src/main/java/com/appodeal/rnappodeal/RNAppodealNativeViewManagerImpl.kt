package com.appodeal.rnappodeal

import com.appodeal.rnappodeal.callbacks.RNAppodealEventHandlerManager
import com.appodeal.rnappodeal.constants.NativeEvents
import com.facebook.react.uimanager.ThemedReactContext

internal class RNAppodealNativeViewManagerImpl(
    private val handlerManager: RNAppodealEventHandlerManager = RNAppodealEventHandlerManager
) {

    fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealNativeView {
        val nativeView = RCTAppodealNativeView(reactContext)
        handlerManager.registerHandler(nativeView)
        return nativeView
    }

    fun onDropViewInstance(view: RCTAppodealNativeView) {
        view.cleanup()
        handlerManager.unregisterHandler(view)
    }

    fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            NativeEvents.ON_AD_LOADED to mapOf("registrationName" to NativeEvents.ON_AD_LOADED),
            NativeEvents.ON_AD_FAILED_TO_LOAD to mapOf("registrationName" to NativeEvents.ON_AD_FAILED_TO_LOAD),
            NativeEvents.ON_AD_SHOWN to mapOf("registrationName" to NativeEvents.ON_AD_SHOWN),
            NativeEvents.ON_AD_CLICKED to mapOf("registrationName" to NativeEvents.ON_AD_CLICKED),
            NativeEvents.ON_AD_EXPIRED to mapOf("registrationName" to NativeEvents.ON_AD_EXPIRED)
        )
    }

    companion object Companion {
        const val NAME = "RNAppodealNativeView"
    }
}
