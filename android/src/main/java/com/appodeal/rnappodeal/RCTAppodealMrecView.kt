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
import com.appodeal.ads.MrecView
import com.appodeal.rnappodeal.callbacks.RNAppodealEventHandler
import com.appodeal.rnappodeal.constants.MrecEvents
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.EventDispatcher
import com.facebook.react.views.view.ReactViewGroup
import kotlin.math.roundToInt

class RCTAppodealMrecView(context: Context) : ReactViewGroup(context), RNAppodealEventHandler {

    private val surfaceId: Int by lazy { UIManagerHelper.getSurfaceId(reactContext) }
    private val uiHandler: Handler by lazy { Handler(Looper.getMainLooper()) }

    var placement: String = "default"
        set(value) {
            field = value
            cacheAdIfNeeded()
        }

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

    fun showMrecView(bannerView: MrecView) {
        val runnable = Runnable {
            val activity = reactContext.currentActivity ?: return@Runnable

            // MREC is always 300x250
            val widthPx = dp2px(300, reactContext.resources.displayMetrics)
            val heightPx = dp2px(250, reactContext.resources.displayMetrics)

            bannerView.layoutParams = FrameLayout.LayoutParams(widthPx, heightPx)
            bannerView.visibility = VISIBLE
            bannerView.descendantFocusability = FOCUS_BLOCK_DESCENDANTS

            removeAllViews()
            this.visibility = VISIBLE
            addView(bannerView)
            bannerView.bringToFront()

            try {
                // Ensure this mrec view is brought to front in parent hierarchy
                (parent as? ViewGroup)?.bringChildToFront(this)
            } catch (e: Exception) {
                Log.e("RTCAppodealMrec", "Error bringing banner view to front", e)
            }

            Appodeal.show(activity, Appodeal.MREC, placement)
        }.also { showRunnable = it }
        uiHandler.postDelayed(runnable, 250L)
    }

    fun hideMrecView(bannerView: MrecView) {
        removeAllViews()
        (bannerView.parent as? ViewGroup)?.removeView(bannerView)
        showRunnable?.let { uiHandler.removeCallbacks(it) }
    }

    private fun cacheAdIfNeeded() {
        if (!Appodeal.isAutoCacheEnabled(Appodeal.MREC)) {
            reactContext.currentActivity?.let { activity ->
                Appodeal.cache(activity, Appodeal.MREC)
            }
        }
    }

    override fun handleEvent(event: String, params: WritableMap?) {
        when (event) {
            MrecEvents.ON_MREC_LOADED -> dispatchFabricEvent(id, MrecEvents.ON_AD_LOADED, params)
            MrecEvents.ON_MREC_FAILED_TO_LOAD -> dispatchFabricEvent(id, MrecEvents.ON_AD_FAILED_TO_LOAD, params)
            MrecEvents.ON_MREC_CLICKED -> dispatchFabricEvent(id, MrecEvents.ON_AD_CLICKED, params)
            MrecEvents.ON_MREC_EXPIRED -> dispatchFabricEvent(id, MrecEvents.ON_AD_EXPIRED, params)
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