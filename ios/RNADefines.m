//
//  RNADefines.m
//  RNAppodeal
//
//  Created by Stas Kochkin on 26/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNADefines.h"
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>

#pragma mark - Constants

NSString *const kEventAppodealInitialized       = @"onAppodeallInitialized";
NSString *const kEventAppodealDidReceiveRevenue = @"onAppodealDidReceiveRevenue";

NSString *const kEventBannerLoaded          = @"onBannerLoaded";
NSString *const kEventBannerFailedToLoad    = @"onBannerFailedToLoad";
NSString *const kEventBannerExpired         = @"onBannerExpired";
NSString *const kEventBannerShown           = @"onBannerShown";
NSString *const kEventBannerClicked         = @"onBannerClicked";

NSString *const kEventInterstitialLoaded            = @"onInterstitialLoaded";
NSString *const kEventInterstitialFailedToLoad      = @"onInterstitialFailedToLoad";
NSString *const kEventInterstitialFailedToPresent   = @"onInterstitialFaliedToShow";
NSString *const kEventInterstitialExpired           = @"onInterstitialExpired";
NSString *const kEventInterstitialShown             = @"onInterstitialShown";
NSString *const kEventInterstitialClosed            = @"onInterstitialClosed";
NSString *const kEventInterstitialClicked           = @"onInterstitialClicked";

NSString *const kEventRewardedVideoLoaded           = @"onRewardedVideoLoaded";
NSString *const kEventRewardedVideoFailedToLoad     = @"onRewardedVideoFailedToLoad";
NSString *const kEventRewardedVideoFailedToPresent  = @"onRewardedVideoFailedToShow";
NSString *const kEventRewardedVideoExpired          = @"onRewardedVideoExpired";
NSString *const kEventRewardedVideoShown            = @"onRewardedVideoShown";
NSString *const kEventRewardedVideoClosed           = @"onRewardedVideoClosed";
NSString *const kEventRewardedVideoFinished         = @"onRewardedVideoFinished";
NSString *const kEventRewardedVideoClicked          = @"onRewardedVideoClicked";

#pragma mark - Converter

@implementation RCTConvert (Appodeal)

RCT_ENUM_CONVERTER(APDLogLevel, (@{
    @"debug":    @(APDLogLevelDebug),
    @"verbose":  @(APDLogLevelVerbose),
    @"off":      @(APDLogLevelOff),
}), APDLogLevelInfo, integerValue)

RCT_ENUM_CONVERTER(AppodealUserGender, (@{
    @"male":    @(AppodealUserGenderMale),
    @"female":  @(AppodealUserGenderFemale),
}), AppodealUserGenderOther, integerValue)

+ (RNAAdType)RNAAdType:(id)json RCT_DYNAMIC {
    return RNAAdTypeBannerTop;
}

@end


#pragma mark - Utils

NSString *RNAVersion() {
    return @"3.0.2";
}

NSArray<NSString *> *RNASupportedMehtods() {
    return @[
        kEventAppodealInitialized,
        kEventAppodealDidReceiveRevenue,
        kEventBannerLoaded,
        kEventBannerFailedToLoad,
        kEventBannerExpired,
        kEventBannerShown,
        kEventBannerClicked,
        kEventInterstitialLoaded,
        kEventInterstitialFailedToLoad,
        kEventInterstitialShown,
        kEventInterstitialFailedToPresent,
        kEventInterstitialExpired,
        kEventInterstitialClosed,
        kEventInterstitialClicked,
        kEventRewardedVideoLoaded,
        kEventRewardedVideoFailedToLoad,
        kEventRewardedVideoFailedToPresent,
        kEventRewardedVideoExpired,
        kEventRewardedVideoShown,
        kEventRewardedVideoClosed,
        kEventRewardedVideoFinished,
        kEventRewardedVideoClicked
    ];
}

AppodealAdType AppodealAdTypeFromRNAAdType(RNAAdType adType) {
    AppodealAdType result = 0;
    if ((adType & RNAAdTypeInterstitial) > 0) {
        result |= AppodealAdTypeInterstitial;
    }
    
    if (isRNAAdTypeBanner(adType) > 0) {
        result |= AppodealAdTypeBanner;
    }
    
    if ((adType & RNAAdTypeRewardedVideo) > 0) {
        result |= AppodealAdTypeRewardedVideo;
    }
    
    if ((adType & RNAAdTypeNative) > 0) {
        result |= AppodealAdTypeNativeAd;
    }
    
    if ((adType & RNAAdTypeMREC) > 0) {
        result |= AppodealAdTypeMREC;
    }
    
    return result;
}

RNAAdType RNAAdTypeFromaAppodealAdType(AppodealAdType adType) {
    RNAAdType result = 0;
    if ((adType & AppodealAdTypeInterstitial) > 0) {
        result |= RNAAdTypeInterstitial;
    }
    
    if ((adType & AppodealAdTypeBanner) > 0) {
        result |= RNAAdTypeBanner;
    }
    
    if ((adType & AppodealAdTypeRewardedVideo) > 0) {
        result |= RNAAdTypeRewardedVideo;
    }
    
    if ((adType & AppodealAdTypeNativeAd) > 0) {
        result |= RNAAdTypeNative;
    }
    
    if ((adType & AppodealAdTypeMREC) > 0) {
        result |= RNAAdTypeMREC;
    }
    
    return result;
}

AppodealShowStyle AppodealShowStyleFromRNAAdType(RNAAdType adType) {
    if ((adType & RNAAdTypeInterstitial) > 0) {
        return AppodealShowStyleInterstitial;
    }
    
    if ((adType & RNAAdTypeBannerBottom) > 0) {
        return AppodealShowStyleBannerBottom;
    }
    
    if ((adType & RNAAdTypeBannerTop) > 0) {
        return AppodealShowStyleBannerTop;
    }
    
    if ((adType & RNAAdTypeRewardedVideo) > 0) {
        return AppodealShowStyleRewardedVideo;
    }
    
    return 0;
}

APDCCPAUserConsent APDCCPAUserConsentFromRNConsent(NSInteger consent) {
    return (APDCCPAUserConsent)consent;
}

APDGDPRUserConsent APDGDPRUserConsentFromRNConsent(NSInteger consent) {
    return (APDGDPRUserConsent)consent;
}

APDPurchaseType APDPurchaseTypeFromRNPurchase(NSInteger type) {
    return (APDPurchaseType)type;
}

BOOL isRNAAdTypeBanner(RNAAdType adType) {
    return ((adType & RNAAdTypeBanner) > 0 || (adType & RNAAdTypeBannerBottom) > 0 || (adType & RNAAdTypeBannerTop) > 0);
}

CGSize RNAppodealBannerViewSizeFromString(NSString *size) {
    if ([size isEqualToString:@"tablet"]) {
        return kAppodealUnitSize_728x90;
    } else if ([size isEqualToString:@"mrec"]) {
        return CGSizeMake(300, 250);
    } else {
        return kAPDAdSize320x50;
    }
}

NSString *NSStringFromAppodealBannerViewSize(CGSize size) {
    if (CGSizeEqualToSize(size, kAppodealUnitSize_728x90)) {
        return @"tablet";
    } else if (CGSizeEqualToSize(size, CGSizeMake(300, 250))) {
        return @"mrec";
    } else {
        return @"phone";
    }
}
