#import <React/RCTViewManager.h>
#import "RNAppodealNativeAssetView.h"

@interface RNAppodealNativeAssetViewManager : RCTViewManager
@end

@implementation RNAppodealNativeAssetViewManager

RCT_EXPORT_MODULE(RNAppodealNativeAssetView)

- (UIView *)view {
    return [[RNAppodealNativeAssetView alloc] initWithFrame:CGRectZero];
}

RCT_EXPORT_VIEW_PROPERTY(asset, NSString)

@end
