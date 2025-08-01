#import "RNAppodealBannerViewManager.h"
#import "RNAppodealBannerView.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTEventDispatcher.h>

@implementation RNAppodealBannerViewManager

RCT_EXPORT_MODULE(RNAppodealBannerView);

- (UIView *)view {
    return [[RNAppodealBannerView alloc] initWithFrame:CGRectZero];
}

RCT_REMAP_VIEW_PROPERTY(placement, _bannerView.placement, NSString)
RCT_REMAP_VIEW_PROPERTY(usesSmartSizing, _bannerView.usesSmartSizing, BOOL)
RCT_REMAP_VIEW_PROPERTY(adSize, adSize, NSString)

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdFailedToLoad, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdExpired, RCTBubblingEventBlock)

@end