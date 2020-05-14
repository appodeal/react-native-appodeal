package com.reactlibrary;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;
import com.facebook.react.bridge.Arguments;

import java.util.Map;
import java.util.HashMap;

import android.content.pm.PackageManager;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.UserSettings;
import com.appodeal.ads.BannerCallbacks;
import com.appodeal.ads.InterstitialCallbacks;
import com.appodeal.ads.NonSkippableVideoCallbacks;
import com.appodeal.ads.RewardedVideoCallbacks;
import com.appodeal.ads.utils.PermissionsHelper.AppodealPermissionCallbacks;
import com.appodeal.ads.utils.Log;


public class RNAppodealModule extends ReactContextBaseJavaModule implements InterstitialCallbacks, BannerCallbacks, NonSkippableVideoCallbacks, RewardedVideoCallbacks, AppodealPermissionCallbacks {

    private final ReactApplicationContext reactContext;

    public RNAppodealModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        Appodeal.setFramework("react-native", getPluginVersion());
        Appodeal.setInterstitialCallbacks(this);
        Appodeal.setBannerCallbacks(this);
        Appodeal.setNonSkippableVideoCallbacks(this);
        Appodeal.setRewardedVideoCallbacks(this);
    }

    private String getPluginVersion() { return Appodeal.getVersion() + ".1"; }

    private void sendEventToJS(String eventName, WritableMap params) {
        reactContext.getJSModule(RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public String getName() {
        return "RNAppodeal";
    }

    @ReactMethod
    public void showToast(String message) {
        Toast.makeText(getReactApplicationContext(), message, 0).show();
    }

    @ReactMethod
    public void initialize(String appKey, int adTypes, boolean consent) {
        Appodeal.initialize(getCurrentActivity(), appKey, RNAppodealUtils.getAdTypesFormRNTypes(adTypes), consent);
    }

    @ReactMethod
    public void show(int adTypes, String placement, Callback callback) {
        boolean result;
        if (placement == null) {
            result = Appodeal.show(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
        } else {
            result = Appodeal.show(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes), placement);
        }
        if (callback != null) {
            callback.invoke(result);
        }
    }

    @ReactMethod
    public void isLoaded(int adTypes, Callback callback) {
        boolean result = Appodeal.isLoaded(RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
        if (callback != null) {
            callback.invoke(result);
        }
    }

    @ReactMethod
    public void canShow(int adTypes, String placement, Callback callback) {
        boolean result = placement == null ?
                Appodeal.canShow(RNAppodealUtils.getAdTypesFormRNTypes(adTypes)) :
                Appodeal.canShow(RNAppodealUtils.getAdTypesFormRNTypes(adTypes), placement);
        if (callback != null) {
            callback.invoke(result);
        }
    }

    @ReactMethod
    public void updateConsent(boolean consent) {
        Appodeal.updateConsent(consent);
    }

    @ReactMethod
    public void predictedEcpm(int adType, Callback callback) {
        double ecpm = Appodeal.getPredictedEcpm(RNAppodealUtils.getAdTypesFormRNTypes(adType));
        if (callback != null) {
            callback.invoke(ecpm);
        }
    }

    @ReactMethod
    public void cache(int adTypes) {
        Appodeal.cache(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod
    public void hide(int adTypes) {
        Appodeal.hide(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod
    public void setAutoCache(int adTypes, boolean isEnabled) {
        Appodeal.setAutoCache(RNAppodealUtils.getAdTypesFormRNTypes(adTypes), isEnabled);
    }

    @ReactMethod
    public void isPrecache(int adType, Callback callback) {
        boolean result = Appodeal.isPrecache(RNAppodealUtils.getAdTypesFormRNTypes(adType));
        if (callback != null) {
            callback.invoke(result);
        }
    }

    @ReactMethod
    public void setTabletBanners(boolean flag) {
        Appodeal.set728x90Banners(flag);
    }

    @ReactMethod
    public void setSmartBanners(boolean flag) {
        Appodeal.setSmartBanners(flag);
    }

    @ReactMethod
    public void setBannerAnimation(boolean flag) {
        Appodeal.setBannerAnimation(flag);
    }

    @ReactMethod
    public void setBannerBackground(boolean flag) {
        // not supported yet
    }

    @ReactMethod
    public void setTesting(boolean flag) {
        Appodeal.setTesting(flag);
    }

    @ReactMethod
    public void setLogLevel(String level) {
        Appodeal.setLogLevel(RNAppodealUtils.getLogLevelFromString(level));
    }

    @ReactMethod
    public void setChildDirectedTreatment(boolean flag) {
        Appodeal.setChildDirectedTreatment(flag);
    }

    @ReactMethod
    public void setOnLoadedTriggerBoth(int adTypes, boolean flag) {
        Appodeal.setTriggerOnLoadedOnPrecache(RNAppodealUtils.getAdTypesFormRNTypes(adTypes), flag);
    }

    @ReactMethod
    public void disableNetwork(String networkName, int adTypes) {
        Appodeal.disableNetwork(getCurrentActivity(), networkName, RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod
    public void disableLocationPermissionCheck() {
        Appodeal.disableLocationPermissionCheck();
    }

    @ReactMethod
    public void disableWriteExternalStoragePermissionCheck() {
        Appodeal.disableWriteExternalStoragePermissionCheck();
    }

    @ReactMethod
    public void requestAndroidMPermissions() {
        Appodeal.requestAndroidMPermissions(getCurrentActivity(), this);
    }

    @ReactMethod
    public void muteVideosIfCallsMuted(boolean flag) {
        Appodeal.muteVideosIfCallsMuted(flag);
    }

    @ReactMethod
    public void showTestScreen() {
        Appodeal.startTestActivity(getCurrentActivity());
    }

    @ReactMethod
    public void getVersion(Callback callback) {
        if (callback != null) {
            callback.invoke(Appodeal.getVersion());
        }
    }

    @ReactMethod
    public void setExtras(ReadableMap extras) {
        ReadableMapKeySetIterator iterator = extras.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = extras.getType(key);
            switch (type) {
                case Boolean:
                    Appodeal.setExtraData(key, extras.getBoolean(key));
                    break;
                case Number:
                    Appodeal.setExtraData(key, extras.getDouble(key));
                    break;
                case String:
                    Appodeal.setExtraData(key, extras.getString(key));
                    break;
            }
        }
    }

    @ReactMethod
    public void setSegmentFilter(ReadableMap segmentFilter) {
        ReadableMapKeySetIterator iterator = segmentFilter.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = segmentFilter.getType(key);
            switch (type) {
                case Boolean:
                    Appodeal.setSegmentFilter(key, segmentFilter.getBoolean(key));
                    break;
                case Number:
                    Appodeal.setSegmentFilter(key, segmentFilter.getDouble(key));
                    break;
                case String:
                    Appodeal.setSegmentFilter(key, segmentFilter.getString(key));
                    break;
            }
        }
    }

    @ReactMethod
    public void trackInAppPurchase(double amount, String currency) {
        Appodeal.trackInAppPurchase(getCurrentActivity(), amount, currency);
    }

    @ReactMethod
    public void getRewardParameters(ReadableMap args, Callback callback) {
        String placement = args.hasKey("placement") ? args.getString("placement") : null;
        WritableMap params = Arguments.createMap();
        if (placement == null) {
            params.putDouble("amount", Appodeal.getRewardParameters().first);
            params.putString("currency", Appodeal.getRewardParameters().second);
        } else {
            params.putDouble("amount", Appodeal.getRewardParameters(placement).first);
            params.putString("currency", Appodeal.getRewardParameters(placement).second);
        }

        if (callback != null) {
            callback.invoke(params);
        }
    }

    @ReactMethod
    public void setAge(int age) {
        Appodeal.setUserAge(age);
    }

    @ReactMethod
    public void setUserId(String id) { 
        Appodeal.setUserId(id); 
    }

    @ReactMethod
    public void setGender(String gender) { 
        Appodeal.setUserGender(RNAppodealUtils.getGenderFromString(gender)); 
    }

    @Override
    public void onBannerLoaded(int height, boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putInt("height", height);
        params.putBoolean("isPrecache", isPrecache);
        sendEventToJS("onBannerLoaded", params);
    }

    @Override
    public void onBannerFailedToLoad() {
        sendEventToJS("onBannerFailedToLoad", null);
    }

    @Override
    public void onBannerShown() {
        sendEventToJS("onBannerShown", null);
    }

    @Override
    public void onBannerClicked() {
        sendEventToJS("onBannerClicked", null);
    }

    @Override
    public void onBannerShowFailed() { }

    @Override
    public void onBannerExpired() { 
        sendEventToJS("onBannerExpired", null); 
    }

    @Override
    public void onInterstitialLoaded(boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isPrecache", isPrecache);
        sendEventToJS("onInterstitialLoaded", params);
    }

    @Override
    public void onInterstitialFailedToLoad() {
        sendEventToJS("onInterstitialFailedToLoad", null);
    }

    @Override
    public void onInterstitialShowFailed() { 
        sendEventToJS("onInterstitialFaliedToShow", null); 
    }

    @Override
    public void onInterstitialShown() {
        sendEventToJS("onInterstitialShown", null);
    }

    @Override
    public void onInterstitialClosed() {
        sendEventToJS("onInterstitialClosed", null);
    }

    @Override
    public void onInterstitialClicked() {
        sendEventToJS("onInterstitialClicked", null);
    }

    @Override
    public void onInterstitialExpired() { 
        sendEventToJS("onInterstitialExpired", null);
    }

    @Override
    public void onRewardedVideoLoaded(boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isPrecache", isPrecache);
        sendEventToJS("onRewardedVideoLoaded", params);
    }

    @Override
    public void onRewardedVideoFailedToLoad() { 
        sendEventToJS("onRewardedVideoFailedToLoad", null); 
    }

    @Override
    public void onRewardedVideoShowFailed() { 
        sendEventToJS("onRewardedVideoFailedToShow", null); 
    }

    @Override
    public void onRewardedVideoShown() {
        sendEventToJS("onRewardedVideoShown", null);
    }

    @Override
    public void onRewardedVideoClosed(boolean isFinished) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isFinished", isFinished);
        sendEventToJS("onRewardedVideoClosed", params);
    }

    @Override
    public void onRewardedVideoFinished(double amount, String currency) {
        WritableMap params = Arguments.createMap();
        params.putDouble("amount", amount);
        params.putString("currency", currency);
        sendEventToJS("onRewardedVideoFinished", params);
    }

    @Override
    public void onRewardedVideoExpired() { 
        sendEventToJS("onRewardedVideoExpired", null); 
    }

    @Override
    public void onRewardedVideoClicked() { }

    @Override
    public void onNonSkippableVideoLoaded(boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isPrecache", isPrecache);
        sendEventToJS("onNonSkippableVideoLoaded", params);
    }

    @Override
    public void onNonSkippableVideoFailedToLoad() {
        sendEventToJS("onNonSkippableVideoFailedToLoad", null); 
    }

    @Override
    public void onNonSkippableVideoShowFailed() { 
        sendEventToJS("onNonSkippableVideoFailedToShow", null); 
    }

    @Override
    public void onNonSkippableVideoShown() {
        sendEventToJS("onNonSkippableVideoShown", null);
    }

    @Override
    public void onNonSkippableVideoClosed(boolean isFinished) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isFinished", isFinished);
        sendEventToJS("onNonSkippableVideoClosed", params);
    }

    @Override
    public void onNonSkippableVideoFinished() {
        sendEventToJS("onNonSkippableVideoFinished", null);
    }

    @Override
    public void onNonSkippableVideoExpired() { 
        sendEventToJS("onNonSkippableVideoExpired", null); 
    }

    @Override
    public void accessCoarseLocationResponse(int response) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isGranted", response == PackageManager.PERMISSION_GRANTED);
        sendEventToJS("accessCoarseLocationResponse", params);
    }

    @Override
    public void writeExternalStorageResponse(int response) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isGranted", response == PackageManager.PERMISSION_GRANTED);
        sendEventToJS("writeExternalStorageResponse", params);
    }
}