package com.appodeal.rnappodeal;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerView;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

public class RNAppodealBannerManager extends SimpleViewManager<RCTAppodealBannerView> {

    @NonNull
    private final List<WeakReference<RCTAppodealBannerView>> instances = new ArrayList<>();
    @NonNull
    private WeakReference<BannerView> apdBannerView = new WeakReference<>(null);

    @ReactProp(name = "adSize")
    public void setSize(RCTAppodealBannerView view, String size) {
        view.setAdSize(size);
    }

    @ReactProp(name = "placement")
    public void setPlacement(RCTAppodealBannerView view, String placement) {
        view.setPlacement(placement);
    }

    @NonNull
    @Override
    public RCTAppodealBannerView createViewInstance(@NonNull ThemedReactContext context) {
        RCTAppodealBannerView banner = new RCTAppodealBannerView(context);
        // Setup callbacks
        Appodeal.setBannerCallbacks(banner);
        // Hide previously created banners
        // Iterate through instances in forward direction
        BannerView apdBannerView = getApdBannerView(context);
        for (WeakReference<RCTAppodealBannerView> reference : instances) {
            RCTAppodealBannerView previousBanner = reference.get();
            if (previousBanner != null) {
                previousBanner.hideBannerView(apdBannerView);
            }
        }
        // Save instance
        banner.showBannerView(apdBannerView);
        instances.add(new WeakReference<>(banner));
        return banner;
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealBannerView view) {
        super.onDropViewInstance(view);
        BannerView apdBannerView = getApdBannerView(view.getContext());
        view.hideBannerView(apdBannerView);

        // Trying to show a previous banner
        // Iterate through instances in reverse direction
        ListIterator<WeakReference<RCTAppodealBannerView>> iterator = instances.listIterator(instances.size());
        while (iterator.hasPrevious()) {
            WeakReference<RCTAppodealBannerView> reference = iterator.previous();
            RCTAppodealBannerView previousBanner = reference.get();
            if (previousBanner == null) {
                continue;
            }
            if (previousBanner == view) {
                iterator.remove();
            } else if (previousBanner.getSize() == view.getSize()) {
                previousBanner.showBannerView(apdBannerView);
                break;
            }
        }
    }

    @NonNull
    public BannerView getApdBannerView(@NonNull Context context) {
        BannerView bannerView = apdBannerView.get();
        if (bannerView == null) {
            bannerView = Appodeal.getBannerView(context.getApplicationContext());
            apdBannerView = new WeakReference<>(bannerView);
        }
        return bannerView;
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

    @NonNull
    @Override
    public String getName() {
        return "RNAppodealBannerView";
    }
}
