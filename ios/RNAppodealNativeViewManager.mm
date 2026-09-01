#import "RNAppodealNativeViewManager.h"
#import "RNAppodealNativeView.h"

@implementation RNAppodealNativeViewManager

RCT_EXPORT_MODULE(RNAppodealNativeView);

- (UIView *)view {
    return [[RNAppodealNativeView alloc] initWithFrame:CGRectZero];
}

RCT_EXPORT_VIEW_PROPERTY(adId, NSString)
RCT_EXPORT_VIEW_PROPERTY(placement, NSString)
RCT_REMAP_VIEW_PROPERTY(adTemplate, templateName, NSString)

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdFailedToLoad, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdExpired, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdShown, RCTBubblingEventBlock)

@end
