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
                                 types:AppodealAdTypeFromRNAAdType(adTypes)];
    });
}

RCT_EXPORT_METHOD(show:(int)showType
                  placement:(nullable NSString *)placement) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal showAd:AppodealShowStyleFromRNAAdType(showType)
            forPlacement:placement
      rootViewController:RCTPresentedViewController()];
    });
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isLoaded:(int)showType) {
    __block NSNumber *isLoaded;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        isLoaded = @([Appodeal isReadyForShowWithStyle:AppodealShowStyleFromRNAAdType(showType)]);
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return isLoaded;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(canShow:(NSInteger)showType
                  placement:(nullable NSString *)placement) {
    __block NSNumber *canShow;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        canShow = @([Appodeal canShow:AppodealAdTypeFromRNAAdType(showType)
                          forPlacement:placement]);
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return canShow;
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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isPrecache:(NSInteger)adType) {
    __block NSNumber *isPrecache;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        isPrecache = @([Appodeal isAutocacheEnabled:AppodealAdTypeFromRNAAdType(adType)]);
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return isPrecache;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(predictedEcpm:(NSInteger)adType) {
    __block NSNumber *eCPM;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        eCPM = @([Appodeal predictedEcpmForAdType:AppodealAdTypeFromRNAAdType(adType)]);
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return eCPM;
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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getVersion) {
    __block NSString *version;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        version = [Appodeal getVersion];
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return version;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isAutocacheEnabled:(NSInteger)types) {
    __block NSNumber *isAutocache;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        isAutocache = @([Appodeal isAutocacheEnabled:AppodealAdTypeFromRNAAdType(types)]);
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return isAutocache;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isInitialized:(int)types) {
    __block NSNumber *isInitialized;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        isInitialized = @([Appodeal isInitializedForAdType:AppodealAdTypeFromRNAAdType(types)]);
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return isInitialized;
}

#pragma mark - Segments

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRewardParameters:(nonnull NSString *)placement) {
    __block NSDictionary *params;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        id <APDReward> reward = [Appodeal rewardForPlacement:placement];
        params = @{
            @"name": reward.currencyName,
            @"amount": @(reward.amount)
        };
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return params;
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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getExtras) {
    __block NSDictionary *extras;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        extras = [Appodeal extras];
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return extras;
}

RCT_EXPORT_METHOD(setCustomStateValue:(nullable id)value
                  key:(nonnull NSString *)key) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setCustomStateValue:value forKey:key];
    });
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getCustomState) {
    __block NSDictionary *customState;
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    dispatch_async(dispatch_get_main_queue(), ^{
        customState = [Appodeal customState];
        dispatch_semaphore_signal(semaphore);
    });
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    return customState;
}

#pragma mark - Purchases

RCT_EXPORT_METHOD(trackInAppPurchase:(double)amount
                  currencyCode:(nonnull NSString *)currency) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal trackInAppPurchase:@(amount)
                            currency:currency];
    });
}

RCT_EXPORT_METHOD(validateAndTrackInAppPurchase:(nonnull NSDictionary *)purchase
                                    completion:(nonnull RCTResponseSenderBlock)comlpletion) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal validateAndTrackInAppPurchase:purchase[@"productId"]
                                           type:APDPurchaseTypeFromRNPurchase([purchase[@"productType"] intValue])
                                          price:purchase[@"price"]
                                       currency:purchase[@"currency"]
                                  transactionId:purchase[@"transactionId"]
                           additionalParameters:purchase[@"additionalParameters"]
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
