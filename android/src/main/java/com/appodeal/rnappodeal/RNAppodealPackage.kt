package com.appodeal.rnappodeal

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class RNAppodealPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == RNAppodealModuleImpl.NAME) {
            RNAppodealModule(reactContext)
        } else {
            null
        }
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> = listOf(
        RNAppodealBannerViewManager(),
        RNAppodealMrecViewManager()
    )

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            moduleInfos[RNAppodealModuleImpl.NAME] = ReactModuleInfo(
                name = RNAppodealModuleImpl.NAME,
                className = RNAppodealModuleImpl.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = isTurboModule,
            )
            moduleInfos
        }
    }
}
