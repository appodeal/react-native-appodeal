package com.appodeal.rnappodeal;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNAppodealNativeAssetViewManager extends SimpleViewManager<RCTAppodealNativeAssetView> {

    private final RNAppodealNativeAssetViewManagerImpl impl = new RNAppodealNativeAssetViewManagerImpl();

    @NonNull
    @Override
    public String getName() {
        return RNAppodealNativeAssetViewManagerImpl.NAME;
    }

    @NonNull
    @Override
    protected RCTAppodealNativeAssetView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return impl.createViewInstance(reactContext);
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealNativeAssetView view) {
        super.onDropViewInstance(view);
        impl.onDropViewInstance(view);
    }

    @ReactProp(name = "asset")
    public void setAsset(RCTAppodealNativeAssetView view, @Nullable String value) {
        if (value != null) {
            view.setAssetType(value);
        }
    }
}
