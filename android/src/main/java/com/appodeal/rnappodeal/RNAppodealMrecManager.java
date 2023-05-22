package com.appodeal.rnappodeal;

import android.content.Context;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.BannerView;
import com.appodeal.ads.MrecView;
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
    @NonNull
    private final List<WeakReference<RCTAppodealMrecView>> instances = new ArrayList<>();

    @NonNull
    private WeakReference<MrecView> apdMrecView = new WeakReference<>(null);

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
        MrecView apdMrecView = getApdMrecView(context);
        for (WeakReference<RCTAppodealMrecView> reference : instances) {
            RCTAppodealMrecView previousBanner = reference.get();
            if (previousBanner != null) {
                previousBanner.hideBannerView(apdMrecView);
            }
        }
        // Save instance
        banner.showBannerView(apdMrecView);
        instances.add(new WeakReference<>(banner));
        return banner;
    }

    @Override
    public void onDropViewInstance(@NonNull RCTAppodealMrecView view) {
        super.onDropViewInstance(view);
        MrecView apdMrecView = getApdMrecView(view.getContext());
        view.hideBannerView(apdMrecView);

        // Trying to show a previous banner
        // Iterate through instances in reverse direction
        ListIterator<WeakReference<RCTAppodealMrecView>> iterator = instances.listIterator(instances.size());
        while (iterator.hasPrevious()) {
            WeakReference<RCTAppodealMrecView> reference = iterator.previous();
            RCTAppodealMrecView previousBanner = reference.get();
            if (previousBanner == null) {
                continue;
            }
            if (previousBanner == view) {
                iterator.remove();
            } else {
                previousBanner.showBannerView(apdMrecView);
                break;
            }
        }
    }

    @NonNull
    public MrecView getApdMrecView(@NonNull Context context) {
        MrecView mrecView = apdMrecView.get();
        if (mrecView == null) {
            mrecView = Appodeal.getMrecView(context.getApplicationContext());
            apdMrecView = new WeakReference<>(mrecView);
        }
        return mrecView;
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