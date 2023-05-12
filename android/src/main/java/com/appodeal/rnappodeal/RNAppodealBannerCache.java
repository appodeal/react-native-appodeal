package com.appodeal.rnappodeal;

import android.app.Activity;
import android.view.View;

import com.appodeal.ads.Appodeal;
import com.facebook.react.bridge.ReactContext;

import java.lang.ref.WeakReference;

public class RNAppodealBannerCache {
    private static RNAppodealBannerCache instance;

    private RNAppodealBannerCache() {}

    public static RNAppodealBannerCache getInstance() {
        if (instance == null) {
            instance = new RNAppodealBannerCache();
        }
        return instance;
    }

    private WeakReference<View> bannerWeakReference = new WeakReference<>(null);
    private WeakReference<View> mrecWeakReference = new WeakReference<>(null);

    View getAdView(RCTAppodealBannerView.BannerSize size, ReactContext context) {
        Activity activity = context.getCurrentActivity();
        if (activity == null) {
            return null;
        }

        View adView;
        if (size == RCTAppodealBannerView.BannerSize.MREC) {
            if (mrecWeakReference.get() == null) {
                adView = Appodeal.getMrecView(activity);
                mrecWeakReference = new WeakReference<>(adView);
            } else {
                adView = mrecWeakReference.get();
            }
        } else {
            if (bannerWeakReference.get() == null) {
                Appodeal.set728x90Banners(size == RCTAppodealBannerView.BannerSize.TABLET);
                adView = Appodeal.getBannerView(activity);
                bannerWeakReference = new WeakReference<>(adView);
            } else {
                adView = bannerWeakReference.get();
            }
        }
        return  adView;
    }
}
