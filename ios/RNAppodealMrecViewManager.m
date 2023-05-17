//
//  RNAppodealMrecViewManager.m
//  RNAppodeal
//
//  Created by Stas Kochkin on 17.05.2023.
//

#import "RNAppodealMrecViewManager.h"
#import "RNAppodealBannerView.h"


@implementation RNAppodealMrecViewManager

@synthesize bridge;

RCT_EXPORT_MODULE();

- (UIView *)view {
    return [[RNAppodealMrecView alloc] initWithFrame:CGRectZero];
}

RCT_REMAP_VIEW_PROPERTY(placement, _bannerView.placement, NSString)

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdFailedToLoad, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdExpired, RCTBubblingEventBlock)

@end
