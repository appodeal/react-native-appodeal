package com.appodeal.rnappodeal;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerCallbacks;
import com.appodeal.ads.BannerView;
import com.appodeal.ads.MrecCallbacks;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;

import java.lang.ref.WeakReference;
import java.text.MessageFormat;


public class RCTAppodealBannerView extends ReactViewGroup implements BannerCallbacks, MrecCallbacks {
    enum BannerSize {
        PHONE,
        TABLET,
        MREC
    }

    private BannerSize size = BannerSize.PHONE;
    private String placement = "default";

    private FrameLayout container;

    private final Runnable measureAndLayout = new Runnable() {
        @Override
        public void run() {
            for (int i = 0; i < getChildCount(); i++) {
                View child = getChildAt(i);
                child.measure(
                        MeasureSpec.makeMeasureSpec(getMeasuredWidth(), MeasureSpec.EXACTLY),
                        MeasureSpec.makeMeasureSpec(getMeasuredHeight(), MeasureSpec.EXACTLY)
                );
                child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight());
            }
        }
    };

    public RCTAppodealBannerView(ThemedReactContext context) {
        super(context);
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
    }

    public BannerSize getSize() {
        return this.size;
    }

    public void setAdSize(String adSize) {
        if (adSize.equals("tablet")) {
            this.size = BannerSize.TABLET;
        } else if (adSize.equals("mrec")) {
            this.size = BannerSize.MREC;
        } else {
            this.size = BannerSize.PHONE;
        }

        cacheAdIfNeeded();
        addContainerIfNeeded();
    }

    public void setPlacement(String placement) {
        this.placement = placement;
    }

    public void hideBannerView() {
        Activity activity = getReactContext().getCurrentActivity();
        if (container != null && activity != null) {
            container.removeAllViews();
            Appodeal.hide(activity, getAdType());
        }
    }

    public void showBannerView() {
        postDelayed(() -> {
            Activity activity = getReactContext().getCurrentActivity();
            View adView;

            if (activity == null || container == null) {
                return;
            }

            if (size == RCTAppodealBannerView.BannerSize.MREC) {
                adView = Appodeal.getMrecView(activity);
            } else {
                Appodeal.set728x90Banners(size == RCTAppodealBannerView.BannerSize.TABLET);
                adView = Appodeal.getBannerView(activity);
            }

            int adType = getAdType();
            int height = getEstimatedHeight();

            Resources r = getReactContext().getResources();
            DisplayMetrics dm = r.getDisplayMetrics();

            int pxW = r.getDisplayMetrics().widthPixels;
            int pxH = dp2px(height, dm);

            LayoutParams bannerLayoutParams = new BannerView.LayoutParams(pxW, pxH);

            adView.setLayoutParams(bannerLayoutParams);
            adView.setVisibility(VISIBLE);

            container.addView(adView);

            if (placement != null) {
                Appodeal.show(activity, adType, placement);
            } else {
                Appodeal.show(activity, adType);
            }
        }, 250L);
    }

    private void cacheAdIfNeeded() {
        int adType = getAdType();
        if (!Appodeal.isAutoCacheEnabled(adType)) {
            Activity activity = getReactContext().getCurrentActivity();
            if (activity != null) {
                Appodeal.cache(activity, adType);
            }
        }
    }

    private void addContainerIfNeeded() {
        if (container == null) {
            container = new FrameLayout(getReactContext());
            addView(container);
        }
    }

    private int getAdType() {
        if (size == BannerSize.MREC) {
            return Appodeal.MREC;
        } else {
            return Appodeal.BANNER_VIEW;
        }
    }

    private int getEstimatedHeight() {
        switch (size) {
            case MREC:
                return 250;
            case TABLET:
                return 90;
            default:
                return 50;
        }
    }

    private ReactContext getReactContext() {
        return (ReactContext) getContext();
    }

    private RCTEventEmitter getEmitter() {
        return getReactContext().getJSModule(RCTEventEmitter.class);
    }

    private int dp2px(int dp, DisplayMetrics dm) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, dm));
    }

    @Override
    public void onBannerLoaded(int height, boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putInt("height", height);
        params.putBoolean("isPrecache", isPrecache);
        getEmitter().receiveEvent(getId(), "onBannerLoaded", params);
    }

    @Override
    public void onBannerFailedToLoad() {
        getEmitter().receiveEvent(getId(), "onBannerFailedToLoad", null);
    }

    @Override
    public void onBannerClicked() {
        getEmitter().receiveEvent(getId(), "onBannerClicked", null);
    }

    @Override
    public void onBannerExpired() {
        getEmitter().receiveEvent(getId(), "onBannerExpired", null);
    }

    @Override
    public void onBannerShowFailed() {
    }

    @Override
    public void onBannerShown() {
    }

    @Override
    public void onMrecLoaded(boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putInt("height", 250);
        params.putBoolean("isPrecache", isPrecache);
        getEmitter().receiveEvent(getId(), "onBannerLoaded", params);
    }

    @Override
    public void onMrecFailedToLoad() {
        getEmitter().receiveEvent(getId(), "onBannerFailedToLoad", null);
    }

    @Override
    public void onMrecClicked() {
        getEmitter().receiveEvent(getId(), "onBannerClicked", null);
    }

    @Override
    public void onMrecExpired() {
        getEmitter().receiveEvent(getId(), "onBannerExpired", null);
    }

    @Override
    public void onMrecShowFailed() {
    }

    @Override
    public void onMrecShown() {
    }
}