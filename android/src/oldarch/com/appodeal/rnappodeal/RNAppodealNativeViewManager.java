package com.appodeal.rnappodeal;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class RNAppodealNativeViewManager extends SimpleViewManager<RCTAppodealNativeView> {

    private final RNAppodealNativeViewManagerImpl nativeViewManagerImpl;

    public RNAppodealNativeViewManager() {
        this.nativeViewManagerImpl = new RNAppodealNativeViewManagerImpl();
    }

    @NonNull
    @Override
    public String getName() {
        return RNAppodealNativeViewManagerImpl.NAME;
    }

    @NonNull
    @Override
    protected RCTAppodealNativeView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return nativeViewManagerImpl.createViewInstance(reactContext);
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealNativeView view) {
        super.onDropViewInstance(view);
        nativeViewManagerImpl.onDropViewInstance(view);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return nativeViewManagerImpl.getExportedCustomDirectEventTypeConstants();
    }

    @ReactProp(name = "adId")
    public void setAdId(RCTAppodealNativeView view, @Nullable String value) {
        view.setAdId(value);
    }

    @ReactProp(name = "placement")
    public void setPlacement(RCTAppodealNativeView view, @Nullable String value) {
        if (value != null) {
            view.setPlacement(value);
        }
    }

    @ReactProp(name = "adTemplate")
    public void setAdTemplate(RCTAppodealNativeView view, @Nullable String value) {
        if (value != null) {
            view.setAdTemplate(value);
        }
    }
}
