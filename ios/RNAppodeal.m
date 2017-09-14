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

RCT_EXPORT_METHOD(initializeWithApiKey:(NSString *)appKey types:(int)adType)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        customRules = [[NSMutableDictionary alloc] init];
        [Appodeal setFramework:APDFrameworkReactNative];
        [Appodeal initializeWithApiKey:appKey types:nativeAdTypesForType(adType)];
    });
}


RCT_EXPORT_METHOD(show:(int)showType placement:(NSString*)placement result:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([placement  isEqual: @""]) {
            if([Appodeal showAd:nativeShowStyleForType(showType) rootViewController:[[UIApplication sharedApplication] keyWindow].rootViewController])
                callback(@[@YES]);
            else
                callback(@[@NO]);
        }
        else {
            if([Appodeal showAd:nativeShowStyleForType(showType) forPlacement:placement rootViewController:[[UIApplication sharedApplication] keyWindow].rootViewController])
                callback(@[@YES]);
            else
                callback(@[@NO]);
        }
    });
}

RCT_EXPORT_METHOD(isLoaded:(int)showType result:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if([Appodeal isReadyForShowWithStyle:nativeShowStyleForType(showType)])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(cache:(int)adType)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal cacheAd:nativeAdTypesForType(adType)];
    });
}

RCT_EXPORT_METHOD(hide:(int)adType)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal hideBanner];
    });
}

RCT_EXPORT_METHOD(setAutoCache:(int)adType autoc:(BOOL)autocache)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setAutocache:autocache types:nativeAdTypesForType(adType)];
    });
}

RCT_EXPORT_METHOD(isPrecache:(int)adType calls:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if([Appodeal isAutocacheEnabled:nativeAdTypesForType(adType)])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}







#pragma mark Banner settings

RCT_EXPORT_METHOD(setSmartBanners:(BOOL)val)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setSmartBannersEnabled:val];
    });
}

RCT_EXPORT_METHOD(setBannerBackground:(BOOL)val)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setBannerBackgroundVisible:val];
    });
}

RCT_EXPORT_METHOD(setBannerAnimation:(BOOL)val)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setBannerAnimationEnabled:val];
    });
}




#pragma mark Advanced features


RCT_EXPORT_METHOD(setTesting:(BOOL)testingEnabled)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setTestingEnabled:testingEnabled];
    });
}

RCT_EXPORT_METHOD(setLogLevel:(NSString *)log)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        APDLogLevel logLevel = parseLogLevel(log);
        [Appodeal setLogLevel:logLevel];
    });
}

RCT_EXPORT_METHOD(setChildDirectedTreatment:(BOOL)enabled)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setChildDirectedTreatment:enabled];
    });
}

RCT_EXPORT_METHOD(disableNetwork:(NSString *)name)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal disableNetworkForAdType:AppodealAdTypeMREC name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeBanner name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeNativeAd name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeNonSkippableVideo name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeRewardedVideo name:name];
        [Appodeal disableNetworkForAdType:AppodealAdTypeInterstitial name:name];
    });
}

RCT_EXPORT_METHOD(disableNetworkType:(NSString *)name types:(int)adType)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if ((adType & BANNER) > 0 ||
            (adType & BANNER_TOP) > 0 ||
            (adType & BANNER_BOTTOM) > 0) {
            [Appodeal disableNetworkForAdType:AppodealAdTypeBanner name:name];
        }
        [Appodeal disableNetworkForAdType:nativeAdTypesForType(adType) name:name];
    });
}

RCT_EXPORT_METHOD(disableLocationPermissionCheck)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setLocationTracking:NO];
    });
}

RCT_EXPORT_METHOD(getVersion:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        callback(@[[Appodeal getVersion]]);
    });
}

RCT_EXPORT_METHOD(isAutocacheEnabled:(int)types callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([Appodeal isAutocacheEnabled:nativeAdTypesForType(types)]) {
            callback(@[@YES]);
        }
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(isInitialized:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if([Appodeal isInitalized])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(disableUserData:(NSString *)network)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal disableUserData:network];
    });
}




#pragma mark Placement features

RCT_EXPORT_METHOD(getRewardParameters:(NSString *) placementName result:(RCTResponseSenderBlock)callback)
{
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

RCT_EXPORT_METHOD(canShow:(int)showType placement:(NSString *) placementName result:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if([Appodeal canShowAd: nativeShowStyleForType(showType) forPlacement: placementName])
            callback(@[@YES]);
        else
            callback(@[@NO]);
    });
}

RCT_EXPORT_METHOD(setCustomDoubleRule:(NSString *)ruleName value:(double)ruleValue)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : [NSNumber numberWithDouble:ruleValue]};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}

RCT_EXPORT_METHOD(setCustomIntegerRule:(NSString *)ruleName value:(int)ruleValue)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : [NSNumber numberWithInteger:ruleValue]};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}

RCT_EXPORT_METHOD(setCustomStringRule:(NSString *)ruleName value:(NSString *)ruleValue)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : ruleValue};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}

RCT_EXPORT_METHOD(setCustomBoolRule:(NSString *)ruleName value:(BOOL)ruleValue)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (customRules) {
            NSDictionary *tempDictionary = @{ruleName : [NSNumber numberWithBool:ruleValue]};
            [customRules addEntriesFromDictionary:tempDictionary];
            [Appodeal setCustomRule:customRules];
        }
    });
}







#pragma mark User Data

RCT_EXPORT_METHOD(setUserId:(NSString *)userId)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setUserId:userId];
    });
}

RCT_EXPORT_METHOD(setAge:(int)age)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setUserAge:age];
    });
}

RCT_EXPORT_METHOD(trackInAppPurchase:(double)amount currencyCode:(NSString *)currency)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[APDSdk sharedSdk] trackInAppPurchase:[NSNumber numberWithDouble:amount] currency: currency];
    });
}

RCT_EXPORT_METHOD(setGender:(NSString *)AppodealUserGender)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if([AppodealUserGender isEqualToString:@"other"])
            [Appodeal setUserGender:AppodealUserGenderOther];
        if([AppodealUserGender isEqualToString:@"male"])
            [Appodeal setUserGender:AppodealUserGenderMale];
        if([AppodealUserGender isEqualToString:@"female"])
            [Appodeal setUserGender:AppodealUserGenderFemale];
    });
}

#pragma mark
#pragma mark Events
#pragma mark - banner events

RCT_EXPORT_METHOD(enableBannerCallbacks:(BOOL)val)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setBannerDelegate:self];
    });
}

- (void)bannerDidShow
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onBannerShown" body:@{@"":@""}];
}

- (void)bannerDidLoadAdIsPrecache:(BOOL)precache
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onBannerLoaded" body:@{@"precache":[NSNumber numberWithBool:precache]}];
}

- (void)bannerDidClick
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onBannerClicked" body:@{@"":@""}];
}

- (void)bannerDidFailToLoadAd;
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onBannerFailedToLoad" body:@{@"":@""}];
}

#pragma mark - Interstitial events

RCT_EXPORT_METHOD(enableInterstitialCallbacks:(BOOL)val)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setInterstitialDelegate:self];
    });
}

- (void)interstitialDidLoadAdisPrecache:(BOOL)precache
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onInterstitialLoaded" body:@{@"precache":[NSNumber numberWithBool:precache]}];
}

- (void)interstitialDidFailToLoadAd
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onInterstitialFailedToLoad" body:@{@"":@""}];
}

- (void)interstitialWillPresent
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onInterstitialShown" body:@{@"":@""}];
}

- (void)interstitialDidDismiss
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onInterstitialClosed" body:@{@"":@""}];
}

- (void)interstitialDidClick
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onInterstitialClicked" body:@{@"":@""}];
}

- (void)interstitialDidFinish
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onInterstitialDidFinish" body:@{@"":@""}];
}

- (void)interstitialDidFailToPresent
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onInterstitialFailedToPresent" body:@{@"":@""}];
}


#pragma mark - NonSkippable video events

RCT_EXPORT_METHOD(enableNonSkippableVideoCallbacks:(BOOL)val)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setNonSkippableVideoDelegate:self];
    });
}

- (void)nonSkippableVideoDidLoadAd
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onNonSkippableVideoLoaded" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidFailToLoadAd
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onNonSkippableVideoFailedToLoad" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidPresent
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onNonSkippableVideoShown" body:@{@"":@""}];
}

- (void)nonSkippableVideoWillDismiss
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onNonSkippableVideoClosed" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidFinish
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onNonSkippableVideoFinished" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidClick
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onNonSkippableVideoClicked" body:@{@"":@""}];
}

- (void)nonSkippableVideoDidFailToPresent
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onNonSkippableVideoFailedToPresent" body:@{@"":@""}];
}

#pragma mark - Rewarded video events

RCT_EXPORT_METHOD(enableRewardedVideoCallbacks:(BOOL)val)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setRewardedVideoDelegate:self];
    });
}

- (void)rewardedVideoDidLoadAd
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onRewardedVideoLoaded" body:@{@"":@""}];
}

- (void)rewardedVideoDidFailToLoadAd
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onRewardedVideoFailedToLoad" body:@{@"":@""}];
}

- (void)rewardedVideoDidPresent
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onRewardedVideoShown" body:@{@"":@""}];
}

- (void)rewardedVideoWillDismiss
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onRewardedVideoClosed" body:@{@"":@""}];
}

- (void)rewardedVideoDidFinish:(NSUInteger)rewardAmount name:(NSString *)rewardName
{
    if (rewardName == nil) {
        [self.bridge.eventDispatcher sendAppEventWithName:@"onRewardedVideoFinished" body:@{@"rewardAmount":[NSNumber numberWithInteger:0],@"rewardName":@"nil"}];
    }
    else {
        [self.bridge.eventDispatcher sendAppEventWithName:@"onRewardedVideoFinished" body:@{@"rewardAmount":[NSNumber numberWithInteger:rewardAmount],@"rewardName":rewardName}];
    }
}

- (void)rewardedVideoDidFailToPresent
{
    [self.bridge.eventDispatcher sendAppEventWithName:@"onRewardedVideoFailedToPresent" body:@{@"":@""}];
}


@end
