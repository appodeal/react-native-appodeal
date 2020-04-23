package com.reactlibrary;
;
import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerView;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;


public class RCTAppodealBannerView extends ReactViewGroup implements LifecycleEventListener {
    private BannerView adView;
    private ThemedReactContext mContext;
    private RCTEventEmitter mEventEmitter;

    public RCTAppodealBannerView(ThemedReactContext context) {
        super(context);
        mContext = context;
        mContext.addLifecycleEventListener(this);
        mEventEmitter = mContext.getJSModule(RCTEventEmitter.class);
    }

    public void setAdSize(String adSize) {

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
}
