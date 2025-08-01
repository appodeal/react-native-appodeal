package com.appodeal.rnappodeal

import android.content.Context
import com.appodeal.ads.Appodeal
import com.appodeal.ads.MrecView
import com.appodeal.rnappodeal.callbacks.RNAppodealEventHandlerManager
import com.appodeal.rnappodeal.constants.MrecEvents
import com.facebook.react.uimanager.ThemedReactContext
import java.lang.ref.WeakReference

internal class RNAppodealMrecViewManagerImpl(
    private val handlerManager: RNAppodealEventHandlerManager = RNAppodealEventHandlerManager
) {

    private val mrecViewReferences = mutableListOf<WeakReference<RCTAppodealMrecView?>?>()

    // Weak reference to the Appodeal banner view (MREC uses MrecView)
    private var appodealMrecViewRef = WeakReference<MrecView?>(null)

    fun createViewInstance(reactContext: ThemedReactContext): RCTAppodealMrecView {
        val mrec = RCTAppodealMrecView(reactContext)

        // Register the handler
        handlerManager.registerHandler(mrec)

        // Hide previously created MREC views
        val appodealMrecViewInstance: MrecView = getAppodealMrecView(reactContext)
        mrecViewReferences.forEach { reference ->
            reference?.get()?.hideMrecView(appodealMrecViewInstance)
        }

        mrec.showMrecView(appodealMrecViewInstance)
        mrecViewReferences.add(WeakReference(mrec))
        return mrec
    }

    fun onDropViewInstance(view: RCTAppodealMrecView) {
        val context = view.context
        val appodealMrecViewInstance = getAppodealMrecView(context)
        view.hideMrecView(appodealMrecViewInstance)

        // Unregister the handler when view is destroyed
        handlerManager.unregisterHandler(view)

        // Trying to show a previous MREC view
        val iterator = mrecViewReferences.listIterator(mrecViewReferences.size)
        while (iterator.hasPrevious()) {
            val previousMrec = iterator.previous()?.get()
            when {
                previousMrec == null -> continue
                previousMrec === view -> iterator.remove()
                else -> {
                    previousMrec.showMrecView(appodealMrecViewInstance)
                    break
                }
            }
        }
    }

    fun getExportedViewConstants(): Map<String?, Any?>? {
        return mapOf(
            MrecEvents.ON_AD_LOADED to mapOf("registrationName" to MrecEvents.ON_AD_LOADED),
            MrecEvents.ON_AD_FAILED_TO_LOAD to mapOf("registrationName" to MrecEvents.ON_AD_FAILED_TO_LOAD),
            MrecEvents.ON_AD_CLICKED to mapOf("registrationName" to MrecEvents.ON_AD_CLICKED),
            MrecEvents.ON_AD_EXPIRED to mapOf("registrationName" to MrecEvents.ON_AD_EXPIRED)
        )
    }

    private fun getAppodealMrecView(context: Context): MrecView {
        return appodealMrecViewRef.get() ?: run {
            val newMrecView = Appodeal.getMrecView(context.applicationContext)
            appodealMrecViewRef = WeakReference(newMrecView)
            newMrecView
        }
    }

    companion object Companion {
        const val NAME = "RNAppodealMrecView"
    }
} 