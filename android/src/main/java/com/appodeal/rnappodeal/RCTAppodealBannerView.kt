package com.appodeal.rnappodeal

import android.content.Context
import android.os.Handler
import android.os.Looper
import android.util.DisplayMetrics
import android.util.Log
import android.util.TypedValue
import android.view.ViewGroup
import android.widget.FrameLayout
import com.appodeal.ads.Appodeal
import com.appodeal.ads.BannerView
import com.appodeal.rnappodeal.callbacks.RNAppodealEventHandler
import com.appodeal.rnappodeal.constants.BannerEvents
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.EventDispatcher
import com.facebook.react.views.view.ReactViewGroup
import kotlin.math.roundToInt

class RCTAppodealBannerView(context: Context) : ReactViewGroup(context), RNAppodealEventHandler {

    private val surfaceId: Int by lazy { UIManagerHelper.getSurfaceId(reactContext) }
    private val uiHandler: Handler by lazy { Handler(Looper.getMainLooper()) }

    var placement: String = "default"
        set(value) {
            field = value
            cacheAdIfNeeded()
        }

    var adSize: String = "phone"
        set(value) {
            field = value
            use728x90Banners = value == "tablet"
            cacheAdIfNeeded()
        }

    private var use728x90Banners: Boolean = false
    private var showRunnable: Runnable? = null

    private val measureAndLayout = Runnable {
        for (i in 0 until childCount) {
            val child = getChildAt(i)
            child.measure(
                MeasureSpec.makeMeasureSpec(measuredWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(measuredHeight, MeasureSpec.EXACTLY)
            )
            child.layout(0, 0, child.measuredWidth, child.measuredHeight)
        }
    }

    override fun requestLayout() {
        super.requestLayout()
        post(measureAndLayout)
    }

    fun showBannerView(bannerView: BannerView) {
        val runnable = Runnable {
            val activity = reactContext.currentActivity ?: return@Runnable
            Appodeal.set728x90Banners(use728x90Banners)

            val dpHeight = if (use728x90Banners) 90 else 50
            val heightPx = dp2px(dpHeight, reactContext.resources.displayMetrics)
            val widthPx = reactContext.resources.displayMetrics.widthPixels

            bannerView.layoutParams = FrameLayout.LayoutParams(widthPx, heightPx)
            bannerView.visibility = VISIBLE
            bannerView.descendantFocusability = FOCUS_BLOCK_DESCENDANTS

            removeAllViews()
            this.visibility = VISIBLE
            addView(bannerView)
            bannerView.bringToFront()

            try {
                // Ensure this banner view is brought to front in parent hierarchy
                (parent as? ViewGroup)?.bringChildToFront(this)
            } catch (e: Exception) {
                Log.e("RTCAppodealBanner", "Error bringing banner view to front", e)
            }

            Appodeal.show(activity, Appodeal.BANNER_VIEW, placement)
        }.also { showRunnable = it }
        uiHandler.postDelayed(runnable, 250L)
    }

    fun hideBannerView(bannerView: BannerView) {
        removeAllViews()
        (bannerView.parent as? ViewGroup)?.removeView(bannerView)
        showRunnable?.let { uiHandler.removeCallbacks(it) }
    }

    private fun cacheAdIfNeeded() {
        if (!Appodeal.isAutoCacheEnabled(Appodeal.BANNER_VIEW)) {
            reactContext.currentActivity?.let { activity ->
                Appodeal.cache(activity, Appodeal.BANNER_VIEW)
            }
        }
    }

    override fun handleEvent(event: String, params: WritableMap?) {
        when (event) {
            BannerEvents.ON_BANNER_LOADED -> dispatchFabricEvent(id, BannerEvents.ON_AD_LOADED, params)
            BannerEvents.ON_BANNER_FAILED_TO_LOAD -> dispatchFabricEvent(id, BannerEvents.ON_AD_FAILED_TO_LOAD, params)
            BannerEvents.ON_BANNER_CLICKED -> dispatchFabricEvent(id, BannerEvents.ON_AD_CLICKED, params)
            BannerEvents.ON_BANNER_EXPIRED -> dispatchFabricEvent(id, BannerEvents.ON_AD_EXPIRED, params)
            else -> Unit
        }
    }

    private fun dispatchFabricEvent(
        viewId: Int,
        eventName: String,
        params: WritableMap?
    ) {
        val dispatcher: EventDispatcher? =
            UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewId)
        dispatcher?.dispatchEvent(OnViewEvent(surfaceId, viewId, eventName, params))
    }

    private class OnViewEvent(
        surfaceId: Int,
        viewId: Int,
        private val eventName: String,
        private val payload: WritableMap?
    ) : Event<OnViewEvent>(surfaceId, viewId) {
        override fun getEventName(): String = eventName
        override fun getEventData(): WritableMap? = payload
    }

    private val reactContext: ReactContext
        get() = context as ReactContext

}

private fun dp2px(dp: Int, dm: DisplayMetrics): Int =
    TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp.toFloat(), dm).roundToInt()