package com.appodeal.rnappodeal;

import com.appodeal.ads.Appodeal;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;


public class RNAppodealMrecManager extends SimpleViewManager<RCTAppodealMrecView> {
    private final List<WeakReference<RCTAppodealMrecView>> instances = new ArrayList<>();

    @ReactProp(name = "placement")
    public void setPlacement(RCTAppodealMrecView view, String placement) { view.setPlacement(placement); }

    @NonNull
    @Override
    public RCTAppodealMrecView createViewInstance(@NonNull ThemedReactContext context) {
        RCTAppodealMrecView banner = new RCTAppodealMrecView(context);
        // Setup callbacks
        Appodeal.setMrecCallbacks(banner);
        // Hide previously created banners
        // Iterate through instances in forward direction
        Iterator<WeakReference<RCTAppodealMrecView>> iterator = this.instances.iterator();
        while (iterator.hasNext()) {
            WeakReference<RCTAppodealMrecView> reference = iterator.next();
            RCTAppodealMrecView mBanner = reference.get();
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
    public void onDropViewInstance(@NonNull RCTAppodealMrecView view) {
        super.onDropViewInstance(view);
        view.hideBannerView();

        // Trying to show a previous banner
        // Iterate through instances in reverse direction
        ListIterator<WeakReference<RCTAppodealMrecView>> iterator = instances.listIterator(instances.size());
        while (iterator.hasPrevious()) {
            WeakReference<RCTAppodealMrecView> reference = iterator.previous();
            RCTAppodealMrecView banner = reference.get();
            if (banner == null) {
                continue;
            }

            if (banner == view) {
                iterator.remove();
            } else {
                banner.showBannerView();
                break;
            }
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onMrecLoaded",
                MapBuilder.of("registrationName", "onAdLoaded"),
                "onMrecFailedToLoad",
                MapBuilder.of("registrationName", "onAdFailedToLoad"),
                "onMrecClicked",
                MapBuilder.of("registrationName", "onAdClicked"),
                "onMrecExpired",
                MapBuilder.of("registrationName", "onAdExpired")
        );
    }

    @Override
    public String getName() {
        return "RNAppodealMrecView";
    }
}