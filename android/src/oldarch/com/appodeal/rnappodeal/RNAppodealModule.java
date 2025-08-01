package com.appodeal.rnappodeal;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

public class RNAppodealModule extends ReactContextBaseJavaModule {

    private final RNAppodealModuleImpl moduleImplementation;

    public RNAppodealModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.moduleImplementation = new RNAppodealModuleImpl(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return RNAppodealModuleImpl.NAME;
    }

    @ReactMethod
    public void initialize(String appKey, int adTypes, String pluginVersion) {
        moduleImplementation.initialize(appKey, (double) adTypes, pluginVersion);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isInitialized(int adTypes) {
        return moduleImplementation.isInitialized((double) adTypes);
    }

    @ReactMethod
    public void show(int adTypes, String placement) {
        moduleImplementation.show((double) adTypes, placement);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isLoaded(int adTypes) {
        return moduleImplementation.isLoaded((double) adTypes);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean canShow(int adTypes, String placement) {
        return moduleImplementation.canShow((double) adTypes, placement);
    }

    @ReactMethod
    public void hide(int adTypes) {
        moduleImplementation.hide((double) adTypes);
    }

    @ReactMethod
    public void cache(int adTypes) {
        moduleImplementation.cache((double) adTypes);
    }

    @ReactMethod
    public void setAutoCache(int adTypes, boolean isEnabled) {
        moduleImplementation.setAutoCache((double) adTypes, isEnabled);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isPrecache(int adType) {
        return moduleImplementation.isPrecache((double) adType);
    }

    @ReactMethod
    public void setTabletBanners(boolean flag) {
        moduleImplementation.setTabletBanners(flag);
    }

    @ReactMethod
    public void setSmartBanners(boolean flag) {
        moduleImplementation.setSmartBanners(flag);
    }

    @ReactMethod
    public void setBannerAnimation(boolean flag) {
        moduleImplementation.setBannerAnimation(flag);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public int consentStatus() {
        return (int) moduleImplementation.consentStatus();
    }

    @ReactMethod
    public void requestConsentInfoUpdateWithAppKey(String appKey, final Promise promise) {
        moduleImplementation.requestConsentInfoUpdateWithAppKey(appKey, promise);
    }

    @ReactMethod
    public void showConsentFormIfNeeded(final Promise promise) {
        moduleImplementation.showConsentFormIfNeeded(promise);
    }

    @ReactMethod
    public void showConsentForm(final Promise promise) {
        moduleImplementation.showConsentForm(promise);
    }

    @ReactMethod
    public void revokeConsent() {
        moduleImplementation.revokeConsent();
    }

    @ReactMethod
    public void setChildDirectedTreatment(boolean flag) {
        moduleImplementation.setChildDirectedTreatment(flag);
    }

    @ReactMethod
    public void setTesting(boolean flag) {
        moduleImplementation.setTesting(flag);
    }

    @ReactMethod
    public void setLogLevel(String level) {
        moduleImplementation.setLogLevel(level);
    }

    @ReactMethod
    public void setTriggerPrecacheCallbacks(int adTypes, boolean flag) {
        moduleImplementation.setTriggerPrecacheCallbacks((double) adTypes, flag);
    }

    @ReactMethod
    public void disableNetwork(String networkName, int adTypes) {
        moduleImplementation.disableNetwork(networkName, (double) adTypes);
    }

    @ReactMethod
    public void setUserId(String id) {
        moduleImplementation.setUserId(id);
    }

    @ReactMethod
    public void setExtrasStringValue(String key, String value) {
        moduleImplementation.setExtrasStringValue(key, value);
    }

    @ReactMethod
    public void setExtrasDoubleValue(String key, double value) {
        moduleImplementation.setExtrasDoubleValue(key, value);
    }

    @ReactMethod
    public void setExtrasIntegerValue(String key, int value) {
        moduleImplementation.setExtrasIntegerValue(key, (double) value);
    }

    @ReactMethod
    public void setExtrasBooleanValue(String key, boolean value) {
        moduleImplementation.setExtrasBooleanValue(key, value);
    }

    @ReactMethod
    public void setExtrasMapValue(String key, ReadableMap value) {
        moduleImplementation.setExtrasMapValue(key, value);
    }

    @ReactMethod
    public void removeExtrasValue(String key) {
        moduleImplementation.removeExtrasValue(key);
    }

    @ReactMethod
    public void setCustomStateStringValue(String key, String value) {
        moduleImplementation.setCustomStateStringValue(key, value);
    }

    @ReactMethod
    public void setCustomStateDoubleValue(String key, double value) {
        moduleImplementation.setCustomStateDoubleValue(key, value);
    }

    @ReactMethod
    public void setCustomStateIntegerValue(String key, int value) {
        moduleImplementation.setCustomStateIntegerValue(key, (double) value);
    }

    @ReactMethod
    public void setCustomStateBooleanValue(String key, boolean value) {
        moduleImplementation.setCustomStateBooleanValue(key, value);
    }

    @ReactMethod
    public void setCustomStateMapValue(String key, ReadableMap value) {
        moduleImplementation.setCustomStateMapValue(key, value);
    }

    @ReactMethod
    public void removeCustomStateValue(String key) {
        moduleImplementation.removeCustomStateValue(key);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getRewardParameters(String placement) {
        return moduleImplementation.getRewardParameters(placement);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double predictedEcpm(int adType) {
        return moduleImplementation.predictedEcpm((double) adType);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getPlatformSdkVersion() {
        return moduleImplementation.getPlatformSdkVersion();
    }

    @ReactMethod
    public void trackInAppPurchase(double amount, String currency) {
        moduleImplementation.trackInAppPurchase(amount, currency);
    }

    @ReactMethod
    public void validateAndTrackInAppPurchase(ReadableMap params, Promise promise) {
        moduleImplementation.validateAndTrackInAppPurchase(params, promise);
    }

    @ReactMethod
    public void trackEvent(String name, ReadableMap parameters) {
        moduleImplementation.trackEvent(name, parameters);
    }

    @ReactMethod
    public void setBidonEndpoint(String endpoint) {
        moduleImplementation.setBidonEndpoint(endpoint);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getBidonEndpoint() {
        return moduleImplementation.getBidonEndpoint();
    }

    @ReactMethod
    public void eventsNotifyReady(boolean ready) {
        moduleImplementation.eventsNotifyReady(ready);
    }

    @ReactMethod
    public void eventsAddListener(String eventName) {
        moduleImplementation.eventsAddListener(eventName);
    }

    @ReactMethod
    public void eventsRemoveListener(String eventName, boolean all) {
        moduleImplementation.eventsRemoveListener(eventName, all);
    }

    @ReactMethod
    public void eventsGetListeners(Promise promise) {
        moduleImplementation.eventsGetListeners(promise);
    }
}
