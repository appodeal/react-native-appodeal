#import <Foundation/Foundation.h>
#import <Appodeal/Appodeal.h>

/**
 * The primary bridge between JS <-> native code for the Appodeal React Native module.
 * Supports both old architecture (RCTBridgeModule) and new architecture (Turbo Modules).
 */
#ifdef RCT_NEW_ARCH_ENABLED
#import <RNAppodealSpec/RNAppodealSpec.h>
@interface RNAppodeal : NSObject<NativeAppodealModuleSpec, AppodealBannerDelegate, AppodealInterstitialDelegate, AppodealRewardedVideoDelegate, AppodealInitializationDelegate, AppodealAdRevenueDelegate>
#else
#import <React/RCTBridgeModule.h>
@interface RNAppodeal : NSObject<RCTBridgeModule, AppodealBannerDelegate, AppodealInterstitialDelegate, AppodealRewardedVideoDelegate, AppodealInitializationDelegate, AppodealAdRevenueDelegate>
#endif

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, strong, readonly, class) RNAppodeal *shared;

@end

NS_ASSUME_NONNULL_END
