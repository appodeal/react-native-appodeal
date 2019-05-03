//
//  Appodeal.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright (c) 2017 Appodeal, Inc. All rights reserved.
//


#define ADVANCED_INTEGRATION 1

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <Appodeal/AppodealBannerView.h>
#import <Appodeal/APDDefines.h>
#import <Appodeal/APDSdk.h>

#import <Appodeal/APDInterstitialAd.h>
#import <Appodeal/APDRewardProtocol.h>
#import <Appodeal/APDSkippableVideo.h>
#import <Appodeal/APDRewardedVideo.h>

#import <Appodeal/APDMRECView.h>
#import <Appodeal/APDBannerView.h>

#import <Appodeal/APDNativeAdLoader.h>
#import <Appodeal/APDNativeAdQueue.h>
#import <Appodeal/APDNativeAd.h>
#import <Appodeal/APDImage.h>
#import <Appodeal/APDMediaView.h>

#ifdef ADVANCED_INTEGRATION
#import <Appodeal/AppodealRequestDelegateProtocol.h>
#endif
/*!
 *  Appdoeal ads SDK
 */
@interface Appodeal : NSObject

+ (instancetype)alloc NS_UNAVAILABLE;
- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

/*!
 *  To disable a network use this method
 *  @warning Use method before initialization!
 *  @discussion Objective-C
 *  @code [Appodeal disableNetworkForAdType:AppodealAdTypeInterstitial name:@"YOUR_NETWORK_NAME"]; @endcode
 *  @discussion Swift
 *  @code Appodeal.disableNetworkForAdType(AppodealAdType.Interstitial, name: "YOUR") @endcode
 *  @param adType      AppodealAdTypeInterstitial, AppodealAdTypeBanner, AppodealAdTypeNativeAd, AppodealAdTypeRewardedVideo, AppodealAdTypeMREC, AppodealAdTypeNonSkippableVideo
 *  @param networkName Use network name
 */
+ (void)disableNetworkForAdType:(AppodealAdType)adType name:(NSString *)networkName __attribute__((deprecated("Now you can delete network in segments settings on Appodeal Dashboard")));

/*!
 *  @discussion To disable location check, use this method (deprecated), use setLocationTracking:
 *  @discussion Objective-C
 *  @code [Appodeal disableLocationPermissionCheck]; @endcode
 *  @discussion Swift
 *  @code Appodeal.disableLocationPermissionCheck() @endcode
 */
+ (void)disableLocationPermissionCheck __attribute__((deprecated("use method setLocationTracking:")));

/*!
 *  @discussion To disable location check, use this method
 *  @discussion Use method before initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setLocationTracking:YES]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setLocationTracking(true) @endcode
 *  @param enabled Set flag NO if you have disabled locationTracking, and YES that enabled
 */
+ (void)setLocationTracking:(BOOL)enabled;

/*!
 *  @discussion Enable/disable autocache
 *  @discussion Use method before initialization!
 *  @discussion After initializing the SDK, start caching ads of those types that were enabled as autocache
 *  Default autocache enabled for AppodealAdTypeInterstitial, AppodealAdTypeRewardedVideo or AppodealAdTypeNonSkippableVideo
 *  Also you can do something like this to disable autocache:
 *  @discussion Objective-C
 *  @code
        [Appodeal setAutocache: NO types: AppodealAdTypeInterstitial | AppodealAdTypeRewardedVideo]
 *  @endcode
 *  @discussion Swift
 *  @code Appodeal.setAutocache(false, types: AppodealAdType.Interstitial) @endcode
 *  @param autocache Bolean flag
 *  @param types     AppodealAdTypeRewardedVideo or AppodealAdTypeNonSkippableVideo, AppodealAdTypeInterstitial, AppodealAdTypeSkippableVideo
 */
+ (void)setAutocache:(BOOL)autocache types:(AppodealAdType)types;

/*!
 *  @discussion Get autocache enablement
 *  @discussion after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal isAutocacheEnabled:AppodealAdTypeInterstitial]; @endcode
 *  @discussion Swift
 *  @code Appodeal.isAutocacheEnabled(AppodealAdType.Interstitial) @endcode
 *  @param types AppodealAdTypeRewardedVideo, AppodealAdTypeInterstitial, AppodealAdTypeSkippableVideo
 *
 *  @return If enabled return YES or NO if not
 */
+ (BOOL)isAutocacheEnabled:(AppodealAdType)types;

/*!
 *  @discussion Initialize method. To initialize Appodeal with several types you
 *  @discussion can do something like this:
 *  @discussion Objective-C
 *  @code [Appodeal initializeWithApiKey:YOUR_API_KEY types: AppodealAdTypeInterstitial | AppodealAdTypeRewardedVideo]; @endcode
 *  @discussion Swift
 *  @code
        let adTypes: AppodealAdType = [.banner, .interstitial]
        Appodeal.initialize(withApiKey: "API_KEY", types: adTypes) @endcode
 *  @param apiKey Your api key from Appodeal Dashboard
 *  @param types  Appodeal ad type
 */
+ (void)initializeWithApiKey:(NSString *)apiKey types:(AppodealAdType)types;

+ (void)deinitialize NS_UNAVAILABLE;

/*!
 *  @discussion Get that SDK initialized
 *  @discussion Use method after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal isInitalized]; @endcode
 *  @discussion Swift
 *  @code Appodeal.isInitalized() @endcode
 *  @return YES if sdk initialized or NO if not
 */
+ (BOOL)isInitalized;

/*!
 *  Appodeal supports multiple log levels for internal logging,
 *  and ONLY one (VERBOSE) log level for third party ad networks.
 *  To enable third party ad networks logging, set log level to APDLogLevelVerbose.
 *  If log level other than APDLogLevelVerbose, all third party ad networks logging will be suppressed (if possible).
 *
 *  @param logLevel APDLogLevel value
 */
+ (void)setLogLevel:(APDLogLevel)logLevel;

/*!
 *  @discussion Set framework type before initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setFramework:APDFrameworkNative]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setFramework(APDFramework.native) @endcode
 *  @param framework Framework type, default is iOS Native SDK
 */
+ (void)setFramework:(APDFramework)framework;

/*!
 *  @discussion Set plugin version use before initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setPluginVersion:@"1.0.0"]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setPluginVersion("1.0.0") @endcode
 *  @param pluginVersion -  NSString value, default nil
 */
+ (void)setPluginVersion:(NSString *)pluginVersion;

/*!
 *  @discussion Set interstitial delegate to get callbacks
 *  @discussion Use method before or after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setInterstitialDelegate:self]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setInterstitialDelegate(self) @endcode
 *  @param interstitialDelegate Object that implement AppodealInterstitialDelegate protocol
 */
+ (void)setInterstitialDelegate:(id<AppodealInterstitialDelegate>)interstitialDelegate;

/*!
 *  @discussion Set banner delegate to get callbacks
 *  @discussion Use method before or after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setBannerDelegate:self]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setBannerDelegate(self) @endcode
 *  @param bannerDelegate Object that implements AppodealBannerDelegate protocol
 */
+ (void)setBannerDelegate:(id<AppodealBannerDelegate>)bannerDelegate;

/*!
 *  @discussion Set skippable video delegate to get callbacks
 *  @discussion Use method before or after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setSkippableVideoDelegate:self]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setSkippableVideoDelegate(self) @endcode
 *  @param videoDelegate Object that implements AppodealSkippableVideoDelegate protocol
 */
+ (void)setSkippableVideoDelegate:(id<AppodealSkippableVideoDelegate>)videoDelegate __attribute__((deprecated("use Interstitial")));

/*!
 *  @discussion Set rewarded video delegate to get callbacks
 *  @discussion Use method before or after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setRewardedVideoDelegate:self]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setRewardedVideoDelegate(self) @endcode
 *  @param rewardedVideoDelegate Object that implements AppodealRewardedVideoDelegate protocol
 */
+ (void)setRewardedVideoDelegate:(id<AppodealRewardedVideoDelegate>)rewardedVideoDelegate;

/*!
 *  @discussion Set non skippable video delegate to get callbacks
 *  @discussion Use method before or after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setNonSkippableVideoDelegate:self]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setNonSkippableVideoDelegate(self) @endcode
 *  @param nonSkippableVideoDelegate Object that implements AppodealNonSkippableVideoDelegate protocol
 */
+ (void)setNonSkippableVideoDelegate:(id<AppodealNonSkippableVideoDelegate>)nonSkippableVideoDelegate;

/*!
 *  @discussion Set native ad delegate to get callbacks
 *  @discussion Use method before or after initialization!
 *  @discussion Objective-C
 *  @code [Appodeal setNativeAdDelegate:self]; @endcode
 *  @discussion Swift
 *  @code Appodeal.setNativeAdDelegate(self) @endcode
 *  @param nativeAdDelegate Object that implements AppodealNonSkippableVideoDelegate protocol
 */
+ (void)setNativeAdDelegate:(id<AppodealNativeAdDelegate>)nativeAdDelegate;

#ifdef ADVANCED_INTEGRATION
+ (void)setRequestDelegate:(id<AppodealRequestDelegate>)requestDelegate;
#endif

/*!
 *  @discussion Appodeal banner view to custom placement
 *  @discussion Use method before or after initialization!
 *  @warning We highly recommend to use APDSdk and APDBannerView if you want to get custom placement of banner ads in your app
 *
 *  @discussion Objective-C
 *  @code [Appodeal banner]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.banner() @endcode
 *
 *  @return View that contains banner ad
 */
+ (UIView *)banner;

/*!
 *  @discussion If an ad of this type is ready, the ad shows at once. But if not, an ad starts caching and shows after caching, if it has time to within 3 seconds.
 *
 *  @discussion Objective-C
 *  @code [Appodeal showAd:AppodealAdTypeInterstitial rootViewController:UIViewController]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.showAd(AppodealShowStyle.Interstitial, rootViewController: UIViewController!) @endcode
 *
 *  @param style              AppodealAdTypeInterstitial, AppodealAdTypeSkippableVideo, AppodealAdTypeBanner, AppodealAdTypeNativeAd, AppodealAdTypeRewardedVideo, AppodealAdTypeMREC, AppodealAdTypeNonSkippableVideo
 *  @param rootViewController Controlled for present ads
 *
 *  @return YES if possible to show or NO if not
 */
+ (BOOL)showAd:(AppodealShowStyle)style rootViewController:(UIViewController *)rootViewController;

/*!
 *  @discussion - @sa + (BOOL)showAd:(AppodealShowStyle)style rootViewController:(UIViewController *)rootViewController;
 *
 *  @discussion Objective-C
 *  @code [Appodeal showAd:AppodealAdTypeInterstitial forPlacement:@"PLACEMENT" rootViewController:UIViewController]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.showAd(AppodealShowStyle.Interstitial, forPlacement: String!, rootViewController: UIViewController!) @endcode
 *
 *  @param style              AppodealAdTypeInterstitial, AppodealAdTypeSkippableVideo, AppodealAdTypeBanner, AppodealAdTypeNativeAd, AppodealAdTypeRewardedVideo, AppodealAdTypeMREC, AppodealAdTypeNonSkippableVideo
 *  @param placement          Placement name configured in segments settings on Appodeal Dashboard
 *  @param rootViewController Controller for present
 *
 *  @return YES if possible to show or NO if not
 */
+ (BOOL)showAd:(AppodealShowStyle)style forPlacement:(NSString *)placement rootViewController:(UIViewController *)rootViewController;

/*!
 @discussion Checker for ad is ready and can be shown by current placement
 *
 *  @discussion Objective-C
 *  @code [Appodeal canShowAd:AppodealShowStyleInterstitial forPlacement:MY_PLACEMENT]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.canShowAd(AppodealShowStyle.Interstitial, forPlacement:MY_PLACEMENT) @endcode
 *
 *  @param style              AppodealShowStyleInterstitial, AppodealShowStyleRewardedVideo, AppodealShowStyleBannerBottom, AppodealShowStyleBannerTop, AppodealShowStyleNnonSkippableVideo
 *  @param placement          String placement name from dashboard
 *
 *  @return YES if possible to show or NO if not
 */
+ (BOOL)canShowAd:(AppodealShowStyle)style forPlacement:(NSString *)placement;

/*!
 *  @discussion Return reward object currencyName as NSString, and amount as NSUInteger
 */
+ (id<APDReward>)rewardForPlacement:(NSString *)placement;

/*!
 *  @discussion Start caching an ad for type; if autocache is disabled,
 *  start loading for default placement
 *  @discussion Ad will not be shown after loading
 *
 *  @discussion Objective-C
 *  @code [Appodeal cacheAd:AppodealAdTypeInterstitial]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.cacheAd(AppodealAdType.Interstitial) @endcode
 *
 *  @param type AppodealAdTypeInterstitial, AppodealAdTypeBanner, AppodealAdTypeNativeAd, AppodealAdTypeRewardedVideo, AppodealAdTypeMREC, AppodealAdTypeNonSkippableVideo
 */
+ (void)cacheAd:(AppodealAdType)type;

/*!
 *  @discussion Start caching ad for type if autocache is disabled
 *  start load for default placement
 *  @discussion Ad will not be shown after load
 *
 *  @discussion Objective-C
 *  @code [Appodeal cacheAd:AppodealAdTypeInterstitial forPlacement: @"YOUR_PLACEMENT"]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.cacheAd(AppodealAdType.Interstitial, for: "YOUR_PLACEMENT") @endcode
 *
 *  @param type AppodealAdTypeInterstitial, AppodealAdTypeBanner, AppodealAdTypeNativeAd, AppodealAdTypeRewardedVideo, AppodealAdTypeMREC, AppodealAdTypeNonSkippableVideo
 *  @param placement String placement that you configure in Appodeal dashboard
 */
+ (void)cacheAd:(AppodealAdType)type forPlacement:(NSString *)placement;

/*!
 *  @discussion Hide banner if on screen
 *
 *  @discussion Objective-C
 *  @code [Appodeal hideBanner]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.hideBanner() @endcode
 *
 */
+ (void)hideBanner;

/*!
 *  @discussion Enable debug mode
 *
 *  @discussion Objective-C
 *  @code [Appodeal setDebugEnabled:YES]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setDebugEnabled(true) @endcode
 *
 *  @param debugEnabled Bolean flag
 */
+ (void)setDebugEnabled:(BOOL)debugEnabled;

/*!
 *  @discussion Enable testing mode.
 *  @discussion In this mode you will get a test ad with <b>eCPM = 0$</b>
 *  @discussion Use method before initialization!
 *
 *  @discussion Objective-C
 *  @code [Appodeal setTestingEnabled:YES]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setTestingEnabled(true) @endcode
 *
 *  @param testingEnabled Bolean flag
 */
+ (void)setTestingEnabled:(BOOL)testingEnabled;


/*!
 *  @discussion return current UUID for tracking/targeting ad
 *
 *  @discussion Objective-C
 *  @code [Appodeal getUUID]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.getUUID() @endcode
 *
 */
+ (NSString *)getUUID;

/*!
 *  @discussion Reset UUID for tracking/targeting ad
 *  @discussion Use method before initialization!
 *
 *  @discussion Objective-C
 *  @code [Appodeal resetUUID]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.resetUUID() @endcode
 *
 */
+ (void)resetUUID NS_UNAVAILABLE;

/*!
 *  Get current SDK version
 *
 *  @discussion Objective-C
 *  @code [Appodeal getVersion]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.getVersion() @endcode
 *
 *  @return Current SDK version
 */
+ (NSString *)getVersion;

/*!
 *  @discussion Check that ad is ready to show
 *
 *  @discussion Objective-C
 *  @code [Appodeal isReadyForShowWithStyle:AppodealShowStyleInterstitial]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.isReadyForShowWithStyle(AppodealShowStyle.Interstitial) @endcode
 *
 *  @param showStyle AppodealShowStyleInterstitial, AppodealShowStyleVideoOrInterstitial, AppodealShowStyleBannerTop, AppodealShowStyleBannerBottom, AppodealShowStyleRewardedVideo, AppodealShowStyleNonSkippableVideo
 *
 *  @return YES if ready or NO if not
 */
+ (BOOL)isReadyForShowWithStyle:(AppodealShowStyle)showStyle;

/*!
 *  @discussion You can set custom rule by using this method.
 *  Configure rules for segments in <b>Appodeal Dashboard</b>.
 *  @discussion For example, you want to create a segment of users who complete 20 or more levels
 *  You create a rule in the dashboard with name "completedLevels" of type Int,
 *  operator GreaterThanOrEqualTo and value 10, and then you implement the following code:
 *
 *  @discussion Objective-C
 *  @code
        NSDictionary * customRule = {@"completedLevels" : CURRENT_NUMBER_OF_COMPLETED_LEVELS};
        [[APDSdk sharedSdk] setCustomRule: customRule];
 *  @endcode
 *
 *  @discussion Swift
 *  @code
        let customRule = ["completedLevels" : CURRENT_NUMBER_OF_COMPLETED_LEVELS]
        APDSdk .sharedSdk().setCustomRule(customRule)
 *  @endcode
 *
 *  Call this method any time you want, segments change dynamically
 *
 *  @discussion And then CURRENT_NUMBER_OF_COMPLETED_LEVELS become 10 or greater
 *  Your segments settings become available
 *
 *  @param customRule NSDictionary instance with keys that are similar to keys that you turn on in Appodeal Dashboard's Segment settings block and values of similar types
 */
+ (void)setCustomRule:(NSDictionary *)customRule;

/*!
 *  @discussion -
 *
 *  @discussion Objective-C
 *  @code [Appodeal confirmUsage:AppodealAdTypeInterstitial]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.confirmUsage(AppodealAdType.Interstitial) @endcode
 *
 *  @param adTypes AppodealAdTypeInterstitial, AppodealAdTypeSkippableVideo, AppodealAdTypeBanner, AppodealAdTypeNativeAd, AppodealAdTypeRewardedVideo, AppodealAdTypeMREC, AppodealAdTypeNonSkippableVideo
 */
+ (void)confirmUsage:(AppodealAdType)adTypes;

/*!
 *  @discussion Autoresized banner support. Default set to YES;
 *  Call this method before caching banners!
 *
 *  @discussion Objective-C
 *  @code [Appodeal setSmartBannersEnabled:YES]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setSmartBannersEnabled(true) @endcode
 *
 *  @param smartBannerEnabled If YES, the banner will resize depending on screen size. If NO, the banner has a fixed size (320x50 on iPhone and 728x90 on iPad)
 */
+ (void)setSmartBannersEnabled:(BOOL)smartBannerEnabled;

/*!
 *  @discussion Banner background visibility setter. Default set to NO.
 *  Call this method before caching banners!
 *
 *  @discussion Objective-C
 *  @code [Appodeal setBannerBackgroundVisible:YES]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setBannerBackgroundVisible(true) @endcode
 *
 *  @param bannerBackgroundVisible If YES,  the banner will have a background. If NO, the banner background will be transparent
 */
+ (void)setBannerBackgroundVisible:(BOOL)bannerBackgroundVisible;

/*!
 *  @discussion Banner animation setter. Default set to YES
 *  Call this method before caching banners!
 *
 *  @discussion Objective-C
 *  @code [Appodeal setBannerAnimationEnabled:YES]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setBannerAnimationEnabled(true) @endcode
 *
 *  @param bannerAnimationEnabled If YES, the banner will refresh with animation (UIViewAnimationOptionTransitionCrossDissolve). If NO, the banner will refresh without animation;
 */
+ (void)setBannerAnimationEnabled:(BOOL)bannerAnimationEnabled;

/*!
 *  @discussion Start loading native ads of count that
 *  you specified. If Appodeal SDK already contains ads,
 *  this method clears all cached ads before loading new ads.
 *  We recommend calling this method once.
 *  When you grab ready ads, the ad queue starts to replenish automatically
 *
 *
 *  @discussion Objective-C
 *  @code [Appodeal loadNaitveAd:APDNativeAdTypeAuto capacity:4]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.loadNaitveAd(APDNativeAdTypeAuto, capacity: 4) @endcode
 *
 *  @param type Type of native ad. Identified in APDNativeAdType enum;
 *  @param capacity Desired count of stored in cache native ads. Maximum value is 11;
 */
+ (void)loadNaitveAd:(APDNativeAdType)type capacity:(NSInteger)capacity;

/*!
 *  @discussion Get current available ads
 *  @param count - Desired count of native ads. Real returned array count can be less that this parameter
 */
+ (NSArray *)getNativeAdsOfCount:(NSInteger)count;

/*!
 *  @discussion Get current available ads count
 */
+ (NSInteger)availableNativeAdsCount;

/*!
 *  @discussion disable user data for adNetwork name
 *  @param networkName - adNetwork name as NSString @"NETWORK_NAME"
 */
+ (void)disableUserData:(NSString *)networkName;
/*!
 *  @discussion Enable memory monitoring for ad type. If current memory consumption is higher than required, all cachied ad objects will be released
 *  @warning loaded ad will return and not be shown
 *
 *  @param percentage Minimum percent of RAM free is from 1 to 100. If NSNotFound memory monitor is inactive
 *  @param type Type of ad to use
 */
+ (void)setMinimumFreeMemoryPercentage:(NSUInteger)percentage
                             forAdType:(AppodealAdType)type __attribute__((deprecated("Use -setMinimumFreeMemoryPercentage:observeSystemWarnings:forAdType: instead")));

/*!
 *  @discussion Enable memory monitoring for ad type. If current memory consumption is higher than required, all cachied ad objects will be released
 *  @warning loaded ad will return and not be shown
 *
 *  @param percentage Minimum percent of RAM free is from 1 to 100. If NSNotFound memory monitor is inactive
 *  @param observeSystemWarnings Enabled observation of system memory warnings
 *  @param type Type of ad to use
 */
+ (void)setMinimumFreeMemoryPercentage:(NSUInteger)percentage
                 observeSystemWarnings:(BOOL)observeSystemWarnings
                             forAdType:(AppodealAdType)type;

/*!
 *  @discussion Enable COPPA setting flag. By defualt this setting is false
 *
 *  @param childDirectedTreatment Boolean flag inficates that app for kids.
 */
+ (void)setChildDirectedTreatment:(BOOL)childDirectedTreatment;

@end

/*!
 *  Set user metadata for relevant ad targeting
 */
@interface Appodeal (UserMetadata)

/*!
 *  @discussion User ID setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserId:@"USER_ID"]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserId("USER_ID") @endcode
 *
 *  @param userId Set userId as string
 */
+ (void)setUserId:(NSString *)userId;

/*!
 *  @discussion User email setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserEmail:@"USER_EMAIL"]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserEmail("USER_EMAIL") @endcode
 *
 *  @param email Set userEmail as string
 */
+ (void)setUserEmail:(NSString *)email;

/*!
 *  @discussion User birthday setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserBirthday:[NSDate date]]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserBirthday(Date() as Date!) @endcode
 *
 *  @param birthday Set userBirthday as NSDate
 */
+ (void)setUserBirthday:(NSDate *)birthday;

/*!
 *  @discussion User age setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserAge:25]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserAge(25) @endcode
 *
 *  @param age Set age as integer value
 */
+ (void)setUserAge:(NSUInteger)age;

/*!
 *  @discussion User gender setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserGender:AppodealUserGenderMale]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserGender(AppodealUserGender.male) @endcode
 *
 *  @param gender AppodealUserGenderOther, AppodealUserGenderMale, AppodealUserGenderFemale
 */
+ (void)setUserGender:(AppodealUserGender)gender;

/*!
 *  @discussion User occupation setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserOccupation:AppodealUserOccupationWork]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserOccupation(AppodealUserOccupation.work) @endcode
 *
 *  @param occupation AppodealUserOccupationOther, AppodealUserOccupationWork, AppodealUserOccupationSchool, AppodealUserOccupationUniversity
 */
+ (void)setUserOccupation:(AppodealUserOccupation)occupation;

/*!
 *  @discussion User relationship setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserRelationship:AppodealUserRelationshipMarried]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserRelationship(AppodealUserRelationship.married) @endcode
 *
 *  @param relationship AppodealUserRelationshipOther, AppodealUserRelationshipSingle, AppodealUserRelationshipDating, AppodealUserRelationshipEngaged, AppodealUserRelationshipMarried, AppodealUserRelationshipSearching
 */
+ (void)setUserRelationship:(AppodealUserRelationship)relationship;

/*!
 *  @discussion User smoking attitude setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserSmokingAttitude:AppodealUserSmokingAttitudeNeutral]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserSmokingAttitude(AppodealUserSmokingAttitude.neutral) @endcode
 *
 *  @param smokingAttitude AppodealUserSmokingAttitudeNegative, AppodealUserSmokingAttitudeNeutral, AppodealUserSmokingAttitudePositive
 */
+ (void)setUserSmokingAttitude:(AppodealUserSmokingAttitude)smokingAttitude;

/*!
 *  @discussion User alcohol attitude setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserAlcoholAttitude:AppodealUserAlcoholAttitudeNeutral]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserAlcoholAttitude(AppodealUserAlcoholAttitude.neutral) @endcode
 *
 *  @param alcoholAttitude AppodealUserAlcoholAttitudeNegative, AppodealUserAlcoholAttitudeNeutral, AppodealUserAlcoholAttitudePositive
 */
+ (void)setUserAlcoholAttitude:(AppodealUserAlcoholAttitude)alcoholAttitude;

/*!
 *  @discussion User interests setter
 *
 *  @discussion Objective-C
 *  @code [Appodeal setUserInterests:@"USER_INTERESTS"]; @endcode
 *
 *  @discussion Swift
 *  @code Appodeal.setUserInterests("USER_INTERESTS") @endcode
 *
 *  @param interests Set user interests as string
 */
+ (void)setUserInterests:(NSString *)interests;

@end
