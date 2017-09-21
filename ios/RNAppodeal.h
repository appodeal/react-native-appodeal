#import <Foundation/Foundation.h>

#if __has_include(<React/RCTEventDispatcher.h>)
    #import <React/RCTComponent.h>
#else
    #import "RCTComponent.h"
#endif

#if __has_include(<React/RCTEventDispatcher.h>)
    #import <React/RCTEventDispatcher.h>
#else
    #import "RCTEventDispatcher.h"
#endif

#if __has_include(<React/RCTEventEmitter.h>)
    #import <React/RCTEventEmitter.h>
#else
    #import "RCTEventEmitter"
#endif

#if __has_include(<React/RCTBridgeModule.h>)
    #import <React/RCTBridgeModule.h>
    #import <React/UIView+React.h>
    #import <React/RCTLog.h>
#else
    #import "RCTBridgeModule.h"
    #import "UIView+React.h"
    #import "RCTLog.h"
#endif

#import <Appodeal/Appodeal.h>

@interface RNAppodeal : NSObject <RCTBridgeModule, AppodealBannerDelegate, AppodealInterstitialDelegate, AppodealRewardedVideoDelegate, AppodealNonSkippableVideoDelegate>

@end
