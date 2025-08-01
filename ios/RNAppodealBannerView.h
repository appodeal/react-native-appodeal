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

@end

NS_ASSUME_NONNULL_END
