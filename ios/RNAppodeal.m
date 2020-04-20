#import "RNAppodeal.h"
#import "RNADefines.h"
#import <React/RCTUtils.h>


@interface RNAppodeal () <AppodealBannerDelegate, AppodealInterstitialDelegate, AppodealRewardedVideoDelegate, AppodealNonSkippableVideoDelegate>

@property (nonatomic, strong) NSMutableDictionary <NSString *, id> *segmentRestrictions;

@end


@implementation RNAppodeal

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (NSMutableDictionary <NSString *, id> *)segmentRestrictions {
    if (!_segmentRestrictions) {
        _segmentRestrictions = [NSMutableDictionary new];
    }
    return _segmentRestrictions;
}

- (UIViewController *)rootViewController {
    return UIApplication.sharedApplication.keyWindow.rootViewController;
}

RCT_EXPORT_MODULE();

#pragma mark Method export

RCT_EXPORT_METHOD(initialize:(NSString *)appKey types:(NSInteger)adType consent:(BOOL)consent) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Appodeal setSegmentFilter:self.segmentRestrictions];
        [Appodeal setFramework:APDFrameworkReactNative version:RNAVersion()];
        
        [Appodeal setRewardedVideoDelegate:self];
        [Appodeal setNonSkippableVideoDelegate:self];
        [Appodeal setBannerDelegate:self];
        [Appodeal setInterstitialDelegate:self];
        
        [Appodeal initializeWithApiKey:appKey
                                 types:AppodealAdTypeFromRNAAdType(adType)
                            hasConsent:consent];
    });
}

RCT_EXPORT_METHOD(show:(int)showType placement:(NSString *)placement result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal showAd:AppodealShowStyleFromRNAAdType(showType)
                          forPlacement:placement
                    rootViewController:self.rootViewController];
        callback(@[@(result)]);
    });
}

RCT_EXPORT_METHOD(isLoaded:(int)showType result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isReadyForShowWithStyle:AppodealShowStyleFromRNAAdType(showType)];
        callback(@[@(result)]);
    });
}

RCT_EXPORT_METHOD(canShow:(NSInteger)showType placement:(NSString *)placement result:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal canShow:AppodealAdTypeFromRNAAdType(showType) forPlacement:placement];
        callback(@[@(result)]);
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
        callback(@[@(eCPM)]);
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
        callback(@[@(result)]);
    });
}

RCT_EXPORT_METHOD(predictedEcpm:(NSInteger)adType calls:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        double eCPM = [Appodeal predictedEcpmForAdType:AppodealAdTypeFromRNAAdType(adType)];
        callback(@[@(eCPM)]);
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
        callback(@[[Appodeal getVersion]]);
    });
}

RCT_EXPORT_METHOD(isAutocacheEnabled:(NSInteger)types callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isAutocacheEnabled:AppodealAdTypeFromRNAAdType(types)];
        callback(@[@(result)]);
    });
}

RCT_EXPORT_METHOD(isInitialized:(int)types callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result = [Appodeal isInitalizedForAdType:types];
        callback(@[@(result)]);
    });
}

#pragma mark Placement

RCT_EXPORT_METHOD(getRewardParameters:(NSString *)placementName callback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSObject <APDReward> *reward = [Appodeal rewardForPlacement:placementName];
        callback(@[ @(reward.amount), reward.currencyName ?: @"" ]);
    });
}

RCT_EXPORT_METHOD(setCustomDoubleRule:(NSString *)ruleName value:(double)value) {
    NSLock *lock = [NSLock new];
    [lock lock];
    self.segmentRestrictions[ruleName ?: @""] = @(value);
    [lock unlock];
}

RCT_EXPORT_METHOD(setCustomIntegerRule:(NSString *)ruleName value:(int)value) {
    NSLock *lock = [NSLock new];
    [lock lock];
    self.segmentRestrictions[ruleName ?: @""] = @(value);
    [lock unlock];
}

RCT_EXPORT_METHOD(setCustomStringRule:(NSString *)ruleName value:(NSString *)value) {
    NSLock *lock = [NSLock new];
    [lock lock];
    self.segmentRestrictions[ruleName ?: @""] = value;
    [lock unlock];
}

RCT_EXPORT_METHOD(setCustomBooleanRule:(NSString *)ruleName value:(BOOL)value) {
    NSLock *lock = [NSLock new];
    [lock lock];
    self.segmentRestrictions[ruleName ?: @""] = @(value);
    [lock unlock];
}

#pragma mark - User Data

RCT_EXPORT_METHOD(setUserId:(NSString *)userId) {
    [Appodeal setUserId:userId];
}

RCT_EXPORT_METHOD(setAge:(int)age) {
    [Appodeal setUserAge:age];
}

RCT_EXPORT_METHOD(setGender:(AppodealUserGender)gender) {
    [Appodeal setUserGender:gender];
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

- (void)bannerDidShow {
    [self sendEventWithName:kEventBannerShown body:nil];
}

- (void)bannerDidLoadAdIsPrecache:(BOOL)precache {
    [self sendEventWithName:kEventBannerLoaded body:@{@"isPrecache": @(precache)}];
}

- (void)bannerDidFailToLoadAd; {
    [self sendEventWithName:kEventBannerFailedToLoad body:nil];
}

- (void)bannerDidClick {
    [self sendEventWithName:kEventBannerClicked body:nil];
}

#pragma mark - AppodealInterstitialDelegate

- (void)interstitialDidLoadAdIsPrecache:(BOOL)precache {
    [self sendEventWithName:kEventInterstitialLoaded body:@{@"isPrecache": @(precache)}];
}

- (void)interstitialDidFailToLoadAd {
    [self sendEventWithName:kEventInterstitialFailedToLoad body:nil];
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
    [self sendEventWithName:kEventNonSkippableVideoLoaded body:@{@"isPrecache": @(precache)}];
}

- (void)nonSkippableVideoDidFailToLoadAd {
    [self sendEventWithName:kEventNonSkippableVideoFailedToLoad body:nil];
}

- (void)nonSkippableVideoDidPresent {
    [self sendEventWithName:kEventNonSkippableVideoShown body:nil];
}

- (void)nonSkippableVideoDidFailToPresentWithError:(NSError *)error {
    [self sendEventWithName:kEventNonSkippableVideoFailedToPresent body:nil];
}

- (void)nonSkippableVideoWillDismissAndWasFullyWatched:(BOOL)wasFullyWatched {
    [self sendEventWithName:kEventNonSkippableVideoClosed body:@{@"fullyWatched": @(wasFullyWatched)}];
}

- (void)nonSkippableVideoDidFinish {
    [self sendEventWithName:kEventNonSkippableVideoFinished body:nil];
}

#pragma mark - AppodealRewardedVideoDelegate

- (void)rewardedVideoDidLoadAdIsPrecache:(BOOL)precache {
    [self sendEventWithName:kEventRewardedVideoLoaded body:@{@"isPrecache": @(precache)}];
}

- (void)rewardedVideoDidFailToLoadAd {
    [self sendEventWithName:kEventRewardedVideoFailedToLoad body:nil];
}

- (void)rewardedVideoDidFailToPresentWithError:(NSError *)error {
    [self sendEventWithName:kEventRewardedVideoFailedToPresent body:nil];
}

- (void)rewardedVideoDidPresent {
    [self sendEventWithName:kEventRewardedVideoShown body:nil];
}

- (void)rewardedVideoWillDismissAndWasFullyWatched:(BOOL)wasFullyWatched {
    [self sendEventWithName:kEventRewardedVideoClosed body:@{@"fullyWatched": @(wasFullyWatched)}];
}

- (void)rewardedVideoDidFinish:(float)rewardAmount name:(NSString *)rewardName {
    [self sendEventWithName:kEventRewardedVideoFinished body:@{@"amount":@(rewardAmount), @"name": rewardName ?: @""}];
}

#pragma mark - Noop

RCT_EXPORT_METHOD(setTabletBanners:(BOOL)val) {}
RCT_EXPORT_METHOD(disableWriteExternalStoragePermissionCheck) {}
RCT_EXPORT_METHOD(requestAndroidMPermissions) {}
RCT_EXPORT_METHOD(muteVideosIfCallsMuted) {}
RCT_EXPORT_METHOD(showTestScreen) {}
RCT_EXPORT_METHOD(setOnLoadedTriggerBoth:(int)adType enabled:(BOOL)val) {}

@end
