package com.reactlibrary;

import com.appodeal.ads.Appodeal;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

public class RNAppodealBannerManager extends SimpleViewManager<RCTAppodealBannerView> {
    @ReactProp(name = "size")
    public void setSize(RCTAppodealBannerView view, String size) {
        view.setAdSize(size);
    }

    @Override
    protected RCTAppodealBannerView createViewInstance(ThemedReactContext reactContext) {
        return new RCTAppodealBannerView(reactContext);
    }

    @Override
    public @Nullable Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onBannerLoaded",
                MapBuilder.of("registrationName", "onBannerLoaded"),
                "onBannerFailedToLoad",
                MapBuilder.of("registrationName", "onBannerFailedToLoad"),
                "onBannerShowFailed",
                MapBuilder.of("registrationName", "onBannerShowFailed"),
                "onBannerShown",
                MapBuilder.of("registrationName", "onBannerShown"),
                "onBannerClicked",
                MapBuilder.of("registrationName", "onBannerClicked")
        );
    }

    @Override
    public String getName() {
        return "RNAppodealBannerView";
    }
}

