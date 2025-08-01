package com.appodeal.rnappodeal

import android.app.Activity
import android.content.Context
import android.util.Log
import com.appodeal.ads.Appodeal
import com.appodeal.ads.inapp.InAppPurchase
import com.appodeal.ads.inapp.InAppPurchaseValidateCallback
import com.appodeal.ads.service.ServiceError
import com.appodeal.rnappodeal.callbacks.RNAppodealAdRevenueCallbacks
import com.appodeal.rnappodeal.callbacks.RNAppodealBannerCallbacks
import com.appodeal.rnappodeal.callbacks.RNAppodealInterstitialCallbacks
import com.appodeal.rnappodeal.callbacks.RNAppodealMrecCallbacks
import com.appodeal.rnappodeal.callbacks.RNAppodealRewardedVideoCallbacks
import com.appodeal.rnappodeal.ext.AdTypeExtensions.toAppodealTypes
import com.appodeal.rnappodeal.ext.LogLevelExtensions.toLogLevel
import com.appodeal.rnappodeal.ext.PurchaseTypeExtensions.toPurchaseType
import com.appodeal.rnappodeal.ext.PurchaseTypeExtensions.toRNValue
import com.appodeal.rnappodeal.ext.getIntOrNull
import com.appodeal.rnappodeal.ext.getLongOrNull
import com.appodeal.rnappodeal.ext.getMapOrNull
import com.appodeal.rnappodeal.ext.getStringOrNull
import com.appodeal.rnappodeal.ext.toMap
import com.appodeal.rnappodeal.ext.toStringMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import java.lang.ref.WeakReference

internal class RNAppodealModuleImpl(
    private val reactContext: ReactApplicationContext
) : LifecycleEventListener {

    private val eventDispatcher by lazy { RNAEventDispatcher(reactContext) }

    // Lazy callback delegates
    private val interstitialCallbacks by lazy { RNAppodealInterstitialCallbacks(eventDispatcher) }
    private val bannerCallbacks by lazy { RNAppodealBannerCallbacks(eventDispatcher) }
    private val mrecCallbacks by lazy { RNAppodealMrecCallbacks(eventDispatcher) }
    private val rewardedVideoCallbacks by lazy { RNAppodealRewardedVideoCallbacks(eventDispatcher) }
    private val adRevenueCallbacks by lazy { RNAppodealAdRevenueCallbacks(eventDispatcher) }

    // Consent handler
    private val consentHandler by lazy { RNAppodealConsent() }

    // Current activity reference to handle React Native's getCurrentActivity() bug
    // Using WeakReference to prevent memory leaks
    private var currentActivity: WeakReference<Activity>? = null

    init {
        this.currentActivity = WeakReference(reactContext.currentActivity)
        this.reactContext.addLifecycleEventListener(this)
    }

    /**
     * Safely gets the current activity, handling React Native's getCurrentActivity() bug.
     * React Native has a bug where `getCurrentActivity()` returns null: https://github.com/facebook/react-native/issues/18345
     * @return Current activity or null if not available
     */
    private fun getActivity(): Activity? {
        if (reactContext.hasCurrentActivity()) {
            currentActivity = WeakReference(reactContext.currentActivity)
        }
        return currentActivity?.get()
    }

    /**
     * Gets a context for Appodeal operations, preferring current activity but falling back to application context.
     * @return Context for Appodeal operations
     */
    private fun getContext(): Context {
        return getActivity() ?: reactContext.applicationContext
    }

    /**
     * Safely executes Appodeal operations that require activity.
     * @param methodName Name of the calling method
     * @param operation Lambda to execute if activity is available
     */
    private fun withActivity(methodName: String, operation: (Activity) -> Unit) {
        val activity = getActivity()
        if (activity != null) {
            operation(activity)
        } else {
            Log.e("RNAppodealModuleImpl", "Unable to get current Activity for $methodName()")
        }
    }

    /**
     * Safely executes Appodeal operations that require activity and can reject promises.
     * @param methodName Name of the calling method
     * @param promise The React Native promise to reject if activity is unavailable
     * @param operation Lambda to execute if activity is available
     */
    private fun withActivity(methodName: String, promise: Promise, operation: (Activity) -> Unit) {
        val activity = getActivity()
        if (activity != null) {
            operation(activity)
        } else {
            Log.e("RNAppodealModuleImpl", "Unable to get current Activity for $methodName()")
            promise.reject(ERROR_ACTIVITY_UNAVAILABLE, "Unable to get current Activity")
        }
    }

    fun initialize(appKey: String, adTypes: Double, pluginVersion: String) {
        val context: Context = getContext()

        // Set up Appodeal framework and callbacks
        Appodeal.setFramework("react-native", pluginVersion)
        Appodeal.setInterstitialCallbacks(interstitialCallbacks)
        Appodeal.setBannerCallbacks(bannerCallbacks)
        Appodeal.setMrecCallbacks(mrecCallbacks)
        Appodeal.setRewardedVideoCallbacks(rewardedVideoCallbacks)
        Appodeal.setAdRevenueCallbacks(adRevenueCallbacks)

        // Set up Appodeal options
        Appodeal.setUseSafeArea(true)
        Appodeal.setSharedAdsInstanceAcrossActivities(true)

        Appodeal.initialize(
            context = context,
            appKey = appKey,
            adTypes = adTypes.toAppodealTypes()
        ) { eventDispatcher.dispatchEvent("onAppodealInitialized", null) }
    }

    fun isInitialized(adTypes: Double): Boolean {
        return Appodeal.isInitialized(adTypes.toAppodealTypes())
    }

    fun show(adTypes: Double, placement: String) {
        val types = adTypes.toAppodealTypes()
        withActivity("show") { activity ->
            Appodeal.show(activity, types, placement)
        }
    }

    fun isLoaded(adTypes: Double): Boolean {
        return Appodeal.isLoaded(adTypes.toAppodealTypes())
    }

    fun canShow(adTypes: Double, placement: String): Boolean {
        val types = adTypes.toAppodealTypes()
        return Appodeal.canShow(types, placement)
    }

    fun hide(adTypes: Double) {
        withActivity("hide") { activity ->
            Appodeal.hide(activity, adTypes.toAppodealTypes())
        }
    }

    fun cache(adTypes: Double) {
        withActivity("cache") { activity ->
            Appodeal.cache(activity, adTypes.toAppodealTypes())
        }
    }

    fun setAutoCache(adTypes: Double, value: Boolean) {
        Appodeal.setAutoCache(adTypes.toAppodealTypes(), value)
    }

    fun isPrecache(adTypes: Double): Boolean {
        return Appodeal.isPrecache(adTypes.toAppodealTypes())
    }

    fun setTabletBanners(value: Boolean) {
        Appodeal.set728x90Banners(value)
    }

    fun setSmartBanners(value: Boolean) {
        Appodeal.setSmartBanners(value)
    }

    fun setBannerAnimation(value: Boolean) {
        Appodeal.setBannerAnimation(value)
    }

    fun consentStatus(): Double {
        return consentHandler.getConsentStatusAsDouble()
    }

    fun revokeConsent() {
        consentHandler.revokeConsent(getContext())
    }

    fun requestConsentInfoUpdateWithAppKey(appKey: String, promise: Promise) {
        withActivity("requestConsentInfoUpdateWithAppKey", promise) { activity ->
            consentHandler.requestConsentInfoUpdate(activity, appKey, promise)
        }
    }

    fun showConsentFormIfNeeded(promise: Promise) {
        withActivity("showConsentFormIfNeeded", promise) { activity ->
            consentHandler.showConsentFormIfNeeded(activity, promise)
        }
    }

    fun showConsentForm(promise: Promise) {
        withActivity("showConsentForm", promise) { activity ->
            consentHandler.showConsentForm(activity, promise)
        }
    }

    fun setChildDirectedTreatment(value: Boolean) {
        Appodeal.setChildDirectedTreatment(value)
    }

    fun setTesting(value: Boolean) {
        Appodeal.setTesting(value)
    }

    fun setLogLevel(value: String) {
        Appodeal.setLogLevel(value.toLogLevel())
    }

    fun setTriggerPrecacheCallbacks(adTypes: Double, value: Boolean) {
        Appodeal.setTriggerOnLoadedOnPrecache(adTypes.toAppodealTypes(), value)
    }

    fun disableNetwork(network: String, adTypes: Double) {
        Appodeal.disableNetwork(network, adTypes.toAppodealTypes())
    }

    fun getPlatformSdkVersion(): String {
        return Appodeal.getVersion()
    }

    fun setUserId(id: String) {
        Appodeal.setUserId(id)
    }

    fun setExtrasStringValue(key: String, value: String) {
        Appodeal.setExtraData(key, value)
    }

    fun setExtrasIntegerValue(key: String, value: Double) {
        Appodeal.setExtraData(key, value.toInt())
    }

    fun setExtrasDoubleValue(key: String, value: Double) {
        Appodeal.setExtraData(key, value)
    }

    fun setExtrasBooleanValue(key: String, value: Boolean) {
        Appodeal.setExtraData(key, value)
    }

    fun setExtrasMapValue(key: String, value: ReadableMap) {
        Appodeal.setExtraData(key, value.toMap())
    }

    fun removeExtrasValue(key: String) {
        Appodeal.setExtraData(key, null)
    }

    fun setCustomStateStringValue(key: String, value: String) {
        Appodeal.setCustomFilter(key, value)
    }

    fun setCustomStateIntegerValue(key: String, value: Double) {
        Appodeal.setCustomFilter(key, value.toInt())
    }

    fun setCustomStateDoubleValue(key: String, value: Double) {
        Appodeal.setCustomFilter(key, value)
    }

    fun setCustomStateBooleanValue(key: String, value: Boolean) {
        Appodeal.setCustomFilter(key, value)
    }

    fun setCustomStateMapValue(key: String, value: ReadableMap) {
        Appodeal.setCustomFilter(key, value.toMap())
    }

    fun removeCustomStateValue(key: String) {
        Appodeal.setCustomFilter(key, null)
    }

    fun getRewardParameters(placement: String): WritableMap {
        val reward = Appodeal.getReward(placement)
        return Arguments.createMap().apply {
            putString("name", reward.currency)
            putString("amount", reward.amount.toString())
        }
    }

    fun predictedEcpm(adType: Double): Double {
        return Appodeal.getPredictedEcpm(adType.toAppodealTypes())
    }

    fun trackInAppPurchase(amount: Double, currency: String) {
        Appodeal.trackInAppPurchase(getContext(), amount, currency)
    }

    fun setBidonEndpoint(endpoint: String) {
        Appodeal.setBidonEndpoint(endpoint)
    }

    fun getBidonEndpoint(): String? {
        return Appodeal.getBidonEndpoint()
    }

    fun validateAndTrackInAppPurchase(params: ReadableMap, promise: Promise) {
        // Extract parameters using null-safe extraction methods
        val productType = params.getIntOrNull("productType")?.toPurchaseType() ?: run {
            promise.reject(ERROR_MISSING_PRODUCT_TYPE, "productType is required")
            return
        }
        val publicKey = params.getStringOrNull("publicKey")
        val signature = params.getStringOrNull("signature")
        val purchaseData = params.getStringOrNull("purchaseData")
        val purchaseToken = params.getStringOrNull("purchaseToken")
        val timestamp = params.getLongOrNull("timestamp")
        val developerPayload = params.getStringOrNull("developerPayload")
        val orderId = params.getStringOrNull("orderId")
        val sku = params.getStringOrNull("sku")
        val price = params.getStringOrNull("price")
        val currency = params.getStringOrNull("currency")
        val additionalParameters = params.getMapOrNull("additionalParameters")?.toStringMap()

        val purchaseBuilder = InAppPurchase.newBuilder(productType)
        publicKey?.let { purchaseBuilder.withPublicKey(it) }
        signature?.let { purchaseBuilder.withSignature(it) }
        purchaseData?.let { purchaseBuilder.withPurchaseData(it) }
        purchaseToken?.let { purchaseBuilder.withPurchaseToken(it) }
        timestamp?.let { purchaseBuilder.withPurchaseTimestamp(it) }
        developerPayload?.let { purchaseBuilder.withDeveloperPayload(it) }
        orderId?.let { purchaseBuilder.withOrderId(it) }
        sku?.let { purchaseBuilder.withSku(it) }
        price?.let { purchaseBuilder.withPrice(it) }
        currency?.let { purchaseBuilder.withCurrency(it) }
        additionalParameters?.let { purchaseBuilder.withAdditionalParams(it) }

        val purchase = purchaseBuilder.build()

        // Validate the purchase
        Appodeal.validateInAppPurchase(
            context = getContext(),
            purchase = purchase,
            callback = object : InAppPurchaseValidateCallback {
                override fun onInAppPurchaseValidateSuccess(
                    purchase: InAppPurchase,
                    errors: List<ServiceError>?
                ) {
                    val result = Arguments.createMap().apply {
                        putString("publicKey", purchase.publicKey)
                        putString("signature", purchase.signature)
                        putString("purchaseData", purchase.purchaseData)
                        putString("purchaseToken", purchase.purchaseToken)
                        putInt("timestamp", purchase.purchaseTimestamp.toInt())
                        putString("developerPayload", purchase.developerPayload)
                        putString("orderId", purchase.orderId)
                        putString("sku", purchase.sku)
                        putString("price", purchase.price)
                        putString("currency", purchase.currency)
                        putInt("productType", purchase.type.toRNValue())
                    }
                    promise.resolve(result)
                }

                override fun onInAppPurchaseValidateFail(
                    purchase: InAppPurchase,
                    errors: List<ServiceError>
                ) {
                    val errorMessage =
                        if (errors.isNotEmpty()) errors[0].toString() else "Validation failed"
                    promise.reject(ERROR_VALIDATION_FAILED, errorMessage)
                }
            })
    }

    fun trackEvent(name: String, parameters: ReadableMap) {
        Appodeal.logEvent(name, parameters.toMap())
    }

    // MARK: - Event Management

    fun eventsNotifyReady(ready: Boolean) {
        eventDispatcher.initializeWithReadyState(ready)
    }

    fun eventsAddListener(eventName: String) {
        eventDispatcher.registerListener(eventName)
    }

    fun eventsRemoveListener(eventName: String, all: Boolean) {
        eventDispatcher.unregisterListener(eventName, all)
    }

    fun eventsGetListeners(promise: Promise) {
        promise.resolve(eventDispatcher.getDiagnostics())
    }

    // MARK: - LifecycleEventListener Implementation

    override fun onHostDestroy() {
        Appodeal.destroy(Appodeal.BANNER)
        Appodeal.destroy(Appodeal.MREC)
    }

    override fun onHostPause() {
        // Not implemented
    }

    override fun onHostResume() {
        // Not implemented
    }

    companion object Companion {
        const val NAME = "RNAppodeal"

        // Error constants
        private const val ERROR_ACTIVITY_UNAVAILABLE = "ACTIVITY_ERROR"

        // Error validation constants
        private const val ERROR_MISSING_PRODUCT_TYPE = "MISSING_PRODUCT_TYPE"
        private const val ERROR_VALIDATION_FAILED = "VALIDATION_FAILED"
    }
}

