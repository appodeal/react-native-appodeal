package com.appodeal.rnappodeal

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RNAppodealNativeAssetViewManagerImpl.NAME)
class RNAppodealNativeAssetViewManager :
    SimpleViewManager<RCTAppodealNativeAssetView>() {

    private val impl = RNAppodealNativeAssetViewManagerImpl()

    override fun getName(): String = RNAppodealNativeAssetViewManagerImpl.NAME

    override fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealNativeAssetView {
        return impl.createViewInstance(reactContext)
    }

    override fun onDropViewInstance(view: RCTAppodealNativeAssetView) {
        super.onDropViewInstance(view)
        impl.onDropViewInstance(view)
    }

    @ReactProp(name = "asset")
    fun setAsset(view: RCTAppodealNativeAssetView, value: String?) {
        value?.let { view.assetType = it }
    }
}
