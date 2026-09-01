#import <React/RCTViewManager.h>
#import "RNAppodealNativeAdView.h"

@interface RNAppodealNativeAdViewManager : RCTViewManager
@end

@implementation RNAppodealNativeAdViewManager

RCT_EXPORT_MODULE(RNAppodealNativeAdView)

- (UIView *)view {
    return [[RNAppodealNativeAdView alloc] initWithFrame:CGRectZero];
}

RCT_EXPORT_VIEW_PROPERTY(adId, NSString)
RCT_EXPORT_VIEW_PROPERTY(placement, NSString)
RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdFailedToLoad, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdExpired, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdShown, RCTBubblingEventBlock)

@end
