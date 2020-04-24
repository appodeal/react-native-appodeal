package com.reactlibrary;
;
import android.widget.FrameLayout;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.AppodealUnityBannerView;
import com.appodeal.ads.BannerCallbacks;
import com.appodeal.ads.BannerView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;


public class RCTAppodealBannerView extends ReactViewGroup implements LifecycleEventListener, BannerCallbacks {
    private FrameLayout adView;
    private ThemedReactContext mContext;
    private RCTEventEmitter mEventEmitter;

    public RCTAppodealBannerView(ThemedReactContext context) {
        super(context);
        mContext = context;
        mContext.addLifecycleEventListener(this);
        mEventEmitter = mContext.getJSModule(RCTEventEmitter.class);
    }

    public void setAdSize(String adSize) {
       Appodeal.setBannerCallbacks(this);
       int adType = adSize.equals("mrec") ? Appodeal.MREC : Appodeal.BANNER;
       Appodeal.cache(mContext.getCurrentActivity(), adType);
    }

    @Override
    public void onHostResume() { }

    @Override
    public void onHostPause() { }

    @Override
    public void onHostDestroy() {
        if (adView != null) {
            Appodeal.destroy(Appodeal.BANNER);
        }
    }

    @Override
    public void onBannerLoaded(int height, boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putInt("height", height);
        params.putBoolean("isPrecache", isPrecache);
        mEventEmitter.receiveEvent(getId(), "onBannerLoaded", params);
        this.removeAllViews();
        Appodeal.show(mContext.getCurrentActivity(), Appodeal.BANNER_VIEW);
    }

    @Override
    public void onBannerFailedToLoad() {
        mEventEmitter.receiveEvent(getId(), "onBannerFailedToLoad", null);
    }

    @Override
    public void onBannerShowFailed() {
        mEventEmitter.receiveEvent(getId(), "onBannerShowFailed", null);
    }

    @Override
    public void onBannerShown() {
        mEventEmitter.receiveEvent(getId(), "onBannerShown", null);
    }

    @Override
    public void onBannerClicked() {
        mEventEmitter.receiveEvent(getId(), "onBannerClicked", null);
    }

    @Override
    public void onBannerExpired() { }
}
