package com.appodeal;

import com.appodeal.ads.Appodeal;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;


public class RNAppodealBannerManager extends SimpleViewManager<RCTAppodealBannerView> {
    @ReactProp(name = "adSize")
    public void setSize(RCTAppodealBannerView view, String size) { view.setAdSize(size); }

    @Override
    public RCTAppodealBannerView createViewInstance(ThemedReactContext context) {
        RCTAppodealBannerView banner = new RCTAppodealBannerView(context);
        Appodeal.setBannerCallbacks(banner);
        Appodeal.setMrecCallbacks(banner);
        return banner;
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealBannerView view) {
        super.onDropViewInstance(view);
        view.hide();
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onBannerLoaded",
                MapBuilder.of("registrationName", "onAdLoaded"),
                "onBannerFailedToLoad",
                MapBuilder.of("registrationName", "onAdFailedToLoad"),
                "onBannerClicked",
                MapBuilder.of("registrationName", "onAdClicked"),
                "onBannerExpired",
                MapBuilder.of("registrationName", "onAdExpired")
        );
    }

    @Override
    public String getName() {
        return "RNAppodealBannerView";
    }
}

