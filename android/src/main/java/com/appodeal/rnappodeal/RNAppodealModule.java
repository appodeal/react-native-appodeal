package com.appodeal.rnappodeal;

import com.appodeal.ads.inapp.InAppPurchase;
import com.appodeal.ads.inapp.InAppPurchaseValidateCallback;
import com.appodeal.ads.initializing.ApdInitializationCallback;
import com.appodeal.ads.initializing.ApdInitializationError;
import com.appodeal.ads.revenue.AdRevenueCallbacks;
import com.appodeal.ads.revenue.RevenueInfo;
import com.appodeal.ads.service.ServiceError;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;
import com.facebook.react.bridge.Arguments;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerCallbacks;
import com.appodeal.ads.InterstitialCallbacks;
import com.appodeal.ads.RewardedVideoCallbacks;

import org.json.JSONObject;
import java.util.List;


public class RNAppodealModule extends ReactContextBaseJavaModule implements InterstitialCallbacks, AdRevenueCallbacks, BannerCallbacks, RewardedVideoCallbacks, LifecycleEventListener {

    private final ReactApplicationContext reactContext;

    public RNAppodealModule(ReactApplicationContext reactContext) {
        super(reactContext);

        Appodeal.setFramework("react-native", getPluginVersion());
        Appodeal.setInterstitialCallbacks(this);
        Appodeal.setBannerCallbacks(this);
        Appodeal.setRewardedVideoCallbacks(this);
        Appodeal.setAdRevenueCallbacks(this);

        this.reactContext = reactContext;
        this.reactContext.addLifecycleEventListener(this);
    }

    private String getPluginVersion() {
        return "3.2.0";
    }

    private void sendEventToJS(String eventName, WritableMap params) {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext.getJSModule(RCTDeviceEventEmitter.class).emit(eventName, params);
        }
    }

    @Override
    public String getName() {
        return "RNAppodeal";
    }

    @ReactMethod
    public void initializeWithAppKey(String appKey, int adTypes) {
        Appodeal.initialize(getCurrentActivity(),
                appKey,
                RNAppodealUtils.getAdTypesFormRNTypes(adTypes),
                list -> sendEventToJS("onAppodealInitialized", null)
        );
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isInitialized(int adTypes) {
        return Appodeal.isInitialized(RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod
    public void show(int adTypes, String placement) {
        boolean result;
        if (placement == null) {
            Appodeal.show(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
        } else {
            Appodeal.show(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes), placement);
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isLoaded(int adTypes) {
        return Appodeal.isLoaded(RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean canShow(int adTypes, String placement) {
       return placement == null ?
                Appodeal.canShow(RNAppodealUtils.getAdTypesFormRNTypes(adTypes)) :
                Appodeal.canShow(RNAppodealUtils.getAdTypesFormRNTypes(adTypes), placement);
    }

    @ReactMethod
    public void hide(int adTypes) {
        Appodeal.hide(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod
    public void cache(int adTypes) {
        Appodeal.cache(getCurrentActivity(), RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod
    public void setAutoCache(int adTypes, boolean isEnabled) {
        Appodeal.setAutoCache(RNAppodealUtils.getAdTypesFormRNTypes(adTypes), isEnabled);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isPrecache(int adType) {
        return Appodeal.isPrecache(RNAppodealUtils.getAdTypesFormRNTypes(adType));
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
    public void updateGDPRConsent(int status) {
        Appodeal.updateGDPRUserConsent(RNAppodealUtils.getGDPRUserConsentFromRNGDPRUserConsent(status));
    }

    @ReactMethod
    public void updateCCPAConsent(int status) {
        Appodeal.updateCCPAUserConsent(RNAppodealUtils.getCCPAUserConsentFromRNCCPAUserConsent(status));
    }

    @ReactMethod
    public void setChildDirectedTreatment(boolean flag) {
        Appodeal.setChildDirectedTreatment(flag);
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
    public void setTriggerPrecacheCallbacks(int adTypes, boolean flag) {
        Appodeal.setTriggerOnLoadedOnPrecache(RNAppodealUtils.getAdTypesFormRNTypes(adTypes), flag);
    }

    @ReactMethod
    public void disableNetwork(String networkName, int adTypes) {
        Appodeal.disableNetwork(networkName, RNAppodealUtils.getAdTypesFormRNTypes(adTypes));
    }

    @ReactMethod
    public void setUserId(String id) {
        Appodeal.setUserId(id);
    }

    @ReactMethod
    public void setExtrasStringValue(String value, String key) {
        Appodeal.setExtraData(key, value);
    }

    @ReactMethod
    public void setExtrasDoubleValue(double value, String key) {
        Appodeal.setExtraData(key, value);
    }

    @ReactMethod
    public void setExtrasIntegerValue(int value, String key) {
        Appodeal.setExtraData(key, value);
    }

    @ReactMethod
    public void setExtrasBooleanValue(boolean value, String key) {
        Appodeal.setExtraData(key, value);
    }

    @ReactMethod
    public void setExtrasMapValue(ReadableMap value, String key) {
        Appodeal.setExtraData(key, value.toHashMap());
    }

    @ReactMethod
    public void removeExtrasValue(String key) {
        Appodeal.setExtraData(key, (Object) null);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getExtras() {
        return Arguments.createMap();
    }

    @ReactMethod
    public void setCustomStateStringValue(String value, String key) {
        Appodeal.setCustomFilter(key, value);
    }

    @ReactMethod
    public void setCustomStateDoubleValue(double value, String key) {
        Appodeal.setCustomFilter(key, value);
    }

    @ReactMethod
    public void setCustomStateIntegerValue(int value, String key) {
        Appodeal.setCustomFilter(key, value);
    }

    @ReactMethod
    public void setCustomStateBooleanValue(boolean value, String key) {
        Appodeal.setCustomFilter(key, value);
    }

    @ReactMethod
    public void removeCustomStateValue(String key) {
        Appodeal.setCustomFilter(key, (Object) null);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getCustomState() {
        return Arguments.createMap();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getRewardParameters(ReadableMap args) {
        String placement = args.hasKey("placement") ? args.getString("placement") : null;
        WritableMap params = Arguments.createMap();
        if (placement == null) {
            params.putDouble("amount", Appodeal.getReward().getAmount());
            params.putString("currency", Appodeal.getReward().getCurrency());
        } else {
            params.putDouble("amount", Appodeal.getReward(placement).getAmount());
            params.putString("currency", Appodeal.getReward(placement).getCurrency());
        }

        return params;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double predictedEcpm(int adType) {
        double ecpm = Appodeal.getPredictedEcpm(RNAppodealUtils.getAdTypesFormRNTypes(adType));
        return ecpm;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getVersion() {
        return Appodeal.getVersion();
    }

    @ReactMethod
    public void trackInAppPurchase(double amount, String currency) {
        Appodeal.trackInAppPurchase(getCurrentActivity(), amount, currency);
    }

    @ReactMethod
    public void validateAndTrackInAppPurchase(ReadableMap params, Callback callback) {
        InAppPurchase.Type productType = RNAppodealUtils.getPurchaseTypeFromRNPurchaseType(params.getInt("productType"));

        InAppPurchase purchase = InAppPurchase.newBuilder(productType)
                .withPublicKey(params.getString("publicKey"))
                .withSignature(params.getString("signature"))
                .withPurchaseData(params.getString("purchaseData"))
                .withPurchaseToken(params.getString("purchaseToken"))
                .withPurchaseTimestamp(params.getInt("timestamp"))
                .withDeveloperPayload(params.getString("developerPayload"))
                .withOrderId(params.getString("orderId"))
                .withSku(params.getString("sku"))
                .withPrice(params.getString("price"))
                .withCurrency(params.getString("currency"))
                .withAdditionalParams(RNAppodealUtils.getMapFromReadableMap(params.getMap("additionalParameters")))
                .build();

        Appodeal.validateInAppPurchase(getCurrentActivity(), purchase, new InAppPurchaseValidateCallback() {
            @Override
            public void onInAppPurchaseValidateSuccess(InAppPurchase inAppPurchase, List<ServiceError> list) {
                WritableMap result = Arguments.createMap();

                result.putString("publicKey", inAppPurchase.getPublicKey());
                result.putString("signature", inAppPurchase.getSignature());
                result.putString("purchaseData", inAppPurchase.getPurchaseData());
                result.putString("purchaseToken", inAppPurchase.getPurchaseToken());
                result.putInt("timestamp", (int)inAppPurchase.getPurchaseTimestamp());
                result.putString("developerPayload", inAppPurchase.getDeveloperPayload());
                result.putString("orderId", inAppPurchase.getOrderId());
                result.putString("sku", inAppPurchase.getSku());
                result.putString("price", inAppPurchase.getPrice());
                result.putString("currency", inAppPurchase.getCurrency());
                result.putInt("productType", RNAppodealUtils.getRNPurchaseTypeFromType(inAppPurchase.getType()));

                if (callback != null) {
                    callback.invoke(result, null);
                }
            }

            @Override
            public void onInAppPurchaseValidateFail(InAppPurchase inAppPurchase, List<ServiceError> list) {
                String error = list.size() > 0 ? list.get(0).toString() : null;
                if (callback != null) {
                    callback.invoke(null, error);
                }
            }
        });
    }

    @ReactMethod
    public void trackEvent(String name, ReadableMap parameters) {
        Appodeal.logEvent(name, parameters.toHashMap());
    }

    @Override
    public void onAdRevenueReceive(RevenueInfo revenueInfo) {
        WritableMap params = Arguments.createMap();
        params.putString("networkName", revenueInfo.getNetworkName());
        params.putString("adUnitName", revenueInfo.getAdUnitName());
        params.putString("placement", revenueInfo.getPlacement());
        params.putString("revenuePrecision", revenueInfo.getRevenuePrecision());
        params.putString("demandSource", revenueInfo.getDemandSource());
        params.putString("currency", revenueInfo.getCurrency());
        params.putDouble("revenue", revenueInfo.getRevenue());
        params.putDouble("adType", RNAppodealUtils.getRNTypesFromAdType(revenueInfo.getAdType()));

        sendEventToJS("onAppodealDidReceiveRevenue", params);
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
    public void onBannerShowFailed() {
    }

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
    public void onRewardedVideoClicked() { sendEventToJS("onRewardedVideoClicked", null); }

    @Override
    public void onHostDestroy() {
        Appodeal.destroy(Appodeal.BANNER);
        Appodeal.destroy(Appodeal.MREC);
    }

    @Override
    public void onHostPause() { }

    @Override
    public void onHostResume() { }
}