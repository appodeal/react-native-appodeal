#import <Foundation/Foundation.h>

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#if __has_include("RCTBridge")
#import "RCTBridge"
#else
#import <React/RCTBridge.h>
#endif

#if __has_include("RCTEventDispatcher")
#import "RCTEventDispatcher"
#else
#import <React/RCTEventDispatcher.h>
#endif

#import <Appodeal/Appodeal.h>

@interface RNAppodeal : NSObject <RCTBridgeModule, AppodealBannerDelegate, AppodealInterstitialDelegate, AppodealRewardedVideoDelegate, AppodealNonSkippableVideoDelegate>

@end
