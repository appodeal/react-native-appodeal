//
//  APDSdk.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Appodeal/APDUserInfo.h>
#import <Appodeal/APDDefines.h>

/*!
 * Main SDK object, that managed network request, ad modules and statistics data.
 * You should initialize the SDK before you start loading any ad types.
 * You can do this in
 * @discussion - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
 * @discussion for example.
 * @warning You must call sharedSdkWithApiKey:(NSString *)apiKey firstly.
 * @discussion For example initialization code can be something like this:
 * @code
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
        [[APDSdk sharedSdkWithApiKey: YOUR_API_KEY] initializeForAdTypes: APDAdTypeInterstitialAd];
        return YES;
    }
 * @endcode
 
 * After SDK initialization, you can get an instance of SDK by calling [APDSdk sharedSdk];
 * You can additionally set other SDK settings before/after SDK initialization
 */
@interface APDSdk : NSObject

/*!
 *  Unuvailabale initializer
 *
 *  @return nil
 */
- (instancetype)init NS_UNAVAILABLE;

/*!
 *  Unuvailabale initializer
 *
 *  @return nil
 */
+ (instancetype)new NS_UNAVAILABLE;

/*!
 *  Singleton instance of APDSdk
 *
 *  @discussion Objective-C
 *  @code [APDSdk sharedSdkWithApiKey:@"API_KEY"]; @endcode
 *
 *  @discussion Swift
 *  @code APDSdk.sharedSdkWithApiKey("API_KEY") @endcode
 *
 *  @param apiKey String API key parameter from Appodeal Dashboard
 *
 *  @return Singleton instance of APDSdk
 */
+ (instancetype)sharedSdkWithApiKey:(NSString *)apiKey;


/*!
 *  Always returns same instance SDK returned by first call of +sharedSdkWithApiKey:
 *
 *  @discussion Objective-C
 *  @code [APDSdk sharedSdk]; @endcode
 *
 *  @discussion Swift
 *  @code APDSdk.sharedSdk() @endcode
 *
 *  @return Instance of APDSdk
 */
+ (instancetype)sharedSdk;

/*!
 *  Call this method to specify framework before initialization
 *
 *  @discussion Objective-C
 *  @code [[APDSdk sharedSdk] setFramework:APDFrameworkNative]; @endcode
 *
 *  @discussion Swift
 *  @code APDSdk.sharedSdk().setFramework(APDFramework.native) @endcode
 *
 *  @param framework Type of framework. Default is native iOS SDK
 */
- (void)setFramework:(APDFramework)framework;

/*!
 *  Call this method to specify framework before initialization
 *
 *  @param pluginVersion - NSString version plugin
 */
- (void)setPluginVersion:(NSString *)pluginVersion;

/*!
 *  Initialization of SDK for types
 *
 *  @discussion Objective-C
 *  @code [[APDSdk sharedSdk] initializeForAdTypes:AppodealAdTypeInterstitial | AppodealAdTypeRewardedVideo]; @endcode
 *
 *  @discussion Swift
 *  @code
 let adTypes: AppodealAdType = [.banner, .interstitial]
 APDSdk.sharedSdk().initializeForAdTypes(adTypes) @endcode
 *
 *  @param adTypes APDAdTypeInterstitialAd, APDAdTypeBanner, APDAdTypeNativeAd, APDAdTypeRewardedVideo, APDAdTypeMREC
 */
- (void)initializeForAdTypes:(APDType)adTypes;

/*!
 *  Check that SDK is initialized for ad type
 *
 *  @discussion Objective-C
 *  @code [[APDSdk sharedSdk] isInitializedForAdType:AppodealAdTypeInterstitial]; @endcode
 *
 *  @discussion Swift
 *  @code APDSdk.sharedSdk().isInitializedForAdType(APDAdType.interstitial) @endcode
 *
 *  @param adType APDAdType value
 *
 *  @return YES if SDK initialized for this type, or NO if not
 */
- (BOOL)isInitializedForAdType:(APDType)adType;

/*!
 *  If you set YES for this method you get only
 *  test ad with $0 eCPM
 *  @warning use this method before initilized sdk
 *  @discussion Objective-C
 *  @code [[APDSdk sharedSdk] setTesingMode:YES]; @endcode
 *
 *  @discussion Swift
 *  @code APDSdk.sharedSdk().setTesingMode(true) @endcode
 *
 *  @param enabled Boolean flag
 */
- (void)setTesingMode:(BOOL)enabled;

/*!
 *  Set targeting for more relevant ads
 *
 *  @discussion Objective-C
 *  @code
        APDUserInfo * userInfo = [APDUserInfo new];
        userInfo.age = 25;
        [[APDSdk sharedSdk] setUserInfo:userInfo];
 *  @endcode
 *
 *  @discussion Swift
 *  @code
        let userInfo = APDUserInfo()
        userInfo.age = 25
        APDSdk.sharedSdk().setUserInfo(userInfo)
 *  @endcode
 *
 *  @param userInfo Instance of APDUserInfo class
 */
- (void)setUserInfo:(APDUserInfo *)userInfo;

/*!
 *  If you do not want some ad network to
 *  get user info call this method
 *
 *  @discussion Objective-C
 *  @code [[APDSdk sharedSdk] disableUserInfoForNetworkName:@"NETWORK_NAME"]; @endcode
 *
 *  @discussion Swift
 *  @code APDSdk.sharedSdk().disableUserInfoForNetworkName("NETWORK_NAME") @endcode
 *
 *  @param networkName Appodeal ad network name for example: @"mopub", @"admob"
 */
- (void)disableUserInfoForNetworkName:(NSString *)networkName;

/*!
 *  You can set custom rules by using this method.
 *  Configure rules for segments in <b>Appodeal Dashboard</b>.
 *  @discussion For example, if you want to create a segment of users who complete 20 or more levels,
 *  you create a rule in the dashboard with name "completedLevels" of type Int,
 *  operator GreaterThanOrEqualTo and value 10, now you implement following code:
 *
 *  @discussion Objective-C
 *  @code
        NSDictionary * customRule = {@"completedLevels" : CURRENT_NUMBER_OF_COMPLETED_LEVELS};
        [[APDSdk sharedSdk] setCustomRule: customRule];
 *  @endcode
 *
 *  @discussion Swift
 *  And then CURRENT_NUMBER_OF_COMPLETED_LEVELS becomes 10 or greater
 *  Your segments settings become available
 *
 *  @param customRule NSDictionary instance with keys that are similar to  keys that you turn on in Appodeal Dashboard's Segment settings block and values of similar types
 */

- (void)setCustomRule:(NSDictionary *)customRule;


/*!
 *  Appodeal SDK supports multiple log level for internal logging,
 *  and ONLY one (VERBOSE) log level for third party ad networks.
 *  To enable third party ad networks logging, set log level to APDLogLevelVerbose.
 *  If the log level is something other than APDLogLevelVerbose, all third party ad networks logging will be suppressed (if possible).
 *
 *  @param logLevel APDLogLevel value
 */
- (void)setLogLevel:(APDLogLevel)logLevel;

/*!
 *  Disabling/enabling location tracking
 *
 *  @param enabled Set to NO by default
 */
- (void)setLocationTracking:(BOOL)enabled;

/*!
 *  Reset UUID for tracking/targeting ads
 */
- (void)resetUUID;

/*!
 *  Enable memory monitoring for ad type. If current memory consumption is higher than required, all cached ad objects will be released
 *  @warning loaded ad will return and will not be shown
 *
 *  @param percentage Minimum percent of RAM free is from 1 to 100. If NSNotFound memory monitor is inactive
 *  @param observeSystemWarnings enable system warnings observation
 *  @param type Type of ad to use
 */
- (void)setMinimumFreeMemoryPercentage:(NSUInteger)percentage
                 observeSystemWarnings:(BOOL)observeSystemWarnings
                             forAdType:(APDType)type;

- (void)setChildDirectedTreatment:(BOOL)childDirectedTreatment;

@end


@interface APDSdk (InAppPurchase)

/*!
 *  In-app purchase tracking.
 *  Call this method after user makes an in-app purchase
 *
 *  @param amount   Amount of in-app purchase, for example @0.99
 *  @param currency In-app purchase currency, for example @"USD"
 */
- (void)trackInAppPurchase:(NSNumber *)amount currency:(NSString *)currency;

@end
