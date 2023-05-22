package com.appodeal.rnappodeal;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.os.Handler;
import android.os.Looper;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerCallbacks;
import com.appodeal.ads.BannerView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;

public class RCTAppodealBannerView extends ReactViewGroup implements BannerCallbacks {

    enum BannerSize {PHONE, TABLET}

    private static final String defaultPlacement = "default";
    private static final Handler handler = new Handler(Looper.getMainLooper());

    private BannerSize size = BannerSize.PHONE;
    private String placement = defaultPlacement;

    @Nullable
    private Runnable showRunnable = null;

    private final Runnable measureAndLayout = () -> {
        for (int i = 0; i < getChildCount(); i++) {
            View child = getChildAt(i);
            child.measure(
                    MeasureSpec.makeMeasureSpec(getMeasuredWidth(), MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(getMeasuredHeight(), MeasureSpec.EXACTLY)
            );
            child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight());
        }
    };

    public RCTAppodealBannerView(Context context) {
        super(context);
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
    }

    public void setAdSize(String adSize) {
        if (adSize.equals("tablet")) {
            this.size = BannerSize.TABLET;
        } else {
            this.size = BannerSize.PHONE;
        }
        cacheAdIfNeeded();
    }

    public BannerSize getSize() {
        return this.size;
    }

    public void setPlacement(String placement) {
        this.placement = placement;
    }

    public String getPlacement() {
        return placement;
    }

    public void showBannerView(@NonNull BannerView bannerView) {
        showRunnable = () -> {
            Activity activity = getReactContext().getCurrentActivity();
            if (activity == null) return;

            Appodeal.set728x90Banners(size == RCTAppodealBannerView.BannerSize.TABLET);

            int height = getEstimatedHeight();
            Resources resources = getReactContext().getResources();
            DisplayMetrics dm = resources.getDisplayMetrics();
            int widthPixels = resources.getDisplayMetrics().widthPixels;
            int heightPixels = dp2px(height, dm);

            LayoutParams bannerLayoutParams = new BannerView.LayoutParams(widthPixels, heightPixels);
            bannerView.setLayoutParams(bannerLayoutParams);
            bannerView.setVisibility(VISIBLE);

            removeAllViews();
            setVisibility(VISIBLE);
            addView(bannerView);

            bannerView.bringToFront();

            String showPlacement = placement == null ? defaultPlacement : placement;
            Appodeal.show(activity, Appodeal.BANNER_VIEW, showPlacement);
        };
        handler.postDelayed(showRunnable, 250L);
    }

    public void hideBannerView(@NonNull BannerView bannerView) {
        removeAllViews();
        ViewGroup parent = (ViewGroup) bannerView.getParent();
        if (parent != null) {
            parent.removeView(bannerView);
        }
        handler.removeCallbacks(showRunnable);
    }

    private void cacheAdIfNeeded() {
        if (!Appodeal.isAutoCacheEnabled(Appodeal.BANNER_VIEW)) {
            Activity activity = getReactContext().getCurrentActivity();
            if (activity != null) {
                Appodeal.cache(activity, Appodeal.BANNER_VIEW);
            }
        }
    }

    private int getEstimatedHeight() {
        if (size == BannerSize.TABLET) {
            return 90;
        }
        return 50;
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
}