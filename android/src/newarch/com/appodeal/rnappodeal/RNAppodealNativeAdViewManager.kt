package com.appodeal.rnappodeal

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RNAppodealNativeAdViewManagerImpl.NAME)
class RNAppodealNativeAdViewManager :
    ViewGroupManager<RCTAppodealNativeAdView>() {

    private val impl = RNAppodealNativeAdViewManagerImpl()

    override fun getName(): String = RNAppodealNativeAdViewManagerImpl.NAME

    override fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealNativeAdView {
        return impl.createViewInstance(reactContext)
    }

    override fun onDropViewInstance(view: RCTAppodealNativeAdView) {
        super.onDropViewInstance(view)
        impl.onDropViewInstance(view)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return impl.getExportedCustomDirectEventTypeConstants()
    }

    @ReactProp(name = "adId")
    fun setAdId(view: RCTAppodealNativeAdView, value: String?) {
        view.adId = value
    }

    @ReactProp(name = "placement")
    fun setPlacement(view: RCTAppodealNativeAdView, value: String?) {
        value?.let { view.placement = it }
    }
}
