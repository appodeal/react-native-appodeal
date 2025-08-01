#import "RNAppodeal.h"
#import "RNADefines.h"
#import "RNAEventDispatcher.h"
#import <React/RCTUtils.h>
#import <StackConsentManager/StackConsentManager-Swift.h>

BOOL kAPDCOPPA = NO;

@implementation RNAppodeal

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

+ (RNAppodeal *)shared {
    static RNAppodeal *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[RNAppodeal alloc] init];
    });
    return sharedInstance;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;
    [RNAEventDispatcher sharedDispatcher].bridge = bridge;
}

- (RCTBridge *)bridge {
    return _bridge;
}

- (void)invalidate {
    [[RNAEventDispatcher sharedDispatcher] reset];
}

#pragma mark - Core SDK Methods

- (void)initializeWithAppKey:(NSString *)appKey
                     adTypes:(double)adTypes
               pluginVersion:(NSString *)pluginVersion {
    [Appodeal setFramework:APDFrameworkReactNative version:pluginVersion];
    
    [Appodeal setRewardedVideoDelegate:self];
    [Appodeal setBannerDelegate:self];
    [Appodeal setInterstitialDelegate:self];
    [Appodeal setInitializationDelegate:self];
    [Appodeal setAdRevenueDelegate:self];
    
    [Appodeal initializeWithApiKey:appKey
                             types:AppodealAdTypeFromRNAAdType(adTypes)];
}

#ifndef RCT_NEW_ARCH_ENABLED

#pragma mark - Old Architecture Methods (RCT_EXPORT_METHOD)

RCT_EXPORT_METHOD(initialize:(nonnull NSString *)appKey
                  adTypes:(double)adTypes
                  pluginVersion:(NSString *)pluginVersion) {
    [self initializeWithAppKey:appKey adTypes:adTypes pluginVersion:pluginVersion];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isInitialized:(double)adTypes) {
    return @([Appodeal isInitializedForAdType:AppodealAdTypeFromRNAAdType(adTypes)]);
}

RCT_EXPORT_METHOD(show:(double)showType
                  placement:(NSString *)placement) {
    [Appodeal showAd:AppodealShowStyleFromRNAAdType(showType)
        forPlacement:placement
  rootViewController:RCTPresentedViewController()];
}

RCT_EXPORT_METHOD(isLoaded:(double)showType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    BOOL isLoaded = [Appodeal isReadyForShowWithStyle:AppodealShowStyleFromRNAAdType(showType)];
    resolve(@(isLoaded));
}

RCT_EXPORT_METHOD(canShow:(double)showType
                  placement:(NSString *)placement
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    BOOL canShow = [Appodeal canShow:AppodealAdTypeFromRNAAdType(showType)
                        forPlacement:placement];
    resolve(@(canShow));
}

RCT_EXPORT_METHOD(cache:(double)adType) {
    [Appodeal cacheAd:AppodealAdTypeFromRNAAdType(adType)];
}

RCT_EXPORT_METHOD(hide:(double)adType) {
    [Appodeal hideBanner];
}

RCT_EXPORT_METHOD(setAutoCache:(double)adType
                  value:(BOOL)value) {
    [Appodeal setAutocache:value types:AppodealAdTypeFromRNAAdType(adType)];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isPrecache:(double)adType) {
    return @([Appodeal isPrecacheAd:AppodealAdTypeFromRNAAdType(adType)]);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(canShow:(double)showType
                                       placement:(NSString *)placement) {
    BOOL canShow = [Appodeal canShow:AppodealAdTypeFromRNAAdType(showType)
                        forPlacement:placement];
    return @(canShow);
}

#pragma mark - Banner Settings

RCT_EXPORT_METHOD(setTabletBanners:(BOOL)value) {
    APDUnitSize size = value ? kAppodealUnitSize_728x90 : kAppodealUnitSize_320x50;
    [Appodeal setPreferredBannerAdSize:size];
}

RCT_EXPORT_METHOD(setSmartBanners:(BOOL)value) {
    [Appodeal setSmartBannersEnabled:value];
}

RCT_EXPORT_METHOD(setBannerAnimation:(BOOL)value) {
    [Appodeal setBannerAnimationEnabled:value];
}

#pragma mark - Configuration

RCT_EXPORT_METHOD(setChildDirectedTreatment:(BOOL)value) {
    kAPDCOPPA = value;
    [Appodeal setChildDirectedTreatment:value];
}

RCT_EXPORT_METHOD(setTesting:(BOOL)value) {
    [Appodeal setTestingEnabled:value];
}

RCT_EXPORT_METHOD(setLogLevel:(NSString *)value) {
    APDLogLevel logLevel = APDLogLevelInfo;
    if ([value isEqualToString:@"debug"]) {
        logLevel = APDLogLevelDebug;
    } else if ([value isEqualToString:@"verbose"]) {
        logLevel = APDLogLevelVerbose;
    } else if ([value isEqualToString:@"off"]) {
        logLevel = APDLogLevelOff;
    }
    [Appodeal setLogLevel:logLevel];
}

RCT_EXPORT_METHOD(setTriggerPrecacheCallbacks:(double)adTypes
                  value:(BOOL)value) {
    [Appodeal setTriggerPrecacheCallbacks:value types:AppodealAdTypeFromRNAAdType(adTypes)];
}

RCT_EXPORT_METHOD(disableNetwork:(NSString *)network
                  adTypes:(double)adTypes) {
    [Appodeal disableNetworkForAdType:AppodealAdTypeFromRNAAdType(adTypes) name:network];
}

#pragma mark - SDK Info

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPlatformSdkVersion) {
    return [Appodeal getVersion];
}

#pragma mark - User Management

RCT_EXPORT_METHOD(setUserId:(NSString *)id) {
    [Appodeal setUserId:id];
}

#pragma mark - Extras and Custom State

RCT_EXPORT_METHOD(setExtrasStringValue:(NSString *)key
                  value:(NSString *)value) {
    [Appodeal setExtrasValue:value forKey:key];
}

RCT_EXPORT_METHOD(setExtrasIntegerValue:(NSString *)key
                  value:(double)value) {
    [Appodeal setExtrasValue:@(value) forKey:key];
}

RCT_EXPORT_METHOD(setExtrasDoubleValue:(NSString *)key
                  value:(double)value) {
    [Appodeal setExtrasValue:@(value) forKey:key];
}

RCT_EXPORT_METHOD(setExtrasBooleanValue:(NSString *)key
                  value:(BOOL)value) {
    [Appodeal setExtrasValue:@(value) forKey:key];
}

RCT_EXPORT_METHOD(setExtrasMapValue:(NSString *)key
                  value:(NSDictionary *)value) {
    [Appodeal setExtrasValue:value forKey:key];
}

RCT_EXPORT_METHOD(removeExtrasValue:(NSString *)key) {
    [Appodeal setExtrasValue:nil forKey:key];
}

RCT_EXPORT_METHOD(setCustomStateStringValue:(NSString *)key
                  value:(NSString *)value) {
    [Appodeal setCustomStateValue:value forKey:key];
}

RCT_EXPORT_METHOD(setCustomStateIntegerValue:(NSString *)key
                  value:(double)value) {
    [Appodeal setCustomStateValue:@(value) forKey:key];
}

RCT_EXPORT_METHOD(setCustomStateDoubleValue:(NSString *)key
                  value:(double)value) {
    [Appodeal setCustomStateValue:@(value) forKey:key];
}

RCT_EXPORT_METHOD(setCustomStateBooleanValue:(NSString *)key
                  value:(BOOL)value) {
    [Appodeal setCustomStateValue:@(value) forKey:key];
}

RCT_EXPORT_METHOD(setCustomStateMapValue:(NSString *)key
                  value:(NSDictionary *)value) {
    [Appodeal setCustomStateValue:value forKey:key];
}

RCT_EXPORT_METHOD(removeCustomStateValue:(NSString *)key) {
    [Appodeal setCustomStateValue:nil forKey:key];
}

#pragma mark - Rewards

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRewardParameters:(NSString *)placement) {
    id <APDReward> reward = [Appodeal rewardForPlacement:placement];
    if (reward) {
        return @{
            @"name": reward.currencyName ?: @"",
            @"amount": [NSString stringWithFormat:@"%f", reward.amount]
        };
    }
    return @{
        @"name": @"",
        @"amount": @"0"
    };
}

#pragma mark - Analytics

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(predictedEcpm:(double)adType) {
    return @([Appodeal predictedEcpmForAdType:AppodealAdTypeFromRNAAdType(adType)]);
}

RCT_EXPORT_METHOD(trackInAppPurchase:(double)amount
                  currency:(NSString *)currency) {
    [Appodeal trackInAppPurchase:@(amount) currency:currency];
}

RCT_EXPORT_METHOD(validateAndTrackInAppPurchase:(NSDictionary *)purchase
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    [Appodeal validateAndTrackInAppPurchase:purchase[@"productId"]
                                       type:APDPurchaseTypeFromRNPurchase([purchase[@"productType"] intValue])
                                      price:purchase[@"price"]
                                   currency:purchase[@"currency"]
                              transactionId:purchase[@"transactionId"]
                       additionalParameters:purchase[@"additionalParameters"]
                                    success:^(NSDictionary *response) {
        resolve(response ?: @{});
    }
                                    failure:^(NSError *error) {
        reject(@"APD_VALIDATE_PURCHASE_ERROR", error.localizedDescription, error);
    }];
}

RCT_EXPORT_METHOD(trackEvent:(NSString *)name
                  parameters:(NSDictionary *)parameters) {
    [Appodeal trackEvent:name customParameters:parameters];
}

#pragma mark - Consent Management

RCT_EXPORT_METHOD(revokeConsent) {
    [APDConsentManager.shared revoke];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(consentStatus) {
    return RNAppodealConsentStatusFrom(APDConsentManager.shared.status);
}

RCT_EXPORT_METHOD(requestConsentInfoUpdateWithAppKey:(NSString *)appKey
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    APDConsentUpdateRequestParameters *parameters = [[APDConsentUpdateRequestParameters alloc] initWithAppKey:appKey
                                                                                             mediationSdkName:@"appodeal"
                                                                                          mediationSdkVersion:[Appodeal getVersion]
                                                                                                        COPPA:kAPDCOPPA];
    [APDConsentManager.shared requestConsentInfoUpdateWithParameters:parameters
                                                          completion:^(NSError *error) {
        if (error != nil) {
            reject(@"APD_REQUEST_CONSENT_INFO_UPDATE_ERROR", error.localizedDescription, error);
        } else {
            NSDictionary *parameters = @{
                @"status": RNAppodealConsentStatusFrom(APDConsentManager.shared.status)
            };
            resolve(parameters);
        }
    }];
}

RCT_EXPORT_METHOD(showConsentFormIfNeeded:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    [APDConsentManager.shared loadAndPresentIfNeededWithRootViewController:RCTPresentedViewController()
                                                                completion:^(NSError *error) {
        if (error != nil) {
            reject(@"APD_SHOW_CONSENT_FORM_IF_NEEDED_ERROR", error.localizedDescription, error);
        } else {
            NSDictionary *parameters = @{
                @"status": RNAppodealConsentStatusFrom(APDConsentManager.shared.status)
            };
            resolve(parameters);
        }
    }];
}

RCT_EXPORT_METHOD(showConsentForm:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    [APDConsentManager.shared loadWithCompletion:^(APDConsentDialog *dialog, NSError *error) {
        if (error != nil) {
            reject(@"APD_SHOW_CONSENT_FORM_ERROR", error.localizedDescription, error);
        } else {
            [dialog presentWithRootViewController:RCTPresentedViewController() completion:^(NSError *error) {
                if (error != nil) {
                    reject(@"APD_SHOW_CONSENT_FORM_ERROR", error.localizedDescription, error);
                } else {
                    NSDictionary *parameters = @{
                        @"status": RNAppodealConsentStatusFrom(APDConsentManager.shared.status)
                    };
                    resolve(parameters);
                }
            }];
        }
    }];
}

#pragma mark - Self-Hosted Bidon Configuration

RCT_EXPORT_METHOD(setBidonEndpoint:(NSString *)endpoint) {
    [Appodeal setBidonEndpoint:endpoint];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBidonEndpoint) {
    return [Appodeal getBidonEndpoint];
}

#pragma mark - Event Management

RCT_EXPORT_METHOD(eventsNotifyReady:(BOOL)ready) {
    [[RNAEventDispatcher sharedDispatcher] initializeWithReadyState:ready];
}

RCT_EXPORT_METHOD(eventsAddListener:(NSString *)eventName) {
    [[RNAEventDispatcher sharedDispatcher] registerListener:eventName];
}

RCT_EXPORT_METHOD(eventsRemoveListener:(NSString *)eventName all:(BOOL)all) {
    [[RNAEventDispatcher sharedDispatcher] unregisterListener:eventName removeAll:all];
}

RCT_EXPORT_METHOD(eventsGetListeners:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    resolve([[RNAEventDispatcher sharedDispatcher] diagnostics]);
}

#pragma mark - Required for RN Event Emitter

RCT_EXPORT_METHOD(addListener:(NSString *)eventName) {
    // Keep: Required for RN built in Event Emitter Calls.
}

RCT_EXPORT_METHOD(removeListeners:(NSInteger)count) {
    // Keep: Required for RN built in Event Emitter Calls.
}

#pragma mark - Noop

RCT_EXPORT_METHOD(setSharedAdsInstanceAcrossActivities:(BOOL)flag) {}

#endif

#ifdef RCT_NEW_ARCH_ENABLED

#pragma mark - New Architecture Methods (Turbo Module)

- (void)initialize:(NSString *)appKey
            adTypes:(double)adTypes
      pluginVersion:(NSString *)pluginVersion {
    [self initializeWithAppKey:appKey adTypes:adTypes pluginVersion:pluginVersion];
}

- (NSNumber *)isInitialized:(double)adTypes {
    return @([Appodeal isInitializedForAdType:AppodealAdTypeFromRNAAdType(adTypes)]);
}

- (void)show:(double)adTypes
   placement:(NSString *)placement {
    [Appodeal showAd:AppodealShowStyleFromRNAAdType(adTypes)
        forPlacement:placement
  rootViewController:RCTPresentedViewController()];
}

- (NSNumber *)isLoaded:(double)showType {
    BOOL isLoaded = [Appodeal isReadyForShowWithStyle:AppodealShowStyleFromRNAAdType(showType)];
    return @(isLoaded);
}

- (NSNumber *)canShow:(double)showType
            placement:(NSString *)placement {
    BOOL canShow = [Appodeal canShow:AppodealAdTypeFromRNAAdType(showType)
                        forPlacement:placement];
    return @(canShow);
}

- (void)cache:(double)adTypes {
    [Appodeal cacheAd:AppodealAdTypeFromRNAAdType(adTypes)];
}

- (void)hide:(double)adTypes {
    [Appodeal hideBanner];
}

- (void)setAutoCache:(double)adTypes
               value:(BOOL)value {
    [Appodeal setAutocache:value types:AppodealAdTypeFromRNAAdType(adTypes)];
}

- (NSNumber *)isPrecache:(double)adTypes {
    return @([Appodeal isPrecacheAd:AppodealAdTypeFromRNAAdType(adTypes)]);
}

#pragma mark - Banner Settings

- (void)setTabletBanners:(BOOL)value {
    APDUnitSize size = value ? kAppodealUnitSize_728x90 : kAppodealUnitSize_320x50;
    [Appodeal setPreferredBannerAdSize:size];
}

- (void)setSmartBanners:(BOOL)value {
    [Appodeal setSmartBannersEnabled:value];
}

- (void)setBannerAnimation:(BOOL)value {
    [Appodeal setBannerAnimationEnabled:value];
}

#pragma mark - Configuration

- (void)setChildDirectedTreatment:(BOOL)value {
    kAPDCOPPA = value;
    [Appodeal setChildDirectedTreatment:value];
}

- (void)setTesting:(BOOL)value {
    [Appodeal setTestingEnabled:value];
}

- (void)setLogLevel:(NSString *)value {
    APDLogLevel logLevel = APDLogLevelInfo;
    if ([value isEqualToString:@"debug"]) {
        logLevel = APDLogLevelDebug;
    } else if ([value isEqualToString:@"verbose"]) {
        logLevel = APDLogLevelVerbose;
    } else if ([value isEqualToString:@"off"]) {
        logLevel = APDLogLevelOff;
    }
    [Appodeal setLogLevel:logLevel];
}

- (void)setTriggerPrecacheCallbacks:(double)adTypes
                              value:(BOOL)value {
    [Appodeal setTriggerPrecacheCallbacks:value types:AppodealAdTypeFromRNAAdType(adTypes)];
}

- (void)disableNetwork:(NSString *)network
               adTypes:(double)adTypes {
    [Appodeal disableNetworkForAdType:AppodealAdTypeFromRNAAdType(adTypes) name:network];
}

#pragma mark - SDK Info

- (NSString *)getPlatformSdkVersion {
    return [Appodeal getVersion];
}

#pragma mark - User Management

- (void)setUserId:(NSString *)id {
    [Appodeal setUserId:id];
}

#pragma mark - Extras and Custom State

- (void)setExtrasStringValue:(NSString *)key
                       value:(NSString *)value {
    [Appodeal setExtrasValue:value forKey:key];
}

- (void)setExtrasIntegerValue:(NSString *)key
                        value:(double)value {
    [Appodeal setExtrasValue:@(value) forKey:key];
}

- (void)setExtrasDoubleValue:(NSString *)key
                       value:(double)value {
    [Appodeal setExtrasValue:@(value) forKey:key];
}

- (void)setExtrasBooleanValue:(NSString *)key
                        value:(BOOL)value {
    [Appodeal setExtrasValue:@(value) forKey:key];
}

- (void)setExtrasMapValue:(NSString *)key
                     value:(NSDictionary *)value {
    [Appodeal setExtrasValue:value forKey:key];
}

- (void)removeExtrasValue:(NSString *)key {
    [Appodeal setExtrasValue:nil forKey:key];
}

- (void)setCustomStateStringValue:(NSString *)key
                            value:(NSString *)value {
    [Appodeal setCustomStateValue:value forKey:key];
}

- (void)setCustomStateIntegerValue:(NSString *)key
                             value:(double)value {
    [Appodeal setCustomStateValue:@(value) forKey:key];
}

- (void)setCustomStateDoubleValue:(NSString *)key
                            value:(double)value {
    [Appodeal setCustomStateValue:@(value) forKey:key];
}

- (void)setCustomStateBooleanValue:(NSString *)key
                             value:(BOOL)value {
    [Appodeal setCustomStateValue:@(value) forKey:key];
}

- (void)setCustomStateMapValue:(NSString *)key
                         value:(NSDictionary *)value {
    [Appodeal setCustomStateValue:value forKey:key];
}

- (void)removeCustomStateValue:(NSString *)key {
    [Appodeal setCustomStateValue:nil forKey:key];
}

#pragma mark - Rewards

- (NSDictionary *)getRewardParameters:(NSString *)placement {
    id <APDReward> reward = [Appodeal rewardForPlacement:placement];
    if (reward) {
        return @{
            @"name": reward.currencyName ?: @"",
            @"amount": [NSString stringWithFormat:@"%f", reward.amount]
        };
    }
    return @{
        @"name": @"",
        @"amount": @"0"
    };
}

#pragma mark - Analytics

- (NSNumber *)predictedEcpm:(double)adType {
    return @([Appodeal predictedEcpmForAdType:AppodealAdTypeFromRNAAdType(adType)]);
}

- (void)trackInAppPurchase:(double)amount
                    currency:(NSString *)currency {
    [Appodeal trackInAppPurchase:@(amount) currency:currency];
}

- (void)validateAndTrackInAppPurchase:(NSDictionary *)purchase
                              resolve:(RCTPromiseResolveBlock)resolve
                               reject:(RCTPromiseRejectBlock)reject {
    [Appodeal validateAndTrackInAppPurchase:purchase[@"productId"]
                                       type:APDPurchaseTypeFromRNPurchase([purchase[@"productType"] intValue])
                                      price:purchase[@"price"]
                                   currency:purchase[@"currency"]
                              transactionId:purchase[@"transactionId"]
                       additionalParameters:purchase[@"additionalParameters"]
                                    success:^(NSDictionary *response) {
        resolve(response ?: @{});
    }
                                    failure:^(NSError *error) {
        reject(@"APD_VALIDATE_PURCHASE_ERROR", error.localizedDescription, error);
    }];
}

- (void)trackEvent:(NSString *)name
        parameters:(NSDictionary *)parameters {
    [Appodeal trackEvent:name customParameters:parameters];
}

#pragma mark - Consent Management

- (void)revokeConsent {
    [APDConsentManager.shared revoke];
}

- (NSNumber *)consentStatus {
    return RNAppodealConsentStatusFrom(APDConsentManager.shared.status);
}

- (void)requestConsentInfoUpdateWithAppKey:(NSString *)appKey
                                   resolve:(RCTPromiseResolveBlock)resolve
                                    reject:(RCTPromiseRejectBlock)reject {
    APDConsentUpdateRequestParameters *parameters = [[APDConsentUpdateRequestParameters alloc] initWithAppKey:appKey
                                                                                             mediationSdkName:@"appodeal"
                                                                                          mediationSdkVersion:[Appodeal getVersion]
                                                                                                        COPPA:kAPDCOPPA];
    [APDConsentManager.shared requestConsentInfoUpdateWithParameters:parameters
                                                          completion:^(NSError *error) {
        if (error != nil) {
            reject(@"APD_REQUEST_CONSENT_INFO_UPDATE_ERROR", error.localizedDescription, error);
        } else {
            NSDictionary *parameters = @{
                @"status": RNAppodealConsentStatusFrom(APDConsentManager.shared.status)
            };
            resolve(parameters);
        }
    }];
}

- (void)showConsentFormIfNeeded:(RCTPromiseResolveBlock)resolve
                          reject:(RCTPromiseRejectBlock)reject {
    [APDConsentManager.shared loadAndPresentIfNeededWithRootViewController:RCTPresentedViewController()
                                                                completion:^(NSError *error) {
        if (error != nil) {
            reject(@"APD_SHOW_CONSENT_FORM_IF_NEEDED_ERROR", error.localizedDescription, error);
        } else {
            NSDictionary *parameters = @{
                @"status": RNAppodealConsentStatusFrom(APDConsentManager.shared.status)
            };
            resolve(parameters);
        }
    }];
}

- (void)showConsentForm:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
    [APDConsentManager.shared loadWithCompletion:^(APDConsentDialog *dialog, NSError *error) {
        if (error != nil) {
            reject(@"APD_SHOW_CONSENT_FORM_ERROR", error.localizedDescription, error);
        } else {
            [dialog presentWithRootViewController:RCTPresentedViewController() completion:^(NSError *error) {
                if (error != nil) {
                    reject(@"APD_SHOW_CONSENT_FORM_ERROR", error.localizedDescription, error);
                } else {
                    NSDictionary *parameters = @{
                        @"status": RNAppodealConsentStatusFrom(APDConsentManager.shared.status)
                    };
                    resolve(parameters);
                }
            }];
        }
    }];
}

#pragma mark - Self-Hosted Bidon Configuration

- (void)setBidonEndpoint:(NSString *)endpoint {
    [Appodeal setBidonEndpoint:endpoint];
}

- (NSString *)getBidonEndpoint {
    return [Appodeal getBidonEndpoint];
}

#pragma mark - Event Management

- (void)eventsNotifyReady:(BOOL)ready {
    [[RNAEventDispatcher sharedDispatcher] initializeWithReadyState:ready];
}

- (void)eventsAddListener:(NSString *)eventName {
    [[RNAEventDispatcher sharedDispatcher] registerListener:eventName];
}

- (void)eventsRemoveListener:(NSString *)eventName all:(BOOL)all {
    [[RNAEventDispatcher sharedDispatcher] unregisterListener:eventName removeAll:all];
}

- (void)eventsGetListeners:(RCTPromiseResolveBlock)resolve
                    reject:(RCTPromiseRejectBlock)reject {
    resolve([[RNAEventDispatcher sharedDispatcher] diagnostics]);
}

#pragma mark - Noop

- (void)setSharedAdsInstanceAcrossActivities:(BOOL)flag {}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAppodealModuleSpecJSI>(params);
}

#endif

#pragma mark - Event System Helper

- (void)sendEventWithName:(NSString *)eventName body:(id)body {
    // Determine event priority based on event type
    RNAEventPriority priority = RNAEventPriorityNormal;
    
    if ([eventName containsString:@"Failed"] || [eventName containsString:@"Error"]) {
        priority = RNAEventPriorityHigh; // High priority for failures
    } else if ([eventName isEqualToString:kEventAppodealInitialized] || 
               [eventName isEqualToString:kEventAppodealDidReceiveRevenue]) {
        priority = RNAEventPriorityCritical; // Critical priority for init and revenue
    } else if ([eventName containsString:@"Loaded"] || [eventName containsString:@"Shown"]) {
        priority = RNAEventPriorityHigh; // High priority for loaded/shown events
    }
    
    [[RNAEventDispatcher sharedDispatcher] dispatchEvent:eventName payload:body priority:priority];
}

#pragma mark - Banner Ad Delegate Callbacks

- (void)bannerDidLoadAdIsPrecache:(BOOL)precache {
    NSDictionary *params = @{
        @"isPrecache": @(precache),
        @"height": @(CGRectGetHeight(Appodeal.banner.frame))
    };
    [self sendEventWithName:kEventBannerLoaded body:params];
}

- (void)bannerDidFailToLoadAd {
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

#pragma mark - Interstitial Ad Delegate Callbacks

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

#pragma mark - Rewarded Video Ad Delegate Callbacks

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
    [self sendEventWithName:kEventRewardedVideoClicked body:nil];
}

- (void)rewardedVideoWillDismissAndWasFullyWatched:(BOOL)wasFullyWatched {
    NSDictionary *params = @{
        @"isFinished": @(wasFullyWatched)
    };
    [self sendEventWithName:kEventRewardedVideoClosed body:params];
}

- (void)rewardedVideoDidFinish:(float)rewardAmount name:(NSString *)rewardName {
    NSMutableDictionary *params = [NSMutableDictionary dictionaryWithCapacity:2];
    params[@"amount"] = @(rewardAmount);
    params[@"currency"] = rewardName ?: @"";
    
    [self sendEventWithName:kEventRewardedVideoFinished body:params];
}

#pragma mark - SDK Initialization Delegate Callbacks

- (void)appodealSDKDidInitialize {
    NSLog(@"RNAppodeal: SDK initialized, sending event: %@", kEventAppodealInitialized);
    [self sendEventWithName:kEventAppodealInitialized body:nil];
}

#pragma mark - Ad Revenue Delegate Callbacks

- (void)didReceiveRevenueForAd:(id<AppodealAdRevenue>)ad {
    NSMutableDictionary *params = [NSMutableDictionary new];
    params[@"networkName"] = ad.networkName;
    params[@"adUnitName"] = ad.adUnitName;
    params[@"placement"] = ad.placement;
    params[@"revenuePrecision"] = ad.revenuePrecision;
    params[@"demandSource"] = ad.demandSource;
    params[@"currency"] = ad.currency;
    params[@"revenue"] = @(ad.revenue);
    params[@"adType"] = @(RNAAdTypeFromaAppodealAdType(ad.adType));
    
    [self sendEventWithName:kEventAppodealDidReceiveRevenue body:params];
}

@end 