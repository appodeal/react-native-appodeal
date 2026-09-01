#import <React/RCTView.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Composable native ad root (AdMob-style).
 * Asset children are RNAppodealNativeAssetView instances.
 */
@interface RNAppodealNativeAdView : RCTView

@property (nonatomic, copy, nullable) NSString *adId;
@property (nonatomic, copy) NSString *placement;

@property (nonatomic, copy) RCTBubblingEventBlock onAdLoaded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdFailedToLoad;
@property (nonatomic, copy) RCTBubblingEventBlock onAdClicked;
@property (nonatomic, copy) RCTBubblingEventBlock onAdExpired;
@property (nonatomic, copy) RCTBubblingEventBlock onAdShown;

- (void)onAssetChanged;

@end

NS_ASSUME_NONNULL_END
