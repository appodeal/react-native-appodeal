package com.appodeal.rnappodeal

import android.content.Context
import com.appodeal.ads.Appodeal
import com.appodeal.ads.BannerView
import com.appodeal.rnappodeal.callbacks.RNAppodealEventHandlerManager
import com.appodeal.rnappodeal.constants.BannerEvents
import com.facebook.react.uimanager.ThemedReactContext
import java.lang.ref.WeakReference


internal class RNAppodealBannerViewManagerImpl(
    private val handlerManager: RNAppodealEventHandlerManager = RNAppodealEventHandlerManager
) {

    private val bannerViewReferences = mutableListOf<WeakReference<RCTAppodealBannerView?>?>()

    // Weak reference to the Appodeal banner view
    private var appodealBannerViewRef = WeakReference<BannerView?>(null)

    fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealBannerView {
        val banner = RCTAppodealBannerView(reactContext)

        // Register the handler
        handlerManager.registerHandler(banner)

        // Hide previously created banners
        // Iterate through instances in forward direction
        val appodealBannerViewInstance: BannerView = getAppodealBannerView(reactContext)
        bannerViewReferences.forEach { reference ->
            reference?.get()?.hideBannerView(appodealBannerViewInstance)
        }

        banner.showBannerView(appodealBannerViewInstance)
        bannerViewReferences.add(WeakReference(banner))
        return banner
    }

    fun onDropViewInstance(view: RCTAppodealBannerView) {
        val context = view.context
        val appodealBannerViewInstance = getAppodealBannerView(context)
        view.hideBannerView(appodealBannerViewInstance)

        // Unregister the handler when view is destroyed
        handlerManager.unregisterHandler(view)

        // Trying to show a previous banner
        // Iterate through instances in reverse direction
        val iterator = bannerViewReferences.listIterator(bannerViewReferences.size)
        while (iterator.hasPrevious()) {
            val previousBanner = iterator.previous()?.get()
            when {
                previousBanner == null -> continue
                previousBanner === view -> iterator.remove()
                previousBanner.adSize == view.adSize -> {
                    previousBanner.showBannerView(appodealBannerViewInstance)
                    break
                }
            }
        }
    }

    fun getExportedViewConstants(): Map<String?, Any?>? {
        return mapOf(
            BannerEvents.ON_AD_LOADED to mapOf("registrationName" to BannerEvents.ON_AD_LOADED),
            BannerEvents.ON_AD_FAILED_TO_LOAD to mapOf("registrationName" to BannerEvents.ON_AD_FAILED_TO_LOAD),
            BannerEvents.ON_AD_CLICKED to mapOf("registrationName" to BannerEvents.ON_AD_CLICKED),
            BannerEvents.ON_AD_EXPIRED to mapOf("registrationName" to BannerEvents.ON_AD_EXPIRED)
        )
    }

    private fun getAppodealBannerView(context: Context): BannerView {
        return appodealBannerViewRef.get() ?: run {
            val newBannerView = Appodeal.getBannerView(context.applicationContext)
            appodealBannerViewRef = WeakReference(newBannerView)
            newBannerView
        }
    }


    companion object Companion {
        const val NAME = "RNAppodealBannerView"
    }
}