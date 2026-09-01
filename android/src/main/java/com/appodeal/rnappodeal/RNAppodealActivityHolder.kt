package com.appodeal.rnappodeal

import android.app.Activity
import java.lang.ref.WeakReference

/**
 * Shared Activity ref for native ad views.
 * Mirrors [RNAppodealModuleImpl]'s workaround for RN's null getCurrentActivity bug.
 */
internal object RNAppodealActivityHolder {
    @Volatile
    private var activityRef: WeakReference<Activity>? = null

    fun set(activity: Activity?) {
        activityRef = if (activity != null) WeakReference(activity) else null
    }

    fun get(): Activity? = activityRef?.get()
}
