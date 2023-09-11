package com.appodeal.rnappodeal;

import android.app.Activity;
import android.content.res.Resources;
import android.os.Handler;
import android.os.Looper;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerView;
import com.appodeal.ads.MrecCallbacks;
import com.appodeal.ads.MrecView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;


public class RCTAppodealMrecView extends ReactViewGroup implements MrecCallbacks {
    private static final String defaultPlacement = "default";
    private static final Handler handler = new Handler(Looper.getMainLooper());

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

    public RCTAppodealMrecView(ThemedReactContext context) {
        super(context);
        cacheAdIfNeeded();
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
    }

    public void setPlacement(String placement) {
        this.placement = placement;
    }

    public String getPlacement() {
        return placement;
    }

    public void showBannerView(@NonNull MrecView bannerView) {
        showRunnable = () -> {
            Activity activity = getReactContext().getCurrentActivity();
            if (activity == null) return;

            Resources resources = getReactContext().getResources();
            DisplayMetrics dm = resources.getDisplayMetrics();
            int widthPixels = resources.getDisplayMetrics().widthPixels;
            int heightPixels = dp2px(250, dm);

            LayoutParams bannerLayoutParams = new BannerView.LayoutParams(widthPixels, heightPixels);
            bannerView.setLayoutParams(bannerLayoutParams);
            bannerView.setVisibility(VISIBLE);
            bannerView.setDescendantFocusability(ViewGroup.FOCUS_BLOCK_DESCENDANTS);

            removeAllViews();
            setVisibility(VISIBLE);
            addView(bannerView);

            bannerView.bringToFront();

            String showPlacement = placement == null ? defaultPlacement : placement;
            Appodeal.show(activity, Appodeal.MREC, showPlacement);
        };
        handler.postDelayed(showRunnable, 250L);
    }

    public void hideBannerView(@NonNull MrecView bannerView) {
        removeAllViews();
        ViewGroup parent = (ViewGroup) bannerView.getParent();
        if (parent != null) {
            parent.removeView(bannerView);
        }
        handler.removeCallbacks(showRunnable);
    }

    private void cacheAdIfNeeded() {
        if (!Appodeal.isAutoCacheEnabled(Appodeal.MREC)) {
            Activity activity = getReactContext().getCurrentActivity();
            if (activity != null) {
                Appodeal.cache(activity, Appodeal.MREC);
            }
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
    public void onMrecLoaded(boolean isPrecache) {
        WritableMap params = Arguments.createMap();
        params.putInt("height", 250);
        params.putBoolean("isPrecache", isPrecache);
        getEmitter().receiveEvent(getId(), "onMrecLoaded", params);
    }

    @Override
    public void onMrecFailedToLoad() {
        getEmitter().receiveEvent(getId(), "onMrecFailedToLoad", null);
    }

    @Override
    public void onMrecClicked() {
        getEmitter().receiveEvent(getId(), "onMrecClicked", null);
    }

    @Override
    public void onMrecExpired() {
        getEmitter().receiveEvent(getId(), "onMrecExpired", null);
    }

    @Override
    public void onMrecShowFailed() { }

    @Override
    public void onMrecShown() { }
}