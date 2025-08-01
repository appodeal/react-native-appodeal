package com.appodeal.rnappodeal

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNAppodealMrecViewManagerDelegate
import com.facebook.react.viewmanagers.RNAppodealMrecViewManagerInterface

@ReactModule(name = RNAppodealMrecViewManagerImpl.NAME)
class RNAppodealMrecViewManager() :
    SimpleViewManager<RCTAppodealMrecView>(),
    RNAppodealMrecViewManagerInterface<RCTAppodealMrecView> {

    private val mrecViewManagerDelegate: ViewManagerDelegate<RCTAppodealMrecView> =
        RNAppodealMrecViewManagerDelegate<RCTAppodealMrecView, RNAppodealMrecViewManager>(this)

    private val mrecViewManagerImpl = RNAppodealMrecViewManagerImpl()

    override fun getDelegate(): ViewManagerDelegate<RCTAppodealMrecView> =
        mrecViewManagerDelegate

    override fun getName(): String = RNAppodealMrecViewManagerImpl.NAME

    override fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealMrecView {
        return mrecViewManagerImpl.createViewInstance(reactContext)
    }

    override fun onDropViewInstance(view: RCTAppodealMrecView) {
        super.onDropViewInstance(view)
        return mrecViewManagerImpl.onDropViewInstance(view)
    }

    override fun getExportedViewConstants(): Map<String?, Any?>? {
        return mrecViewManagerImpl.getExportedViewConstants()
    }

    override fun setPlacement(view: RCTAppodealMrecView, value: String?) {
        value?.let { view.placement = it }
    }
}