package com.appodeal.rnappodeal

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RNAppodealNativeViewManagerImpl.NAME)
class RNAppodealNativeViewManager :
    SimpleViewManager<RCTAppodealNativeView>() {

    private val nativeViewManagerImpl = RNAppodealNativeViewManagerImpl()

    override fun getName(): String = RNAppodealNativeViewManagerImpl.NAME

    override fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealNativeView {
        return nativeViewManagerImpl.createViewInstance(reactContext)
    }

    override fun onDropViewInstance(view: RCTAppodealNativeView) {
        super.onDropViewInstance(view)
        nativeViewManagerImpl.onDropViewInstance(view)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return nativeViewManagerImpl.getExportedCustomDirectEventTypeConstants()
    }

    @ReactProp(name = "adId")
    fun setAdId(view: RCTAppodealNativeView, value: String?) {
        view.adId = value
    }

    @ReactProp(name = "placement")
    fun setPlacement(view: RCTAppodealNativeView, value: String?) {
        value?.let { view.placement = it }
    }

    @ReactProp(name = "adTemplate")
    fun setAdTemplate(view: RCTAppodealNativeView, value: String?) {
        value?.let { view.adTemplate = it }
    }
}
