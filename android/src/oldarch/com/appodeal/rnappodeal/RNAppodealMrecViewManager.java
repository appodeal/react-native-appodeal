package com.appodeal.rnappodeal;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class RNAppodealMrecViewManager extends SimpleViewManager<RCTAppodealMrecView> {

    private final RNAppodealMrecViewManagerImpl mrecViewManagerImpl;

    public RNAppodealMrecViewManager() {
        this.mrecViewManagerImpl = new RNAppodealMrecViewManagerImpl();
    }

    @NonNull
    @Override
    public String getName() {
        return RNAppodealMrecViewManagerImpl.NAME;
    }

    @NonNull
    @Override
    protected RCTAppodealMrecView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return mrecViewManagerImpl.createViewInstance(reactContext);
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealMrecView view) {
        super.onDropViewInstance(view);
        mrecViewManagerImpl.onDropViewInstance(view);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedViewConstants() {
        return mrecViewManagerImpl.getExportedViewConstants();
    }

    @ReactProp(name = "placement")
    public void setPlacement(RCTAppodealMrecView view, @Nullable String value) {
        if (value != null) {
            view.setPlacement(value);
        }
    }
} 