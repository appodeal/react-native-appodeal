package com.appodeal.rnappodeal;

import android.view.View;
import android.widget.TextView;

import com.appodeal.ads.nativead.NativeAdView;
import com.appodeal.ads.nativead.NativeIconView;
import com.appodeal.ads.nativead.NativeMediaView;

/**
 * Binds custom native-ad assets onto {@link NativeAdView}.
 *
 * <p>Appodeal's {@code NativeAdView} keeps JavaBean setters for Java callers, but the Kotlin
 * metadata is obfuscated — so a Kotlin subclass cannot resolve {@code setMediaView} /
 * {@code mediaView = ...}. Call the setters from Java instead.
 */
public final class NativeAdViewAssetBinder {
  private NativeAdViewAssetBinder() {}

  public static void bind(
      NativeAdView view,
      NativeMediaView media,
      NativeIconView icon,
      View title,
      View description,
      View callToAction,
      TextView attribution) {
    if (media != null) {
      view.setMediaView(media);
    }
    if (icon != null) {
      view.setIconView(icon);
    }
    if (title != null) {
      view.setTitleView(title);
    }
    if (description != null) {
      view.setDescriptionView(description);
    }
    if (callToAction != null) {
      view.setCallToActionView(callToAction);
    }
    if (attribution != null) {
      view.setAdAttributionView(attribution);
    }
  }
}
