package com.reactlibrary;

;
import android.content.res.Resources;
import android.graphics.Color;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

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
        if (adView == null) {
            Resources r = mContext.getResources();
            DisplayMetrics dm = r.getDisplayMetrics();
            int pxW = r.getDisplayMetrics().widthPixels;
            int pxH = dp2px(50, dm);
            adView = Appodeal.getBannerView(mContext.getCurrentActivity());
            adView.measure(pxW, pxH);
            adView.layout(0, 0, pxW, pxH);

            removeAllViews();
            addView(adView);

            Appodeal.setBannerCallbacks(this);
            Appodeal.show(mContext.getCurrentActivity(), Appodeal.BANNER_VIEW);
            if (!Appodeal.isAutoCacheEnabled(Appodeal.BANNER_VIEW)) {
                Log.e("banner", "cache");
                Appodeal.cache(mContext.getCurrentActivity(), Appodeal.BANNER_VIEW);
            }
        }
    }

    private int dp2px(int dp, DisplayMetrics dm) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, dm));
    }

    @Override
    public void onHostResume() { }

    @Override
    public void onHostPause() { }

    @Override
    public void onHostDestroy() {
        if (adView != null) {
            Appodeal.destroy(Appodeal.BANNER_VIEW);
            removeAllViews();
            adView = null;
        }
    }

    @Override
    public void onBannerLoaded(int height, boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putInt("height", height);
        params.putBoolean("isPrecache", isPrecache);
        mEventEmitter.receiveEvent(getId(), "onBannerLoaded", params);
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
