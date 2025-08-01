package com.appodeal.rnappodeal

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNAppodealModuleImpl.NAME)
class RNAppodealModule(
    private val reactContext: ReactApplicationContext
) : NativeAppodealModuleSpec(reactContext) {

    private val moduleImplementation by lazy { RNAppodealModuleImpl(reactContext) }

    override fun getName(): String = RNAppodealModuleImpl.NAME

    // MARK: - NativeAppodealSpec Implementation

    override fun initialize(appKey: String, adTypes: Double, pluginVersion: String) {
        moduleImplementation.initialize(appKey, adTypes, pluginVersion)
    }

    override fun isInitialized(adTypes: Double): Boolean {
        return moduleImplementation.isInitialized(adTypes)
    }

    override fun show(adTypes: Double, placement: String) {
        moduleImplementation.show(adTypes, placement)
    }

    override fun isLoaded(adTypes: Double): Boolean {
        return moduleImplementation.isLoaded(adTypes)
    }

    override fun canShow(adTypes: Double, placement: String): Boolean {
        return moduleImplementation.canShow(adTypes, placement)
    }

    override fun hide(adTypes: Double) {
        moduleImplementation.hide(adTypes)
    }

    override fun cache(adTypes: Double) {
        moduleImplementation.cache(adTypes)
    }

    override fun setAutoCache(adTypes: Double, value: Boolean) {
        moduleImplementation.setAutoCache(adTypes, value)
    }

    override fun isPrecache(adTypes: Double): Boolean {
        return moduleImplementation.isPrecache(adTypes)
    }

    override fun setTabletBanners(value: Boolean) {
        moduleImplementation.setTabletBanners(value)
    }

    override fun setSmartBanners(value: Boolean) {
        moduleImplementation.setSmartBanners(value)
    }

    override fun setBannerAnimation(value: Boolean) {
        moduleImplementation.setBannerAnimation(value)
    }

    override fun consentStatus(): Double {
        return moduleImplementation.consentStatus()
    }

    override fun revokeConsent() {
        moduleImplementation.revokeConsent()
    }

    override fun requestConsentInfoUpdateWithAppKey(appKey: String, promise: Promise) {
        moduleImplementation.requestConsentInfoUpdateWithAppKey(appKey, promise)
    }

    override fun showConsentFormIfNeeded(promise: Promise) {
        moduleImplementation.showConsentFormIfNeeded(promise)
    }

    override fun showConsentForm(promise: Promise) {
        moduleImplementation.showConsentForm(promise)
    }

    override fun setChildDirectedTreatment(value: Boolean) {
        moduleImplementation.setChildDirectedTreatment(value)
    }

    override fun setTesting(value: Boolean) {
        moduleImplementation.setTesting(value)
    }

    override fun setLogLevel(value: String) {
        moduleImplementation.setLogLevel(value)
    }

    override fun setTriggerPrecacheCallbacks(adTypes: Double, value: Boolean) {
        moduleImplementation.setTriggerPrecacheCallbacks(adTypes, value)
    }

    override fun disableNetwork(network: String, adTypes: Double) {
        moduleImplementation.disableNetwork(network, adTypes)
    }

    override fun getPlatformSdkVersion(): String {
        return moduleImplementation.getPlatformSdkVersion()
    }

    override fun setUserId(id: String) {
        moduleImplementation.setUserId(id)
    }

    override fun setExtrasStringValue(key: String, value: String) {
        moduleImplementation.setExtrasStringValue(key, value)
    }

    override fun setExtrasIntegerValue(key: String, value: Double) {
        moduleImplementation.setExtrasIntegerValue(key, value)
    }

    override fun setExtrasDoubleValue(key: String, value: Double) {
        moduleImplementation.setExtrasDoubleValue(key, value)
    }

    override fun setExtrasBooleanValue(key: String, value: Boolean) {
        moduleImplementation.setExtrasBooleanValue(key, value)
    }

    override fun setExtrasMapValue(key: String, value: ReadableMap) {
        moduleImplementation.setExtrasMapValue(key, value)
    }

    override fun removeExtrasValue(key: String) {
        moduleImplementation.removeExtrasValue(key)
    }

    override fun setCustomStateStringValue(key: String, value: String) {
        moduleImplementation.setCustomStateStringValue(key, value)
    }

    override fun setCustomStateIntegerValue(key: String, value: Double) {
        moduleImplementation.setCustomStateIntegerValue(key, value)
    }

    override fun setCustomStateDoubleValue(key: String, value: Double) {
        moduleImplementation.setCustomStateDoubleValue(key, value)
    }

    override fun setCustomStateBooleanValue(key: String, value: Boolean) {
        moduleImplementation.setCustomStateBooleanValue(key, value)
    }

    override fun setCustomStateMapValue(key: String, value: ReadableMap) {
        moduleImplementation.setCustomStateMapValue(key, value)
    }

    override fun removeCustomStateValue(key: String) {
        moduleImplementation.removeCustomStateValue(key)
    }

    override fun getRewardParameters(placement: String): WritableMap {
        return moduleImplementation.getRewardParameters(placement)
    }

    override fun predictedEcpm(adType: Double): Double {
        return moduleImplementation.predictedEcpm(adType)
    }

    override fun trackInAppPurchase(amount: Double, currency: String) {
        moduleImplementation.trackInAppPurchase(amount, currency)
    }

    override fun setBidonEndpoint(endpoint: String) {
        moduleImplementation.setBidonEndpoint(endpoint)
    }

    override fun getBidonEndpoint(): String? {
        return moduleImplementation.getBidonEndpoint()
    }

    override fun validateAndTrackInAppPurchase(purchase: ReadableMap, promise: Promise) {
        moduleImplementation.validateAndTrackInAppPurchase(purchase, promise)
    }

    override fun trackEvent(name: String, parameters: ReadableMap) {
        moduleImplementation.trackEvent(name, parameters)
    }

    override fun eventsNotifyReady(ready: Boolean) {
        moduleImplementation.eventsNotifyReady(ready)
    }

    override fun eventsAddListener(eventName: String) {
        moduleImplementation.eventsAddListener(eventName)
    }

    override fun eventsRemoveListener(eventName: String, all: Boolean) {
        moduleImplementation.eventsRemoveListener(eventName, all)
    }

    override fun eventsGetListeners(promise: Promise) {
        moduleImplementation.eventsGetListeners(promise)
    }
}
