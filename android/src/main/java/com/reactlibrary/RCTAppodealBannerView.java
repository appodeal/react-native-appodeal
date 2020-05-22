package com.reactlibrary;

;
import android.content.res.Resources;
import android.opengl.Visibility;
import android.os.Build;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.PopupWindow;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerCallbacks;
import com.appodeal.ads.BannerView;
import com.appodeal.ads.MrecCallbacks;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.view.ReactViewGroup;

import java.lang.reflect.Method;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.viewpager.widget.ViewPager;


public class RCTAppodealBannerView extends ReactViewGroup implements LifecycleEventListener, BannerCallbacks, MrecCallbacks {
    private enum BannerSize {
        PHONE,
        TABLET,
        MREC
    }

    private View adView;
    private BannerSize size;
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
        context.addLifecycleEventListener(this);
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
    }

    public void setAdSize(String adSize) {
        int adType;
        if (adSize.equals("tablet")) {
            size = BannerSize.TABLET;
            adType = Appodeal.BANNER_VIEW;
        } else if (adSize.equals("mrec")) {
            size = BannerSize.MREC;
            adType = Appodeal.MREC;
        } else {
            size = BannerSize.PHONE;
            adType = Appodeal.BANNER_VIEW;
        }

        if (!Appodeal.isAutoCacheEnabled(adType)) {
            Appodeal.cache(getReactContext().getCurrentActivity(), adType);
        }
    }

    public void hide() {
        if (adView != null) {
            removeView(adView);
            adView = null;
        }
    }

    private void showBannerView() {
        Resources r = getReactContext().getResources();
        DisplayMetrics dm = r.getDisplayMetrics();

        int height;
        View adView;
        int adType;

        switch (size) {
            case MREC:
                adType = Appodeal.MREC;
                height = 250;
                adView = Appodeal.getMrecView(getReactContext().getCurrentActivity());
                break;
            case TABLET:
                adType = Appodeal.BANNER_VIEW;
                height = 90;
                Appodeal.set728x90Banners(true);
                adView = Appodeal.getBannerView(getReactContext().getCurrentActivity());
                break;
            default:
                adType = Appodeal.BANNER_VIEW;
                height = 50;
                Appodeal.set728x90Banners(false);
                adView = Appodeal.getBannerView(getReactContext().getCurrentActivity());
                break;
        }

        int pxW = r.getDisplayMetrics().widthPixels;
        int pxH = dp2px(height, dm);

        adView.setVisibility(VISIBLE);
        adView.setLayoutParams(new BannerView.LayoutParams(pxW, pxH));
        addView(adView);

        Appodeal.show(getReactContext().getCurrentActivity(), adType);
    }

    private ReactContext getReactContext() {
        return (ReactContext)getContext();
    }

    private RCTEventEmitter getEmitter() {
        return  getReactContext().getJSModule(RCTEventEmitter.class);
    }

    private int dp2px(int dp, DisplayMetrics dm) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, dm));
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        if (adView != null) { return; }
        showBannerView();
    }

    @Override
    public void onHostResume() { }

    @Override
    public void onHostPause() { }

    @Override
    public void onHostDestroy() {
        hide();
        Appodeal.destroy(Appodeal.BANNER_VIEW);
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
    public void onBannerShowFailed() { }

    @Override
    public void onBannerShown() { }

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
    public void onMrecShowFailed() { }

    @Override
    public void onMrecShown() { }
}
