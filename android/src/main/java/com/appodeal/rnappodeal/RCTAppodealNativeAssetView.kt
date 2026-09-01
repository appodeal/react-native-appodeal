package com.appodeal.rnappodeal

import android.content.Context
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.TextView
import com.appodeal.ads.nativead.NativeIconView
import com.appodeal.ads.nativead.NativeMediaView
import com.facebook.react.views.text.ReactTextView

/**
 * Marker view for a single native-ad asset inside [RCTAppodealNativeAdView].
 *
 * Mirrors Appodeal Android demo custom layout children:
 * [NativeMediaView], [NativeIconView], and TextViews for title / body / CTA.
 */
class RCTAppodealNativeAssetView(context: Context) : FrameLayout(context) {

    var assetType: String = "title"
        set(value) {
            val normalized = value.ifBlank { "title" }
            if (field == normalized) return
            field = normalized
            rebuild()
        }

    private var content: View? = null

    private val measureAndLayout = Runnable {
        val w = measuredWidth
        val h = measuredHeight
        if (w <= 0 || h <= 0) return@Runnable
        val child = content ?: return@Runnable
        child.visibility = VISIBLE
        child.measure(
            MeasureSpec.makeMeasureSpec(w, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(h, MeasureSpec.EXACTLY)
        )
        child.layout(0, 0, child.measuredWidth, child.measuredHeight)
    }

    init {
        clipChildren = false
        clipToPadding = false
        rebuild()
    }

    override fun requestLayout() {
        super.requestLayout()
        post(measureAndLayout)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        post(measureAndLayout)
    }

    fun mediaView(): NativeMediaView? = content as? NativeMediaView

    fun iconView(): NativeIconView? = content as? NativeIconView

    fun textView(): TextView? = content as? TextView

    private fun rebuild() {
        removeAllViews()
        val view: View = when (assetType) {
            "media" -> NativeMediaView(context)
            "icon" -> NativeIconView(context)
            else -> ReactTextView(context).apply {
                when (assetType) {
                    "callToAction" -> {
                        setTextColor(0xFFFFFFFF.toInt())
                        textSize = 12f
                        gravity = android.view.Gravity.CENTER
                        maxLines = 1
                    }
                    "attribution" -> {
                        setTextColor(0xFFFFFFFF.toInt())
                        textSize = 9f
                        gravity = android.view.Gravity.CENTER
                        text = "Ad"
                        maxLines = 1
                    }
                    "description" -> {
                        setTextColor(0xFF7F6D5F.toInt())
                        textSize = 11f
                        maxLines = 1
                    }
                    else -> {
                        setTextColor(0xFF2D2424.toInt())
                        textSize = 13f
                        maxLines = 2
                    }
                }
            }
        }
        content = view
        addView(
            view,
            LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        )
        post(measureAndLayout)
        (parent as? RCTAppodealNativeAdView)?.onAssetChanged()
    }

    companion object {
        const val NAME = "RNAppodealNativeAssetView"
    }
}
