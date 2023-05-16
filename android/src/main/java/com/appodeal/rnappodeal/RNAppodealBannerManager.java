package com.appodeal.rnappodeal;

import android.graphics.Color;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.appodeal.ads.Appodeal;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;


public class RNAppodealBannerManager extends SimpleViewManager<RCTAppodealBannerView> {
    private List<WeakReference<RCTAppodealBannerView>> instances = new ArrayList<>();

    @ReactProp(name = "adSize")
    public void setSize(RCTAppodealBannerView view, String size) { view.setAdSize(size); }

    @ReactProp(name = "placement")
    public void setPlacement(RCTAppodealBannerView view, String placement) { view.setPlacement(placement); }

    @Override
    public RCTAppodealBannerView createViewInstance(ThemedReactContext context) {
        RCTAppodealBannerView banner = new RCTAppodealBannerView(context);
        // Setup callbacks
        Appodeal.setBannerCallbacks(banner);
        Appodeal.setMrecCallbacks(banner);
        // Hide previously created banners
        // TODO: Split MRECs and Banners
        Iterator<WeakReference<RCTAppodealBannerView>> iterator = this.instances.iterator();
        while (iterator.hasNext()) {
            WeakReference<RCTAppodealBannerView> reference = iterator.next();
            RCTAppodealBannerView mBanner = reference.get();
            if (mBanner != null) {
                mBanner.hideBannerView();
            }
        }
        // Save instance
        banner.showBannerView();
        this.instances.add(new WeakReference<>(banner));

        return banner;
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealBannerView view) {
        super.onDropViewInstance(view);
        view.hideBannerView();

        Iterator<WeakReference<RCTAppodealBannerView>> iterator = this.instances.iterator();
        while (iterator.hasNext()) {
            WeakReference<RCTAppodealBannerView> reference = iterator.next();
            RCTAppodealBannerView banner = reference.get();
            if (banner == null) {
                continue;
            }

            if (banner == view) {
                iterator.remove();
            } else if (banner.getSize() == view.getSize()) {
                banner.showBannerView();
            }
        }
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
