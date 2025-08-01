#import "RNAppodealMrecViewManager.h"
#import "RNAppodealBannerView.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTEventDispatcher.h>

@implementation RNAppodealMrecViewManager

RCT_EXPORT_MODULE(RNAppodealMrecView);

- (UIView *)view {
    RNAppodealMrecView *mrecView = [[RNAppodealMrecView alloc] initWithFrame:CGRectZero];
    return mrecView;
}

RCT_REMAP_VIEW_PROPERTY(placement, _bannerView.placement, NSString)

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdFailedToLoad, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdExpired, RCTBubblingEventBlock)

@end