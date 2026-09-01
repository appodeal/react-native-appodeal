package com.appodeal.rnappodeal

import android.content.Context
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.appodeal.ads.NativeAd
import com.appodeal.ads.nativead.NativeAdView
import com.appodeal.ads.nativead.NativeIconView
import com.appodeal.ads.nativead.NativeMediaView
import com.appodeal.ads.nativead.Position
import com.appodeal.rnappodeal.callbacks.RNAppodealEventHandler
import com.appodeal.rnappodeal.constants.NativeEvents
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import java.lang.ref.WeakReference
import java.util.concurrent.CopyOnWriteArrayList

/**
 * Composable native ad root — matches Appodeal Android demo custom [NativeAdView]
 * (`native_ad_view_custom.xml`): asset children + [registerView].
 */
class RCTAppodealNativeAdView(context: Context) :
    NativeAdView(context),
    RNAppodealEventHandler {

    private val reactContext: ReactContext = context as ReactContext
    private val surfaceId: Int by lazy { UIManagerHelper.getSurfaceId(reactContext) }
    private val uiHandler: Handler by lazy { Handler(Looper.getMainLooper()) }

    var adId: String? = null
        set(value) {
            if (field == value) return
            field = value
            boundAdId = null
            bindGeneration++
            scheduleBind(BIND_DELAY_MS)
        }

    var placement: String = "default"
        set(value) {
            if (field == value) return
            field = value
            if (boundAdId != null) {
                boundAdId = null
                bindGeneration++
                scheduleBind(BIND_DELAY_MS)
            }
        }

    private var boundAdId: String? = null
    private var bindRunnable: Runnable? = null
    private var bindGeneration: Int = 0
    private var bindAttempts: Int = 0

    init {
        liveViews.add(WeakReference(this))
        visibility = VISIBLE
        setAdChoicesPosition(Position.END_TOP)
        clipChildren = false
        clipToPadding = false
        contentDescription = "appodeal-native-ad-view"
    }

    fun onAssetChanged() {
        if (boundAdId != null) {
            boundAdId = null
            bindGeneration++
        }
        if (!adId.isNullOrEmpty()) {
            scheduleBind(BIND_DELAY_MS)
        }
    }

    override fun onViewAdded(child: View?) {
        super.onViewAdded(child)
        if (!adId.isNullOrEmpty() && boundAdId == null) {
            scheduleBind(BIND_DELAY_MS)
        }
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        if (boundAdId == null && !adId.isNullOrEmpty()) {
            scheduleBind(0)
        }
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (right - left > 0 && bottom - top > 0 && boundAdId == null && !adId.isNullOrEmpty()) {
            scheduleBind(0)
        }
    }

    fun cleanup() {
        bindRunnable?.let { uiHandler.removeCallbacks(it) }
        bindRunnable = null
        bindGeneration++
        try {
            unregisterView()
        } catch (_: Exception) {
        }
        boundAdId = null
        bindAttempts = 0
        val self = this
        liveViews.removeAll { it.get() == null || it.get() === self }
    }

    fun onActivityReady() {
        if (boundAdId == null && !adId.isNullOrEmpty()) {
            scheduleBind(0)
        }
    }

    private fun scheduleBind(delayMs: Long) {
        bindRunnable?.let { uiHandler.removeCallbacks(it) }
        val gen = bindGeneration
        val runnable = Runnable {
            if (gen != bindGeneration) return@Runnable
            bindAd(gen)
        }.also { bindRunnable = it }
        uiHandler.postDelayed(runnable, delayMs.coerceAtLeast(0L))
    }

    private fun bindAd(gen: Int) {
        if (gen != bindGeneration) return
        val id = adId
        if (id.isNullOrEmpty()) return
        if (boundAdId == id) return

        val ad: NativeAd = RNAppodealNativeAdStore.get(id) ?: run {
            if (!retry(gen, id, "native ad not in store")) {
                dispatchFailed(id, "native ad not in store")
            }
            return
        }

        if (measuredWidth <= 0 || measuredHeight <= 0) {
            if (!retry(gen, id, "view has zero size")) {
                dispatchFailed(id, "view has zero size")
            }
            return
        }

        if (!isAttachedToWindow) {
            if (!retry(gen, id, "not attached to window")) {
                dispatchFailed(id, "not attached to window")
            }
            return
        }

        val activity = RNAppodealActivityHolder.get() ?: reactContext.currentActivity
        if (activity == null) {
            if (!retry(gen, id, "activity unavailable")) {
                dispatchFailed(id, "activity unavailable")
            }
            return
        }

        val canShow = try {
            ad.canShow(activity, placement)
        } catch (e: Exception) {
            Log.e(TAG, "canShow threw", e)
            false
        }
        if (!canShow) {
            if (!retry(gen, id, "canShow=false")) {
                dispatchFailed(id, "canShow=false for placement=$placement")
            }
            return
        }

        val assets = collectAssets(this)
        if (assets.media == null && assets.icon == null) {
            if (!retry(gen, id, "missing media/icon asset")) {
                dispatchFailed(id, "composable native ad requires media or icon asset")
            }
            return
        }

        try {
            unregisterView()
        } catch (_: Exception) {
        }

        // Bind via Java helper — Appodeal's Kotlin metadata is obfuscated, so
        // setMediaView / mediaView= are unresolved from a Kotlin subclass.
        NativeAdViewAssetBinder.bind(
            this,
            assets.media,
            assets.icon,
            assets.title,
            assets.description,
            assets.callToAction,
            assets.attribution
        )

        val registered = try {
            registerView(ad, placement)
        } catch (e: Exception) {
            Log.e(TAG, "registerView threw", e)
            false
        }

        Log.d(
            TAG,
            "composable registerView id=$id result=$registered " +
                "size=${measuredWidth}x${measuredHeight} " +
                "media=${assets.media != null} icon=${assets.icon != null} " +
                "title=${assets.title != null} cta=${assets.callToAction != null}"
        )

        if (gen != bindGeneration) return

        if (registered) {
            boundAdId = id
            bindAttempts = 0
            dispatchLoaded(id)
        } else if (!retry(gen, id, "registerView returned false")) {
            dispatchFailed(id, "registerView returned false")
        }
    }

    private fun retry(gen: Int, id: String, reason: String): Boolean {
        if (gen != bindGeneration) return true
        bindAttempts += 1
        if (bindAttempts > MAX_BIND_ATTEMPTS) return false
        Log.d(TAG, "retry #$bindAttempts id=$id reason=$reason")
        scheduleBind(BIND_DELAY_MS * bindAttempts)
        return true
    }

    private fun dispatchLoaded(adIdValue: String) {
        val params = Arguments.createMap().apply { putString("adId", adIdValue) }
        dispatchFabricEvent(id, NativeEvents.ON_AD_LOADED, params)
    }

    private fun dispatchFailed(adIdValue: String, message: String) {
        Log.w(TAG, "bind failed id=$adIdValue message=$message")
        val params = Arguments.createMap().apply {
            putString("adId", adIdValue)
            putString("message", message)
        }
        dispatchFabricEvent(id, NativeEvents.ON_AD_FAILED_TO_LOAD, params)
    }

    override fun handleEvent(event: String, params: WritableMap?) {
        when (event) {
            NativeEvents.ON_NATIVE_SHOWN -> {
                if (boundAdId == null) return
                dispatchFabricEvent(id, NativeEvents.ON_AD_SHOWN, withAdId(params))
            }
            NativeEvents.ON_NATIVE_CLICKED -> {
                if (boundAdId == null) return
                dispatchFabricEvent(id, NativeEvents.ON_AD_CLICKED, withAdId(params))
            }
            NativeEvents.ON_NATIVE_EXPIRED -> {
                if (boundAdId == null) return
                try {
                    unregisterView()
                } catch (_: Exception) {
                }
                boundAdId = null
                dispatchFabricEvent(id, NativeEvents.ON_AD_EXPIRED, withAdId(params))
            }
            else -> Unit
        }
    }

    private fun withAdId(params: WritableMap?): WritableMap {
        val copy = Arguments.createMap()
        if (params != null) copy.merge(params)
        if (!copy.hasKey("adId")) copy.putString("adId", boundAdId ?: adId)
        return copy
    }

    private fun dispatchFabricEvent(viewId: Int, eventName: String, params: WritableMap?) {
        val dispatcher =
            UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewId)
        dispatcher?.dispatchEvent(OnViewEvent(surfaceId, viewId, eventName, params))
    }

    private class OnViewEvent(
        surfaceId: Int,
        viewId: Int,
        private val eventNameParam: String,
        private val payload: WritableMap?
    ) : Event<OnViewEvent>(surfaceId, viewId) {
        override fun getEventName(): String = eventNameParam
        override fun getEventData(): WritableMap? {
            if (payload == null) return null
            val copy = Arguments.createMap()
            copy.merge(payload)
            return copy
        }
    }

    private data class Assets(
        val media: NativeMediaView?,
        val icon: NativeIconView?,
        val title: TextView?,
        val description: TextView?,
        val callToAction: View?,
        val attribution: TextView?
    )

    companion object {
        private const val TAG = "RNAppodealNativeAd"
        private const val MAX_BIND_ATTEMPTS = 6
        private const val BIND_DELAY_MS = 200L

        private val liveViews = CopyOnWriteArrayList<WeakReference<RCTAppodealNativeAdView>>()

        fun notifyActivityReady() {
            prune()
            for (ref in liveViews) ref.get()?.onActivityReady()
        }

        fun unbindAdId(adId: String) {
            prune()
            for (ref in liveViews) {
                val view = ref.get() ?: continue
                if (view.adId == adId || view.boundAdId == adId) {
                    view.bindGeneration++
                    try {
                        view.unregisterView()
                    } catch (_: Exception) {
                    }
                    view.boundAdId = null
                }
            }
        }

        private fun prune() {
            liveViews.removeAll { it.get() == null }
        }

        private fun collectAssets(root: ViewGroup): Assets {
            var media: NativeMediaView? = null
            var icon: NativeIconView? = null
            var title: TextView? = null
            var description: TextView? = null
            var callToAction: View? = null
            var attribution: TextView? = null

            fun walk(view: View) {
                if (view is RCTAppodealNativeAssetView) {
                    when (view.assetType) {
                        "media" -> media = view.mediaView() ?: media
                        "icon" -> icon = view.iconView() ?: icon
                        "title" -> title = view.textView() ?: title
                        "description" -> description = view.textView() ?: description
                        "callToAction" -> callToAction = view.textView() ?: callToAction
                        "attribution" -> attribution = view.textView() ?: attribution
                    }
                }
                if (view is ViewGroup) {
                    for (i in 0 until view.childCount) {
                        walk(view.getChildAt(i))
                    }
                }
            }

            walk(root)
            return Assets(media, icon, title, description, callToAction, attribution)
        }
    }
}
