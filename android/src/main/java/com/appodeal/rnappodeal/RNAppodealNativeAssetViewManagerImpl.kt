package com.appodeal.rnappodeal

import com.facebook.react.uimanager.ThemedReactContext

internal class RNAppodealNativeAssetViewManagerImpl {
    fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealNativeAssetView {
        return RCTAppodealNativeAssetView(reactContext)
    }

    fun onDropViewInstance(view: RCTAppodealNativeAssetView) {
        // no-op
    }

    companion object {
        const val NAME = RCTAppodealNativeAssetView.NAME
    }
}
