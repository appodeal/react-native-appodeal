package com.appodeal.rnappodeal;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class RNAppodealNativeAdViewManager extends ViewGroupManager<RCTAppodealNativeAdView> {

    private final RNAppodealNativeAdViewManagerImpl impl = new RNAppodealNativeAdViewManagerImpl();

    @NonNull
    @Override
    public String getName() {
        return RNAppodealNativeAdViewManagerImpl.NAME;
    }

    @NonNull
    @Override
    protected RCTAppodealNativeAdView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return impl.createViewInstance(reactContext);
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealNativeAdView view) {
        super.onDropViewInstance(view);
        impl.onDropViewInstance(view);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return impl.getExportedCustomDirectEventTypeConstants();
    }

    @ReactProp(name = "adId")
    public void setAdId(RCTAppodealNativeAdView view, @Nullable String value) {
        view.setAdId(value);
    }

    @ReactProp(name = "placement")
    public void setPlacement(RCTAppodealNativeAdView view, @Nullable String value) {
        if (value != null) {
            view.setPlacement(value);
        }
    }
}
