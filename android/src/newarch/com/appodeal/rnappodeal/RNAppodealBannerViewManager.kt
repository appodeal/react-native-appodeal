package com.appodeal.rnappodeal

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNAppodealBannerViewManagerDelegate
import com.facebook.react.viewmanagers.RNAppodealBannerViewManagerInterface

@ReactModule(name = RNAppodealBannerViewManagerImpl.NAME)
class RNAppodealBannerViewManager() :
    SimpleViewManager<RCTAppodealBannerView>(),
    RNAppodealBannerViewManagerInterface<RCTAppodealBannerView> {

    private val bannerViewManagerDelegate: ViewManagerDelegate<RCTAppodealBannerView> =
        RNAppodealBannerViewManagerDelegate<RCTAppodealBannerView, RNAppodealBannerViewManager>(this)

    private val bannerViewManagerImpl = RNAppodealBannerViewManagerImpl()

    override fun getDelegate(): ViewManagerDelegate<RCTAppodealBannerView> =
        bannerViewManagerDelegate

    override fun getName(): String = RNAppodealBannerViewManagerImpl.NAME

    override fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealBannerView {
        return bannerViewManagerImpl.createViewInstance(reactContext)
    }

    override fun onDropViewInstance(view: RCTAppodealBannerView) {
        super.onDropViewInstance(view)
        return bannerViewManagerImpl.onDropViewInstance(view)
    }

    override fun getExportedViewConstants(): Map<String?, Any?>? {
        return bannerViewManagerImpl.getExportedViewConstants()
    }

    override fun setAdSize(view: RCTAppodealBannerView, value: String?) {
        value?.let { view.adSize = it }
    }

    override fun setPlacement(view: RCTAppodealBannerView, value: String?) {
        value?.let { view.placement = it }
    }

    override fun setUsesSmartSizing(view: RCTAppodealBannerView, value: Boolean) {
        // No-op
    }
}