#import "RNAppodeal.h"
#import <StackConsentManager/StackConsentManager.h>
#import "RNADefines.h"
#import <React/RCTUtils.h>


@interface RNAppodeal () <
AppodealBannerDelegate,
AppodealInterstitialDelegate,
AppodealRewardedVideoDelegate,
AppodealNonSkippableVideoDelegate,
STKConsentManagerDisplayDelegate
>

@property (nonatomic, copy) RCTResponseSenderBlock consentCallback;

@end

@implementation RNAppodeal

@synthesize bridge = _bridge;

UIViewController *RNAppodealRootViewController(void) {
    return UIApplication.sharedApplication.keyWindow.rootViewController;
}


NSArray *RNAppodealConsentParameters(void) {
    return @[
        @(STKConsentManager.sharedManager.consentStatus),
        @(STKConsentManager.sharedManager.regulation)
    ];
}

RCT_EXPORT_MODULE();

- (void)initializeSdkWithAppKey:(NSString *)appKey
                        adTypes:(AppodealAdType)adTypes
                        consent:(BOOL)consent {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setFramework:APDFrameworkReactNative version:RNAVersion()];
        
        [Appodeal setRewardedVideoDelegate:self];
        [Appodeal setNonSkippableVideoDelegate:self];
        [Appodeal setBannerDelegate:self];
        [Appodeal setInterstitialDelegate:self];

        [Appodeal initializeWithApiKey:appKey
                                 types:adTypes
                            hasConsent:consent];
    });
}

#pragma mark - Method export

RCT_EXPORT_METHOD(initialize:(NSString *)appKey types:(NSInteger)adType consent:(BOOL)consent) {
    [self initializeSdkWithAppKey:appKey
                          adTypes:AppodealAdTypeFromRNAAdType(adType)
                          consent:consent];
}

RCT_EXPORT_METHOD(synchroniseConsent:(NSString *)appKey callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        __weak typeof(self) weakSelf = self;
        [STKConsentManager.sharedManager synchronizeWithAppKey:appKey
                                                    completion:^(NSError *error) {
            __strong typeof(self) strongSelf = weakSelf;
            if (error) {
                NSLog(@"Error while synchronising consent manager: %@", error);
            }
            
            if (STKConsentManager.sharedManager.shouldShowConsentDialog != STKConsentBoolTrue) {
                callback ? callback(RNAppodealConsentParameters()) : nil;
                return ;
            }
            
            [STKConsentManager.sharedManager loadConsentDialog:^(NSError *error) {
                if (error) {
                    NSLog(@"Error while loading consent dialog: %@", error);
                }
                
                if (!STKConsentManager.sharedManager.isConsentDialogReady) {
                    callback ? callback(RNAppodealConsentParameters()) : nil;
                    return ;
                }
                
                strongSelf.consentCallback = callback;
                [STKConsentManager.sharedManager showConsentDialogFromRootViewController:RNAppodealRootViewController()
                                                                                delegate:self];
            }];
        }];
    });
}

RCT_EXPORT_METHOD(hasConsent:(NSString *)vendorBundle callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [STKConsentManager.sharedManager hasConsentForVendorBundle:vendorBundle];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(show:(int)showType placement:(NSString *)placement result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal showAd:AppodealShowStyleFromRNAAdType(showType)
                          forPlacement:placement
                    rootViewController:RNAppodealRootViewController()];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(isLoaded:(int)showType result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isReadyForShowWithStyle:AppodealShowStyleFromRNAAdType(showType)];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(canShow:(NSInteger)showType placement:(NSString *)placement result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal canShow:AppodealAdTypeFromRNAAdType(showType) forPlacement:placement];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(updateConsent:(BOOL)consent) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal updateConsent:consent];
    });
}

RCT_EXPORT_METHOD(predictedEcpm:(NSInteger)adType result:(RCTResponseSenderBlock)callback) {
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

RCT_EXPORT_METHOD(setAutoCache:(NSInteger)adType autocache:(BOOL)autocache) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setAutocache:autocache types:AppodealAdTypeFromRNAAdType(adType)];
    });
}

RCT_EXPORT_METHOD(isPrecache:(NSInteger)adType calls:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isAutocacheEnabled:AppodealAdTypeFromRNAAdType(adType)];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(predictedEcpm:(NSInteger)adType calls:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        double eCPM = [Appodeal predictedEcpmForAdType:AppodealAdTypeFromRNAAdType(adType)];
        NSArray *params = @[
            @(eCPM)
        ];
        callback(params);
    });
}

#pragma mark - Banner

RCT_EXPORT_METHOD(setSmartBanners:(BOOL)smartBanners) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setSmartBannersEnabled:smartBanners];
    });
}

RCT_EXPORT_METHOD(setBannerBackground:(BOOL)bannerBackground) {
    dispatch_async(dispatch_get_main_queue(), ^{
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated"
        [Appodeal setBannerBackgroundVisible:bannerBackground];
#pragma clang diagnostic pop
    });
}

RCT_EXPORT_METHOD(setBannerAnimation:(BOOL)bannerAnimations) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setBannerAnimationEnabled:bannerAnimations];
    });
}

#pragma mark Advanced features

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

RCT_EXPORT_METHOD(setChildDirectedTreatment:(BOOL)enabled) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setChildDirectedTreatment:enabled];
    });
}

RCT_EXPORT_METHOD(disableNetwork:(NSString *)name) {
    dispatch_async(dispatch_get_main_queue(), ^{
        AppodealAdType adType = 1 << 5 | AppodealAdTypeBanner | AppodealAdTypeNativeAd | AppodealAdTypeNonSkippableVideo | AppodealAdTypeRewardedVideo | AppodealAdTypeInterstitial;
        [Appodeal disableNetworkForAdType:adType
                                     name:name];
    });
}

RCT_EXPORT_METHOD(disableNetworkType:(NSString *)name types:(NSInteger)adType) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal disableNetworkForAdType:AppodealAdTypeFromRNAAdType(adType) name:name];
    });
}

RCT_EXPORT_METHOD(disableLocationPermissionCheck) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setLocationTracking:NO];
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

RCT_EXPORT_METHOD(isAutocacheEnabled:(NSInteger)types callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isAutocacheEnabled:AppodealAdTypeFromRNAAdType(types)];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(isInitialized:(int)types callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isInitalizedForAdType:types];
        NSArray *params = @[
            @(result)
        ];
        callback(params);
    });
}

#pragma mark - Segments

RCT_EXPORT_METHOD(getRewardParameters:(NSString *)placementName callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSObject <APDReward> *reward = [Appodeal rewardForPlacement:placementName];
        NSArray *params = @[
            @(reward.amount),
            reward.currencyName ?: @""
        ];
        callback(params);
    });
}

RCT_EXPORT_METHOD(setSegmentFilter:(NSDictionary *)filter) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setSegmentFilter:filter];
    });
}

#pragma mark - Extras

RCT_EXPORT_METHOD(setExtras:(NSDictionary *)extras) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setExtras:extras];
    });
}

#pragma mark - User Data

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

RCT_EXPORT_METHOD(setGender:(AppodealUserGender)gender) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setUserGender:gender];
    });
}

RCT_EXPORT_METHOD(trackInAppPurchase:(double)amount currencyCode:(NSString *)currency) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [APDSdk.sharedSdk trackInAppPurchase:@(amount)
                                    currency:currency];
    });
}

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

#pragma mark - AppodealNonSkippableVideoDelegate

- (void)nonSkippableVideoDidLoadAdIsPrecache:(BOOL)precache {
    NSDictionary *params = @{
        @"isPrecache": @(precache)
    };
    [self sendEventWithName:kEventNonSkippableVideoLoaded body:params];
}

- (void)nonSkippableVideoDidFailToLoadAd {
    [self sendEventWithName:kEventNonSkippableVideoFailedToLoad body:nil];
}

- (void)nonSkippableVideoDidExpired {
    [self sendEventWithName:kEventNonSkippableVideoExpired body:nil];
}

- (void)nonSkippableVideoDidPresent {
    [self sendEventWithName:kEventNonSkippableVideoShown body:nil];
}

- (void)nonSkippableVideoDidFailToPresentWithError:(NSError *)error {
    [self sendEventWithName:kEventNonSkippableVideoFailedToPresent body:nil];
}

- (void)nonSkippableVideoWillDismissAndWasFullyWatched:(BOOL)wasFullyWatched {
    NSDictionary *params = @{
        @"fullyWatched": @(wasFullyWatched)
    };
    [self sendEventWithName:kEventNonSkippableVideoClosed body:params];
}

- (void)nonSkippableVideoDidFinish {
    [self sendEventWithName:kEventNonSkippableVideoFinished body:nil];
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

- (void)rewardedVideoWillDismissAndWasFullyWatched:(BOOL)wasFullyWatched {
    NSDictionary *params = @{
        @"fullyWatched": @(wasFullyWatched)
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

#pragma mark - STKConsentManagerDisplayDelegate

- (void)consentManagerWillShowDialog:(STKConsentManager *)consentManager {}

- (void)consentManagerDidDismissDialog:(STKConsentManager *)consentManager {
    self.consentCallback ? self.consentCallback(RNAppodealConsentParameters()) : nil;
    self.consentCallback = nil;
}

- (void)consentManager:(STKConsentManager *)consentManager didFailToPresent:(NSError *)error {
    self.consentCallback ? self.consentCallback(RNAppodealConsentParameters()) : nil;
    self.consentCallback = nil;
}

#pragma mark - Noop

RCT_EXPORT_METHOD(setTabletBanners:(BOOL)val) {}
RCT_EXPORT_METHOD(disableWriteExternalStoragePermissionCheck) {}
RCT_EXPORT_METHOD(requestAndroidMPermissions) {}
RCT_EXPORT_METHOD(muteVideosIfCallsMuted) {}
RCT_EXPORT_METHOD(showTestScreen) {}

@end
