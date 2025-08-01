package com.appodeal.rnappodeal;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class RNAppodealBannerViewManager extends SimpleViewManager<RCTAppodealBannerView> {

    private final RNAppodealBannerViewManagerImpl bannerViewManagerImpl;

    public RNAppodealBannerViewManager() {
        this.bannerViewManagerImpl = new RNAppodealBannerViewManagerImpl();
    }

    @NonNull
    @Override
    public String getName() {
        return RNAppodealBannerViewManagerImpl.NAME;
    }

    @NonNull
    @Override
    protected RCTAppodealBannerView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return bannerViewManagerImpl.createViewInstance(reactContext);
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealBannerView view) {
        super.onDropViewInstance(view);
        bannerViewManagerImpl.onDropViewInstance(view);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedViewConstants() {
        return bannerViewManagerImpl.getExportedViewConstants();
    }

    @ReactProp(name = "adSize")
    public void setAdSize(RCTAppodealBannerView view, @Nullable String value) {
        if (value != null) {
            view.setAdSize(value);
        }
    }

    @ReactProp(name = "placement")
    public void setPlacement(RCTAppodealBannerView view, @Nullable String value) {
        if (value != null) {
            view.setPlacement(value);
        }
    }

    @ReactProp(name = "usesSmartSizing")
    public void setUsesSmartSizing(RCTAppodealBannerView view, boolean value) {
        // No-op for old arch
    }
} 