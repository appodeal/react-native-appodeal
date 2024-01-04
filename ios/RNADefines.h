//
//  RNADefines.h
//  RNAppodeal
//
//  Created by Stas Kochkin on 26/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Appodeal/Appodeal.h>
#import <StackConsentManager/StackConsentManager-Swift.h>


FOUNDATION_EXPORT NSString *const kEventAppodealInitialized;
FOUNDATION_EXPORT NSString *const kEventAppodealDidReceiveRevenue;

FOUNDATION_EXPORT NSString *const kEventBannerLoaded;
FOUNDATION_EXPORT NSString *const kEventBannerFailedToLoad;
FOUNDATION_EXPORT NSString *const kEventBannerExpired;
FOUNDATION_EXPORT NSString *const kEventBannerShown;
FOUNDATION_EXPORT NSString *const kEventBannerClicked;

FOUNDATION_EXPORT NSString *const kEventInterstitialLoaded;
FOUNDATION_EXPORT NSString *const kEventInterstitialFailedToLoad;
FOUNDATION_EXPORT NSString *const kEventInterstitialFailedToPresent;
FOUNDATION_EXPORT NSString *const kEventInterstitialExpired;
FOUNDATION_EXPORT NSString *const kEventInterstitialShown;
FOUNDATION_EXPORT NSString *const kEventInterstitialClosed;
FOUNDATION_EXPORT NSString *const kEventInterstitialClicked;

FOUNDATION_EXPORT NSString *const kEventRewardedVideoLoaded;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoFailedToLoad;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoFailedToPresent;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoExpired;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoShown;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoClicked;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoClosed;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoFinished;

NSString *RNAVersion(void);
NSArray<NSString *> *RNASupportedMehtods(void);

typedef NS_OPTIONS(NSInteger, RNAAdType) {
    RNAAdTypeNone = 0,
    RNAAdTypeInterstitial = 1 << 0,
    RNAAdTypeBanner = 1 << 2,
    RNAAdTypeBannerBottom = 1 << 3,
    RNAAdTypeBannerTop = 1 << 4,
    RNAAdTypeRewardedVideo = 1 << 5,
    RNAAdTypeNative = 1 << 7,
    RNAAdTypeMREC = 1 << 8
};


AppodealAdType AppodealAdTypeFromRNAAdType(RNAAdType adType);
RNAAdType RNAAdTypeFromaAppodealAdType(AppodealAdType adType);
AppodealShowStyle AppodealShowStyleFromRNAAdType(RNAAdType adType);
APDPurchaseType APDPurchaseTypeFromRNPurchase(NSInteger type);
BOOL isRNAAdTypeBanner(RNAAdType adType);
CGSize RNAppodealBannerViewSizeFromString(NSString *size);
NSString *NSStringFromAppodealBannerViewSize(CGSize size);
NSNumber *RNAppodealConsentStatusFrom(APDConsentStatus status);
