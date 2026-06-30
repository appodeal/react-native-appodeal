#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTView.h>
#import <Appodeal/Appodeal.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Banner view component for Appodeal ads
 * Supports both banner and MREC ad formats
 */

@interface RNAppodealBannerView : RCTView

@property (nonatomic, copy) NSString *adSize;
@property (nonatomic, copy) NSString *placement;
@property (nonatomic, assign) BOOL usesSmartSizing;

@property (nonatomic, copy) RCTBubblingEventBlock onAdLoaded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdFailedToLoad;
@property (nonatomic, copy) RCTBubblingEventBlock onAdClicked;
@property (nonatomic, copy) RCTBubblingEventBlock onAdExpired;

@property (nonatomic, strong, readonly) APDBannerView *bannerView;

- (void)setAdSize:(NSString *)adSize;

@end


@interface RNAppodealMrecView : RNAppodealBannerView

/**
 * Readiness of the plugin's own MREC view instance.
 *
 * On iOS, MREC exists only as a standalone `APDMRECView` and is not represented in
 * the central SDK manager, so `[Appodeal isReadyForShowWithStyle:]` / `[Appodeal canShow:]`
 * always report `false` for MREC. These query the most recently created MREC view
 * (the instance actually shown) instead, so `Appodeal.isLoaded(MREC)` /
 * `Appodeal.canShow(MREC)` return correct values. See APDM-2627.
 */
+ (BOOL)isActiveMrecReady;
+ (BOOL)canShowActiveMrecForPlacement:(nullable NSString *)placement;

@end

NS_ASSUME_NONNULL_END
