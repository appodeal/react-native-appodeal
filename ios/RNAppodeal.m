#import "RNAppodeal.h"

#pragma mark Appodeal constants

const int INTERSTITIAL        = 1;
const int BANNER              = 4;
const int BANNER_BOTTOM       = 8;
const int BANNER_TOP          = 16;
const int REWARDED_VIDEO      = 128;
const int NON_SKIPPABLE_VIDEO = 256;

#pragma mark Custom properties

NSMutableDictionary *customRules;

#pragma mark Convert types, styles and logs

int nativeAdTypesForType(int adTypes) {
    int nativeAdTypes = 0;
    
    if ((adTypes & INTERSTITIAL) > 0) {
        nativeAdTypes |= AppodealAdTypeInterstitial;
    }
    
    if ((adTypes & BANNER) > 0 ||
        (adTypes & BANNER_TOP) > 0 ||
        (adTypes & BANNER_BOTTOM) > 0) {
        
        nativeAdTypes |= AppodealAdTypeBanner;
    }
    
    if ((adTypes & REWARDED_VIDEO) > 0) {
        nativeAdTypes |= AppodealAdTypeRewardedVideo;
    }
    
    if ((adTypes & NON_SKIPPABLE_VIDEO) >0) {
        nativeAdTypes |= AppodealAdTypeNonSkippableVideo;
    }
    
    return nativeAdTypes;
}

int nativeShowStyleForType(int adTypes) {
    
    if ((adTypes & INTERSTITIAL) > 0) {
        return AppodealShowStyleInterstitial;
    }
    
    if ((adTypes & BANNER_TOP) > 0) {
        return AppodealShowStyleBannerTop;
    }
    
    if ((adTypes & BANNER_BOTTOM) > 0) {
        return AppodealShowStyleBannerBottom;
    }
    
    if ((adTypes & REWARDED_VIDEO) > 0) {
        return AppodealShowStyleRewardedVideo;
    }
    
    if ((adTypes & NON_SKIPPABLE_VIDEO) > 0) {
        return AppodealShowStyleNonSkippableVideo;
    }
    
    return 0;
}



APDLogLevel parseLogLevel (NSString * log) {
    __block APDLogLevel tempLogLevel = APDLogLevelOff;
    void (^selectedCase)() = @{
       @"off" : ^{
           tempLogLevel = APDLogLevelOff;
       },
       @"warning" : ^{
           tempLogLevel = APDLogLevelWarning;
       },
       @"info" : ^{
           tempLogLevel = APDLogLevelInfo;
       },
       @"error" : ^{
           tempLogLevel = APDLogLevelError;
       },
       @"verbose" : ^{
           tempLogLevel = APDLogLevelVerbose;
       },
       }[log];
    if (selectedCase != nil)
        selectedCase();
    return tempLogLevel;
}

#pragma mark implementation of plugin

@implementation RNAppodeal

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;


#pragma mark common methods

RCT_EXPORT_METHOD(initialize:(NSString *)appKey types:(int)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        customRules = [[NSMutableDictionary alloc] init];
        [Appodeal setFramework:APDFrameworkReactNative];
        [Appodeal initializeWithApiKey:appKey types:nativeAdTypesForType(adType)];
        
        [Appodeal setRewardedVideoDelegate:self];
        [Appodeal setNonSkippableVideoDelegate:self];
        [Appodeal setBannerDelegate:self];
        [Appodeal setInterstitialDelegate:self];
    });
}

RCT_EXPORT_METHOD(showToast:(NSString *)message) {
    UIAlertView *toast = [[UIAlertView alloc] initWithTitle:nil message:message delegate:nil cancelButtonTitle:nil otherButtonTitles:nil, nil];
    [toast show];
    int duration = 1;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, duration * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
        [toast dismissWithClickedButtonIndex:0 animated:YES];
    });
}

RCT_EXPORT_METHOD(show:(int)showType placement:(NSString*)placement result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([placement  isEqual: @""]) {
            if([Appodeal showAd:nativeShowStyleForType(showType) rootViewController:[[UIApplication sharedApplication] keyWindow].rootViewController])
                callback(@[@YES]);
            else
                callback(@[@NO]);
        } else {
            if([Appodeal showAd:nativeShowStyleForType(showType) forPlacement:placement rootViewController:[[UIApplication sharedApplication] keyWindow].rootViewController])
                callback(@[@YES]);
            else
                callback(@[@NO]);
        }
    });
}

RCT_EXPORT_METHOD(isLoaded:(int)showType result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSLog(@"Appodeal REACT: isLoaded");
        if([Appodeal isReadyForShowWithStyle:nativeShowStyleForType(showType)])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(cache:(int)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal cacheAd:nativeAdTypesForType(adType)];
    });
}

RCT_EXPORT_METHOD(hide:(int)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal hideBanner];
    });
}

RCT_EXPORT_METHOD(setAutoCache:(int)adType autoc:(BOOL)autocache) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setAutocache:autocache types:nativeAdTypesForType(adType)];
    });
}

RCT_EXPORT_METHOD(isPrecache:(int)adType calls:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if([Appodeal isAutocacheEnabled:nativeAdTypesForType(adType)])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}


#pragma mark Banner settings

RCT_EXPORT_METHOD(setSmartBanners:(BOOL)val) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setSmartBannersEnabled:val];
    });
}

RCT_EXPORT_METHOD(setBannerBackground:(BOOL)val) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setBannerBackgroundVisible:val];
    });
}

RCT_EXPORT_METHOD(setBannerAnimation:(BOOL)val) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setBannerAnimationEnabled:val];
    });
}

RCT_EXPORT_METHOD(setTabletBanners:(BOOL)val) { }

#pragma mark Advanced features


RCT_EXPORT_METHOD(setTesting:(BOOL)testingEnabled) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setTestingEnabled:testingEnabled];
    });
}

RCT_EXPORT_METHOD(setLogLevel:(NSString *)log) {
    dispatch_async(dispatch_get_main_queue(), ^{
        APDLogLevel logLevel = parseLogLevel(log);
        [Appodeal setLogLevel:logLevel];
    });
}

RCT_EXPORT_METHOD(setChildDirectedTreatment:(BOOL)enabled) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setChildDirectedTreatment:enabled];
    });
}

RCT_EXPORT_METHOD(setOnLoadedTriggerBoth:(int)adType enabled:(BOOL)val) { }

RCT_EXPORT_METHOD(disableNetwork:(NSString *)name) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal disableNetworkForAdType:AppodealAdTypeMREC name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeBanner name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeNativeAd name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeNonSkippableVideo name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeRewardedVideo name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeInterstitial name:name];
    });
}

RCT_EXPORT_METHOD(disableNetworkType:(NSString *)name types:(int)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ((adType & BANNER) > 0 ||
            (adType & BANNER_TOP) > 0 ||
            (adType & BANNER_BOTTOM) > 0) {
            [Appodeal disableNetworkForAdType:AppodealAdTypeBanner name:name];
        }
        [Appodeal disableNetworkForAdType:nativeAdTypesForType(adType) name:name];
    });
}

RCT_EXPORT_METHOD(disableLocationPermissionCheck) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setLocationTracking:NO];
    });
}

RCT_EXPORT_METHOD(disableWriteExternalStoragePermissionCheck) { }

RCT_EXPORT_METHOD(requestAndroidMPermissions) { }

RCT_EXPORT_METHOD(muteVideosIfCallsMuted) { }

RCT_EXPORT_METHOD(showTestScreen) { }

RCT_EXPORT_METHOD(getVersion:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        callback(@[[Appodeal getVersion]]);
    });
}

RCT_EXPORT_METHOD(isAutocacheEnabled:(int)types callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([Appodeal isAutocacheEnabled:nativeAdTypesForType(types)]) {
            callback(@[@YES]);
        }
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(isInitialized:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if([Appodeal isInitalized])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(disableUserData:(NSString *)network) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal disableUserData:network];
    });
}

#pragma mark Placement features

RCT_EXPORT_METHOD(getRewardParameters:(NSString *) placementName result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSObject <APDReward> * reward = [Appodeal rewardForPlacement: placementName];
        if (reward) {
            NSString *rewardCurrency = reward.currencyName;
            NSUInteger rewardAmount = reward.amount;
            callback(@[ @(rewardAmount), rewardCurrency ]);
        }
        else
            callback(@[@0,@""]);
    });
}

RCT_EXPORT_METHOD(canShow:(int)showType placement:(NSString *) placementName result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if([Appodeal canShowAd: nativeShowStyleForType(showType) forPlacement: placementName])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(setCustomDoubleRule:(NSString *)ruleName value:(double)ruleValue) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : [NSNumber numberWithDouble:ruleValue]};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}

RCT_EXPORT_METHOD(setCustomIntegerRule:(NSString *)ruleName value:(int)ruleValue) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : [NSNumber numberWithInteger:ruleValue]};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}

RCT_EXPORT_METHOD(setCustomStringRule:(NSString *)ruleName value:(NSString *)ruleValue) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : ruleValue};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}

RCT_EXPORT_METHOD(setCustomBooleanRule:(NSString *)ruleName value:(BOOL)ruleValue) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : [NSNumber numberWithBool:ruleValue]};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}


#pragma mark User Data

RCT_EXPORT_METHOD(setUserId:(NSString *)userId) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setUserId:userId];
    });
}

RCT_EXPORT_METHOD(setAge:(int)age) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setUserAge:age];
    });
}

RCT_EXPORT_METHOD(trackInAppPurchase:(double)amount currencyCode:(NSString *)currency) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[APDSdk sharedSdk] trackInAppPurchase:[NSNumber numberWithDouble:amount] currency: currency];
    });
}

RCT_EXPORT_METHOD(setGender:(NSString *)AppodealUserGender) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if([AppodealUserGender isEqualToString:@"other"])
            [Appodeal setUserGender:AppodealUserGenderOther];
        if([AppodealUserGender isEqualToString:@"male"])
            [Appodeal setUserGender:AppodealUserGenderMale];
        if([AppodealUserGender isEqualToString:@"female"])
            [Appodeal setUserGender:AppodealUserGenderFemale];
    });
}

#pragma mark Events
#pragma mark - banner events
- (void)bannerDidShow {
    //[self sendEventWithName:@"onBannerShown" body:@{@"":@""}];
}

- (void)bannerDidLoadAdIsPrecache:(BOOL)precache {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onBannerLoaded" body:@{@"isPrecache":[NSNumber numberWithBool:precache]}];
}

- (void)bannerDidClick {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onBannerClicked" body:@{@"":@""}];
}

- (void)bannerDidFailToLoadAd; {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onBannerFailedToLoad" body:@{@"":@""}];
}

#pragma mark - Interstitial events
- (void)interstitialDidLoadAdisPrecache:(BOOL)precache {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onInterstitialLoaded" body:@{@"isPrecache":[NSNumber numberWithBool:precache]}];
}

- (void)interstitialDidFailToLoadAd {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onInterstitialFailedToLoad" body:@{@"":@""}];
}

- (void)interstitialWillPresent {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onInterstitialShown" body:@{@"":@""}];
}

- (void)interstitialDidDismiss {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onInterstitialClosed" body:@{@"":@""}];
}

- (void)interstitialDidClick {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onInterstitialClicked" body:@{@"":@""}];
}

- (void)interstitialDidFinish {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onInterstitialDidFinish" body:@{@"":@""}];
}

- (void)interstitialDidFailToPresent {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onInterstitialFailedToPresent" body:@{@"":@""}];
}


#pragma mark - NonSkippable video events
- (void)nonSkippableVideoDidLoadAd {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onNonSkippableVideoLoaded" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidFailToLoadAd {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onNonSkippableVideoFailedToLoad" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidPresent {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onNonSkippableVideoShown" body:@{@"":@""}];
}

- (void)nonSkippableVideoWillDismiss {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onNonSkippableVideoClosed" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidFinish {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onNonSkippableVideoFinished" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidClick {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onNonSkippableVideoClicked" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidFailToPresent {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onNonSkippableVideoFailedToPresent" body:@{@"":@""}];
}

#pragma mark - Rewarded video events
- (void)rewardedVideoDidLoadAd {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onRewardedVideoLoaded" body:@{@"":@""}];
}

- (void)rewardedVideoDidFailToLoadAd {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onRewardedVideoFailedToLoad" body:@{@"":@""}];
}

- (void)rewardedVideoDidPresent {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onRewardedVideoShown" body:@{@"":@""}];
}

- (void)rewardedVideoWillDismiss {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onRewardedVideoClosed" body:@{@"":@""}];
}

- (void)rewardedVideoDidFinish:(NSUInteger)rewardAmount name:(NSString *)rewardName {
    if (rewardName == nil) {
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"onRewardedVideoFinished" body:@{@"amount":[NSNumber numberWithInteger:0],@"name":@"nil"}];
    } else {
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"onRewardedVideoFinished" body:@{@"amount":[NSNumber numberWithInteger:rewardAmount],@"name":rewardName}];
    }
}

- (void)rewardedVideoDidFailToPresent {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"onRewardedVideoFailedToPresent" body:@{@"":@""}];
}

@end
