package com.reactlibrary;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
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

	private static final String DURATION_SHORT_KEY = "SHORT";
	private static final String DURATION_LONG_KEY = "LONG";

	private Callback accessCoarseLocation;
	private Callback writeExternalStorage;

	private UserSettings settings;

	public RNAppodealModule(ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;
		Appodeal.setInterstitialCallbacks(this);
		Appodeal.setBannerCallbacks(this);
		Appodeal.setNonSkippableVideoCallbacks(this);
		Appodeal.setRewardedVideoCallbacks(this);
	}

	@Override
	public String getName() {
		return "RNAppodeal";
	}

	@Override
	public Map<String, Object> getConstants() {
		final Map<String, Object> constants = new HashMap<>();

		constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
		constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);

		constants.put("NONE", Appodeal.NONE);
		constants.put("INTERSTITIAL", Appodeal.INTERSTITIAL);
		constants.put("BANNER", Appodeal.BANNER);
		constants.put("BANNER_TOP", Appodeal.BANNER_TOP);
		constants.put("BANNER_BOTTOM", Appodeal.BANNER_BOTTOM);
		constants.put("NON_SKIPPABLE_VIDEO", Appodeal.NON_SKIPPABLE_VIDEO);
		constants.put("REWARDED_VIDEO", Appodeal.REWARDED_VIDEO);

		constants.put("GENDER_MALE", UserSettings.Gender.MALE.name());
		constants.put("GENDER_FEMALE", UserSettings.Gender.FEMALE.name());
		constants.put("GENDER_OTHER", UserSettings.Gender.OTHER.name());

		constants.put("LOG_LEVEL_VERBOSE", Log.LogLevel.verbose.name());
		constants.put("LOG_LEVEL_DEBUG", Log.LogLevel.debug.name());
		constants.put("LOG_LEVEL_NONE", Log.LogLevel.none.name());
		return constants;
	}

	@ReactMethod
	public void showToast(String message, int duration) {
		Toast.makeText(getReactApplicationContext(), message, duration).show();
	}

	@ReactMethod
	public void initialize(String appKey, int adTypes) {
		Appodeal.setFramework("react-native", "2.1.3");
		Appodeal.initialize(getCurrentActivity(), appKey, adTypes);
	}

	@ReactMethod
	public void show(ReadableMap args, Callback callback){
		int adType = args.getInt("adType");
		String placement = args.hasKey("placement") ? args.getString("placement") : null;
		boolean result;
		if (placement == null)
			result = Appodeal.show(getCurrentActivity(), adType);
		else
			result = Appodeal.show(getCurrentActivity(), adType, placement);
		if (callback != null)
			callback.invoke(result);
	}

	@ReactMethod
	public void isLoaded(int adTypes, Callback callback){
		boolean result =  Appodeal.isLoaded(adTypes);
		if(callback != null)
			callback.invoke(result);
	}

	@ReactMethod
	public void cache(int adTypes){
		Appodeal.cache(getCurrentActivity(), adTypes);
	}

	@ReactMethod
	public void hide(int adTypes){
		Appodeal.hide(getCurrentActivity(), adTypes);
	}

	@ReactMethod
	public void setAutoCache(int adTypes, boolean isEnabled){
		Appodeal.setAutoCache(adTypes, isEnabled);
	}

	@ReactMethod
	public void isPrecache(int adType, Callback callback){
		boolean result = Appodeal.isPrecache(adType);
		if(callback != null)
			callback.invoke(result);
	}

	@ReactMethod
	public void setTabletBanners(boolean flag){
		Appodeal.set728x90Banners(flag);
	}

	@ReactMethod
	public void setSmartBanners(boolean flag){
		Appodeal.setSmartBanners(flag);
	}

	@ReactMethod
	public void setBannerAnimation(boolean flag){
		Appodeal.setBannerAnimation(flag);
	}

	@ReactMethod
	public void setBannerBackground(boolean flag){
		// not supported yet
	}

	@ReactMethod
	public void setTesting(boolean flag){
		Appodeal.setTesting(flag);
	}

	@ReactMethod
	public void setLogLevel(String level){
		Appodeal.setLogLevel(Log.LogLevel.valueOf(level));
	}

	@ReactMethod
	public void setChildDirectedTreatment(boolean flag){
		Appodeal.setChildDirectedTreatment(flag);
	}

	@ReactMethod
	public void setOnLoadedTriggerBoth(int adTypes, boolean flag){
		Appodeal.setTriggerOnLoadedOnPrecache(adTypes, flag);
	}

	@ReactMethod
	public void disableNetwork(ReadableMap args){
		String networkName = args.getString("network");
		int adTypes = args.hasKey("adType") ? args.getInt("adType") : -1;
		if(adTypes == -1)
			Appodeal.disableNetwork(getCurrentActivity(), networkName);
		else
			Appodeal.disableNetwork(getCurrentActivity(), networkName, adTypes);
	}

	@ReactMethod
	public void disableLocationPermissionCheck(){
		Appodeal.disableLocationPermissionCheck();
	}

	@ReactMethod
	public void disableWriteExternalStoragePermissionCheck(){
		Appodeal.disableWriteExternalStoragePermissionCheck();
	}

	@ReactMethod
	public void requestAndroidMPermissions(){
		Appodeal.requestAndroidMPermissions(getCurrentActivity(), this);
	}

	@ReactMethod
	public void muteVideosIfCallsMuted(boolean flag){
		Appodeal.muteVideosIfCallsMuted(flag);
	}

	@ReactMethod
	public void showTestScreen(){
		Appodeal.startTestActivity(getCurrentActivity());
	}

	@ReactMethod
	public void getVersion(Callback callback){
		if (callback != null)
			callback.invoke(Appodeal.getVersion());
	}

	@ReactMethod
	public void canShow(ReadableMap args, Callback callback){
		int adType = args.getInt("adType");
		String placement = args.hasKey("placement") ? args.getString("placement") : null;
		boolean result;
		if (placement == null)
			result = Appodeal.canShow(adType);
		else
			result = Appodeal.canShow(adType, placement);
		if (callback != null)
			callback.invoke(result);
	}

	@ReactMethod
	public void setCustomStringRule(String name, String value){
		Appodeal.setCustomRule(name, value);
	}

	@ReactMethod
	public void setCustomBooleanRule(String name, boolean value){
		Appodeal.setCustomRule(name, value);
	}

	@ReactMethod
	public void setCustomIntegerRule(String name, int value){
		Appodeal.setCustomRule(name, value);
	}

	@ReactMethod
	public void setCustomDoubleRule(String name, double value){
		Appodeal.setCustomRule(name, value);
	}

	@ReactMethod
	public void trackInAppPurchase(double amount, String currency){
		Appodeal.trackInAppPurchase(getCurrentActivity(), amount, currency);
	}

	@ReactMethod
	public void getRewardParameters(ReadableMap args, Callback callback){
		String placement = args.hasKey("placement") ? args.getString("placement") : null;
		WritableMap params = Arguments.createMap();
		if (placement == null) {
			params.putInt("amount", Appodeal.getRewardParameters().first);
			params.putString("currency", Appodeal.getRewardParameters().second);
		} else {
			params.putInt("amount", Appodeal.getRewardParameters(placement).first);
			params.putString("currency", Appodeal.getRewardParameters(placement).second);
		}

		if (callback != null)
			callback.invoke(params);
	}

	private UserSettings getUserSettings(){
		if(settings == null)
			settings = Appodeal.getUserSettings(getCurrentActivity());
		return settings;
	}

	@ReactMethod
	public void setAge(int age){
		getUserSettings().setAge(age);
	}

	@ReactMethod
	public void setUserId(String id){
		getUserSettings().setUserId(id);
	}

	@ReactMethod
	public void setGender(String gender){
		getUserSettings().setGender(UserSettings.Gender.valueOf(gender));
	}

	private void sendEventToJS(String eventName, WritableMap params){
		reactContext.getJSModule(RCTDeviceEventEmitter.class).emit(eventName, params);
	}

	@Override
	public void onInterstitialClicked() {
		sendEventToJS("onInterstitialClicked", null);
	}

	@Override
	public void onInterstitialClosed() {
		sendEventToJS("onInterstitialClosed", null);
	}

	@Override
	public void onInterstitialFailedToLoad() {
		sendEventToJS("onInterstitialFailedToLoad", null);
	}

	@Override
	public void onInterstitialLoaded(boolean isPrecache) {
		WritableMap params = Arguments.createMap();
		params.putBoolean("isPrecache", isPrecache);
		sendEventToJS("onInterstitialLoaded", params);
	}

	@Override
	public void onInterstitialShown() {
		sendEventToJS("onInterstitialShown", null);
	}

	@Override
	public void onBannerClicked() {
		sendEventToJS("onBannerClicked", null);
	}

	@Override
	public void onBannerFailedToLoad() {
		sendEventToJS("onBannerFailedToLoad", null);
	}

	@Override
	public void onBannerLoaded(int height, boolean isPrecache) {
		WritableMap params = Arguments.createMap();
		params.putInt("height", height);
		params.putBoolean("isPrecache", isPrecache);
		sendEventToJS("onBannerLoaded", params);
	}

	@Override
	public void onBannerShown() {
		sendEventToJS("onBannerShown", null);
	}

	@Override
	public void onNonSkippableVideoClosed(boolean isFinished) {
		WritableMap params = Arguments.createMap();
		params.putBoolean("isFinished", isFinished);
		sendEventToJS("onNonSkippableVideoClosed", params);
	}

	@Override
	public void onNonSkippableVideoFailedToLoad() {
		sendEventToJS("onNonSkippableVideoFailedToLoad", null);
	}

	@Override
	public void onNonSkippableVideoFinished() {
		sendEventToJS("onNonSkippableVideoFinished", null);
	}

	@Override
	public void onNonSkippableVideoLoaded() {
		sendEventToJS("onNonSkippableVideoLoaded", null);
	}

	@Override
	public void onNonSkippableVideoShown() {
		sendEventToJS("onNonSkippableVideoShown", null);
	}

	@Override
	public void onRewardedVideoClosed(boolean isFinished) {
		WritableMap params = Arguments.createMap();
		params.putBoolean("isFinished", isFinished);
		sendEventToJS("onRewardedVideoClosed", params);
	}

	@Override
	public void onRewardedVideoFailedToLoad() {
		sendEventToJS("onRewardedVideoFailedToLoad", null);
	}

	@Override
	public void onRewardedVideoFinished(int amount, String currency) {
		WritableMap params = Arguments.createMap();
		params.putInt("amount", amount);
		params.putString("currency", currency);
		sendEventToJS("onRewardedVideoFinished", params);
	}

	@Override
	public void onRewardedVideoLoaded() {
		sendEventToJS("onRewardedVideoLoaded", null);
	}

	@Override
	public void onRewardedVideoShown() {
		sendEventToJS("onRewardedVideoShown", null);
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