package com.appodeal.rnappodeal;

import android.app.Activity;
import android.content.res.Resources;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.View;
import android.widget.FrameLayout;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerView;
import com.appodeal.ads.MrecCallbacks;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;


public class RCTAppodealMrecView extends ReactViewGroup implements MrecCallbacks {
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

    public RCTAppodealMrecView(ThemedReactContext context) {
        super(context);
        cacheAdIfNeeded();
        addContainerIfNeeded();
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
    }

    public void setPlacement(String placement) {
        this.placement = placement;
    }

    public void hideBannerView() {
        Activity activity = getReactContext().getCurrentActivity();
        if (container != null && activity != null) {
            container.removeAllViews();
            Appodeal.hide(activity, Appodeal.MREC);
        }
    }

    public void showBannerView() {
        postDelayed(() -> {
            Activity activity = getReactContext().getCurrentActivity();
            View adView;

            if (activity == null || container == null) {
                return;
            }

            adView = Appodeal.getMrecView(activity);


            Resources r = getReactContext().getResources();
            DisplayMetrics dm = r.getDisplayMetrics();

            int pxW = r.getDisplayMetrics().widthPixels;
            int pxH = dp2px(250, dm);

            LayoutParams bannerLayoutParams = new BannerView.LayoutParams(pxW, pxH);

            adView.setLayoutParams(bannerLayoutParams);
            adView.setVisibility(VISIBLE);

            container.addView(adView);

            if (placement != null) {
                Appodeal.show(activity, Appodeal.MREC, placement);
            } else {
                Appodeal.show(activity, Appodeal.MREC);
            }
        }, 250L);
    }

    private void cacheAdIfNeeded() {
        if (!Appodeal.isAutoCacheEnabled(Appodeal.MREC)) {
            Activity activity = getReactContext().getCurrentActivity();
            if (activity != null) {
                Appodeal.cache(activity, Appodeal.MREC);
            }
        }
    }

    private void addContainerIfNeeded() {
        if (container == null) {
            container = new FrameLayout(getReactContext());
            addView(container);
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