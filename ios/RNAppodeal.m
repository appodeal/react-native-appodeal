#import "RNAppodeal.h"
#import "RNADefines.h"

#import <React/RCTUtils.h>


@interface RNAppodeal () <
AppodealBannerDelegate,
AppodealInterstitialDelegate,
AppodealRewardedVideoDelegate,
AppodealInitializationDelegate
>

@end


@implementation RNAppodeal

@synthesize bridge = _bridge;

NSArray *RNAppodealConsentParameters(void) {
    return @[
        @(STKConsentManager.sharedManager.consentStatus),
        @(STKConsentManager.sharedManager.regulation)
    ];
}

RCT_EXPORT_MODULE();

#pragma mark - Method export

RCT_EXPORT_METHOD(initializeWithAppKey:(nonnull NSString *)appKey
                  adTypes:(NSInteger)adTypes) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setFramework:APDFrameworkReactNative version:RNAVersion()];
        
        [Appodeal setRewardedVideoDelegate:self];
        [Appodeal setBannerDelegate:self];
        [Appodeal setInterstitialDelegate:self];
        [Appodeal setInitializationDelegate:self];

        [Appodeal initializeWithApiKey:appKey
                                 types:adTypes];
    });
}

RCT_EXPORT_METHOD(show:(int)showType
                  placement:(nullable NSString *)placement
                  result:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal showAd:AppodealShowStyleFromRNAAdType(showType)
                          forPlacement:placement
                    rootViewController:RCTPresentedViewController()];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(isLoaded:(int)showType
                  result:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isReadyForShowWithStyle:AppodealShowStyleFromRNAAdType(showType)];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(canShow:(NSInteger)showType
                  placement:(nullable NSString *)placement
                  result:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal canShow:AppodealAdTypeFromRNAAdType(showType) forPlacement:placement];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(predictedEcpm:(NSInteger)adType
                  result:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        double eCPM = [Appodeal predictedEcpmForAdType:AppodealAdTypeFromRNAAdType(adType)];
        NSArray *params = @[
            @(eCPM)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(cache:(NSInteger)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal cacheAd:AppodealAdTypeFromRNAAdType(adType)];
    });
}

RCT_EXPORT_METHOD(hide:(int)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal hideBanner];
    });
}

RCT_EXPORT_METHOD(setAutoCache:(NSInteger)adType
                  autocache:(BOOL)autocache) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setAutocache:autocache types:AppodealAdTypeFromRNAAdType(adType)];
    });
}

RCT_EXPORT_METHOD(isPrecache:(NSInteger)adType
                  calls:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isAutocacheEnabled:AppodealAdTypeFromRNAAdType(adType)];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(predictedEcpm:(NSInteger)adType
                  calls:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        double eCPM = [Appodeal predictedEcpmForAdType:AppodealAdTypeFromRNAAdType(adType)];
        NSArray *params = @[
            @(eCPM)
        ];
        callback(params);
    });
}

#pragma mark - Consent

RCT_EXPORT_METHOD(updateGDPRConsent:(NSInteger)consent) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal updateUserConsentGDPR:APDGDPRUserConsentFromRNConsent(consent)];
    });
}

RCT_EXPORT_METHOD(updateCCPAConsent:(NSInteger)consent) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal updateUserConsentCCPA:APDCCPAUserConsentFromRNConsent(consent)];
    });
}

#pragma mark - Banner

RCT_EXPORT_METHOD(setSmartBanners:(BOOL)smartBanners) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setSmartBannersEnabled:smartBanners];
    });
}

RCT_EXPORT_METHOD(setBannerAnimation:(BOOL)bannerAnimations) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setBannerAnimationEnabled:bannerAnimations];
    });
}

RCT_EXPORT_METHOD(setTabletBanners:(BOOL)val) {
    dispatch_async(dispatch_get_main_queue(), ^{
        APDUnitSize size = val ? kAppodealUnitSize_728x90 : kAppodealUnitSize_320x50;
        [Appodeal setPreferredBannerAdSize:size];
    });
}

#pragma mark - Advanced features

RCT_EXPORT_METHOD(setTesting:(BOOL)testingEnabled) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setTestingEnabled:testingEnabled];
    });
}

RCT_EXPORT_METHOD(setLogLevel:(APDLogLevel)logLevel) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setLogLevel:logLevel];
    });
}

RCT_EXPORT_METHOD(setTriggerPrecacheCallbacks:(NSInteger)adTypes
                  flag:(BOOL)flag) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setTriggerPrecacheCallbacks:flag
                                        types:AppodealAdTypeFromRNAAdType(adTypes)];
    });
}

RCT_EXPORT_METHOD(setChildDirectedTreatment:(BOOL)enabled) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setChildDirectedTreatment:enabled];
    });
}

RCT_EXPORT_METHOD(disableNetwork:(nonnull NSString *)name
                  types:(NSInteger)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal disableNetworkForAdType:AppodealAdTypeFromRNAAdType(adType) name:name];
    });
}

RCT_EXPORT_METHOD(getVersion:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSArray *params = @[
            [Appodeal getVersion]
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(isAutocacheEnabled:(NSInteger)types
                  callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isAutocacheEnabled:AppodealAdTypeFromRNAAdType(types)];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(isInitialized:(int)types
                  callback:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isInitializedForAdType:types];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

#pragma mark - Segments

RCT_EXPORT_METHOD(getRewardParameters:(nonnull NSString *)placement
                  callback:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSObject <APDReward> *reward = [Appodeal rewardForPlacement:placement];
        NSArray *params = @[
            @(reward.amount),
            reward.currencyName ?: @""
        ];
        callback(params);
    });
}

#pragma mark - User Data

RCT_EXPORT_METHOD(setUserId:(nonnull NSString *)userId) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setUserId:userId];
    });
}

RCT_EXPORT_METHOD(setExtrasValue:(nullable id)value
                  key:(nonnull NSString *)key) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setExtrasValue:value forKey:key];
    });
}

RCT_EXPORT_METHOD(getExtras:(nonnull RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSDictionary *extras = [Appodeal extras];
        NSMutableArray *params = [NSMutableArray arrayWithCapacity:1];
        [params addObject:extras ?: NSNull.null];
        callback(params);
    });
}

RCT_EXPORT_METHOD(setCustomStateValue:(nullable id)value
                  key:(nonnull NSString *)key) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setCustomStateValue:value forKey:key];
    });
}

RCT_EXPORT_METHOD(getCustomState:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSDictionary *customState = [Appodeal customState];
        NSMutableArray *params = [NSMutableArray arrayWithCapacity:1];
        [params addObject:customState ?: NSNull.null];
        callback(params);
    });
}

#pragma mark - Purchases

RCT_EXPORT_METHOD(trackInAppPurchase:(double)amount
                  currencyCode:(nonnull NSString *)currency) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal trackInAppPurchase:@(amount)
                            currency:currency];
    });
}

RCT_EXPORT_METHOD(validateAndTrackInAppPurchase:(nonnull NSString *)purchase
                  type:(NSInteger)type
                  price:(nonnull NSString *)price
                  currency:(nonnull NSString *)currency
                  transaction:(nonnull NSString *)transaction
                  parameters:(nullable NSDictionary *)parameters
                  completion:(nonnull RCTResponseSenderBlock)comlpletion) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal validateAndTrackInAppPurchase:purchase
                                           type:APDPurchaseTypeFromRNPurchase(type)
                                          price:price
                                       currency:currency
                                  transactionId:transaction
                           additionalParameters:parameters
                                        success:^(NSDictionary *response) {
            NSMutableArray *params = [NSMutableArray arrayWithCapacity:2];
            [params addObject:response ?: NSNull.null];
            [params addObject:NSNull.null];
            comlpletion(params);
        }
                                        failure:^(NSError *error) {
            NSMutableArray *params = [NSMutableArray arrayWithCapacity:2];
            [params addObject:NSNull.null];
            [params addObject:error ?: NSNull.null];
            comlpletion(params);
        }];
    });
}

RCT_EXPORT_METHOD(trackEvent:(nonnull NSString *)event
                  parameters:(nullable NSDictionary *)parameters) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal trackEvent:event
            customParameters:parameters];
    });
}


#pragma mark - Events

- (NSArray<NSString *> *)supportedEvents {
    return RNASupportedMehtods();
}

#pragma mark - AppodealBannerDelegate

- (void)bannerDidLoadAdIsPrecache:(BOOL)precache {
    NSDictionary *params = @{
        @"isPrecache": @(precache),
        @"height": @(CGRectGetHeight(Appodeal.banner.frame))
    };
    [self sendEventWithName:kEventBannerLoaded body:params];
}

- (void)bannerDidFailToLoadAd; {
    [self sendEventWithName:kEventBannerFailedToLoad body:nil];
}

- (void)bannerDidShow {
    [self sendEventWithName:kEventBannerShown body:nil];
}

- (void)bannerDidExpired {
    [self sendEventWithName:kEventBannerExpired body:nil];
}

- (void)bannerDidClick {
    [self sendEventWithName:kEventBannerClicked body:nil];
}

#pragma mark - AppodealInterstitialDelegate

- (void)interstitialDidLoadAdIsPrecache:(BOOL)precache {
    NSDictionary *params = @{
        @"isPrecache": @(precache)
    };
    [self sendEventWithName:kEventInterstitialLoaded body:params];
}

- (void)interstitialDidFailToLoadAd {
    [self sendEventWithName:kEventInterstitialFailedToLoad body:nil];
}

- (void)interstitialDidExpired {
    [self sendEventWithName:kEventInterstitialExpired body:nil];
}

- (void)interstitialDidFailToPresent {
    [self sendEventWithName:kEventInterstitialFailedToPresent body:nil];
}

- (void)interstitialWillPresent {
    [self sendEventWithName:kEventInterstitialShown body:nil];
}

- (void)interstitialDidDismiss {
    [self sendEventWithName:kEventInterstitialClosed body:nil];
}

- (void)interstitialDidClick {
    [self sendEventWithName:kEventInterstitialClicked body:nil];
}

#pragma mark - AppodealRewardedVideoDelegate

- (void)rewardedVideoDidLoadAdIsPrecache:(BOOL)precache {
    NSDictionary *params = @{
        @"isPrecache": @(precache)
    };
    [self sendEventWithName:kEventRewardedVideoLoaded body:params];
}

- (void)rewardedVideoDidFailToLoadAd {
    [self sendEventWithName:kEventRewardedVideoFailedToLoad body:nil];
}

- (void)rewardedVideoDidFailToPresentWithError:(NSError *)error {
    [self sendEventWithName:kEventRewardedVideoFailedToPresent body:nil];
}

- (void)rewardedVideoDidExpired {
    [self sendEventWithName:kEventRewardedVideoExpired body:nil];
}

- (void)rewardedVideoDidPresent {
    [self sendEventWithName:kEventRewardedVideoShown body:nil];
}

- (void)rewardedVideoDidClick {
    [self sendEventWithName:kEventRewardedVideoExpired body:nil];
}

- (void)rewardedVideoWillDismissAndWasFullyWatched:(BOOL)wasFullyWatched {
    NSDictionary *params = @{
        @"isFinished": @(wasFullyWatched)
    };
    [self sendEventWithName:kEventRewardedVideoClosed body:params];
}

- (void)rewardedVideoDidFinish:(float)rewardAmount name:(NSString *)rewardName {
    NSDictionary *params = @{
        @"amount": @(rewardAmount),
        @"name": rewardName ?: @""
    };
    [self sendEventWithName:kEventRewardedVideoFinished body:params];
}

#pragma mark - AppodealInitializationDelegate

- (void)appodealSDKDidInitialize {
    [self sendEventWithName:kEventAppodealInitialized body:nil];
}

#pragma mark - Noop

RCT_EXPORT_METHOD(setSharedAdsInstanceAcrossActivities:(BOOL)flag) {}

@end
