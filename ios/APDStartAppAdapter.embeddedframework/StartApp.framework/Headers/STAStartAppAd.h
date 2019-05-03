//
//  StartAppAd.h
//  StartAppAdSDK
//
//  Copyright (c) 2013 StartApp. All rights reserved.
//  SDK version 3.4.3

#import <UIKit/UIKit.h>
#import "STAAbstractAd.h"

/* StartAppAd enumeration */
typedef enum {
	STAAdType_FullScreen = 1,
    STAAdType_Automatic = 3,
    STAAdType_Overlay = 5
} STAAdType;


@interface STAStartAppAd : STAAbstractAd

@property (nonatomic, assign) bool STAShouldAutoRotate;
@property STAAdType startAppAdType;

@property (nonatomic, strong) STAAdPreferences *preferences;

- (id) init;


- (void) loadRewardedVideoAdWithDelegate:(id<STADelegateProtocol>) delegate;
- (void) loadRewardedVideoAdWithDelegate:(id<STADelegateProtocol>) delegate withAdPreferences:(STAAdPreferences*) adPrefs;

- (void) loadAd;
- (void) loadAdWithAdPreferences:(STAAdPreferences*) adPrefs;
- (void) loadAdWithDelegate:(id<STADelegateProtocol>) delegate;
- (void) loadAdWithDelegate:(id<STADelegateProtocol>) delegate withAdPreferences:(STAAdPreferences*) adPrefs;

- (void) showAd;
- (void) showAdWithAdTag:(NSString *)adTag;

// STAAdType is depreceted, will be removed in future SDKs.
- (void) loadAd:(STAAdType) adType __attribute__((deprecated));
- (void) loadAd:(STAAdType) adType withAdPreferences:(STAAdPreferences*) adPrefs __attribute__((deprecated));
- (void) loadAd:(STAAdType) adType withDelegate:(id<STADelegateProtocol>) delegate __attribute__((deprecated));
- (void) loadAd:(STAAdType) adType withDelegate:(id<STADelegateProtocol>) delegate withAdPreferences:(STAAdPreferences*) adPrefs __attribute__((deprecated));

// initWithAppID is depreceted, will be removed in future SDKs, please use StartAppSDK instead.
+ (void) initWithAppId: (NSString*)applicationId developerId:(NSString*)developerId __attribute__((deprecated));


- (BOOL) isReady;

@end


