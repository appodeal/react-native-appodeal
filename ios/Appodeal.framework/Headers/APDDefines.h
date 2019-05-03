//
//  APDDefines.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>

FOUNDATION_EXPORT const CGSize kAppodealUnitSize_320x50;
FOUNDATION_EXPORT const CGSize kAppodealUnitSize_300x250;
FOUNDATION_EXPORT const CGSize kAppodealUnitSize_728x90;

FOUNDATION_EXPORT NSArray * AppodealAvailableUnitSizes();

FOUNDATION_EXPORT BOOL AppodealIsUnitSizeSupported(const CGSize size, NSArray *supportedSizes);
FOUNDATION_EXPORT BOOL AppodealIsUnitSizeAvailable(const CGSize size);


FOUNDATION_EXPORT CGSize AppodealNearestUnitSizeForSize(CGSize size);

/*!
 *  Appodeal ads types
 */
typedef NS_OPTIONS(NSInteger, AppodealAdType) {
    /*!
     *  Interstitial
     */
    AppodealAdTypeInterstitial      = 1 << 0,
    /*!
     *  Skippable video (can be skipped by user after several seconds of watch)
     */
    AppodealAdTypeSkippableVideo __attribute__((deprecated("Use AppodealAdTypeInterstitial")))   = 1 << 1,
    /*!
     *  Banner ads
     */
    AppodealAdTypeBanner            = 1 << 2,
    /*!
     *  Native ads
     */
    AppodealAdTypeNativeAd          = 1 << 3,
    /*!
     *  Rewarded video (return reward parameter in finish callback, can not be skipped by user)
     */
    AppodealAdTypeRewardedVideo     = 1 << 4,
    /*!
     *  Rectangle banner of size 300 x 250
     */
    AppodealAdTypeMREC              = 1 << 5,
    /*!
     *  Non-skippable video (does not return reward parameter in finish callback, can not be skipped by user)
     */
    AppodealAdTypeNonSkippableVideo = 1 << 6,
};

/*!
 *  Appodeal styles to show
 */
typedef NS_OPTIONS(NSInteger, AppodealShowStyle) {
    /*!
     *  Show interstial ads
     */
    AppodealShowStyleInterstitial       = 1 << 0,
    /*!
     *  Show skippable ads
     */
    AppodealShowStyleSkippableVideo __attribute__((deprecated("Use bit mask AppodealShowStyleInterstitial")))  = AppodealShowStyleInterstitial,
    /*!
     *  - If both are ready, show ad with higher eCPM
     *  @discussion - If one of this type is ready, show ad
     *  @discussion - If none are ready, wait for the first ready ad
     */
    AppodealShowStyleVideoOrInterstitial __attribute__((deprecated("Use bit mask AppodealShowStyleInterstitial"))) = AppodealShowStyleInterstitial,
    /*!
     *  Show banner at top of screen
     */
    AppodealShowStyleBannerTop          = 1 << 2,
    /*!
     *  Show banner at bottom of screen
     */
    AppodealShowStyleBannerBottom       = 1 << 3,
    /*!
     *  Show rewareded video
     */
    AppodealShowStyleRewardedVideo      = 1 << 4,
    /*!
     *  Show non-skippable video
     */
    AppodealShowStyleNonSkippableVideo  = 1 << 5
};

typedef NS_ENUM(NSUInteger, AppodealUserGender) {
    AppodealUserGenderOther = 0,
    AppodealUserGenderFemale,
    AppodealUserGenderMale
};

typedef NS_ENUM(NSUInteger, AppodealUserOccupation) {
    AppodealUserOccupationOther = 0,
    AppodealUserOccupationWork,
    AppodealUserOccupationSchool,
    AppodealUserOccupationUniversity
};

typedef NS_ENUM(NSUInteger, AppodealUserRelationship) {
    AppodealUserRelationshipOther = 0,
    AppodealUserRelationshipSingle,
    AppodealUserRelationshipDating,
    AppodealUserRelationshipEngaged,
    AppodealUserRelationshipMarried,
    AppodealUserRelationshipSearching
};

typedef NS_ENUM(NSUInteger, AppodealUserSmokingAttitude) {
    AppodealUserSmokingAttitudeNegative = 1,
    AppodealUserSmokingAttitudeNeutral,
    AppodealUserSmokingAttitudePositive
};

typedef NS_ENUM(NSUInteger, AppodealUserAlcoholAttitude) {
    AppodealUserAlcoholAttitudeNegative = 1,
    AppodealUserAlcoholAttitudeNeutral,
    AppodealUserAlcoholAttitudePositive
};

/*!
 *  Declaration of banner delegate
 */
@protocol AppodealBannerDelegate <NSObject>

@optional
/*!
 *  Method called when precached or usual banner view loads
 *
 *  @param precache If precache is YES it means that precached ad loaded
 */
- (void)bannerDidLoadAdIsPrecache:(BOOL)precache;

/*!
 *  Method called when banner loaded and is ready to show
 */
- (void)bannerDidLoadAd __attribute__((deprecated("Use -bannerDidLoadAdisPrecache:precache: instead")));

/*!
 *  Method called when banner refreshes
 */
- (void)bannerDidRefresh __attribute__((deprecated("Use -bannerDidShow instead")));

/*!
 *  Method called if banner mediation failed
 */
- (void)bannerDidFailToLoadAd;

/*!
 *  Method called when user taps on banner
 */
- (void)bannerDidClick;

/*!
 *  Method called when banner shows or refreshes
 */
- (void)bannerDidShow;

@end

/*!
 *  Interstital delegate declaration
 */
@protocol AppodealInterstitialDelegate <NSObject>

@optional

/*!
 *  Method called when usual interstitial view loads
 *
 */
- (void)interstitialDidLoadAd __attribute__((deprecated("Use -interstitialDidLoadAdisPrecache: instead")));

/*!
 *  Method called when precached or usual interstitial view loads
 *  @warning If you want show only expensive ads, ignore this callback call with precache equal to YES
 *
 *  @param precache If precache is YES it means that precached ad loaded
 */
- (void)interstitialDidLoadAdisPrecache:(BOOL)precache;

/*!
 *  Method called if interstitial mediation failed
 */
- (void)interstitialDidFailToLoadAd;

/*!
 *  Method called if interstitial mediation was successful, but ready ad network can't show ad or
 *  ad presentation was too frequent according to your placement settings
 */
- (void)interstitialDidFailToPresent;

/*!
 *  Method called when interstitial displays on screen
 */
- (void)interstitialWillPresent;

/*!
 *  Method called after interstitial leaves the screen
 */
- (void)interstitialDidDismiss;

/*!
 *  Method called when user taps on interstitial
 */
- (void)interstitialDidClick;

@end


/*!
 *  Rewarded video delegate declaration
 */
@protocol AppodealRewardedVideoDelegate <NSObject>

@optional

/*!
 *  Method called when rewarded video loads
 */
- (void)rewardedVideoDidLoadAd;

/*!
 *  Method called if rewarded video mediation failed
 */
- (void)rewardedVideoDidFailToLoadAd;

/*!
 *  Method called if interstitial mediation was successful, but ready ad network can't show ad or
 *  ad presentation was too frequent according to your placement settings
 */
- (void)rewardedVideoDidFailToPresent;

/*!
 *  Method called after rewarded video starts displaying
 */
- (void)rewardedVideoDidPresent;

/*!
 *  Method called before rewarded video leaves screen
 */
- (void)rewardedVideoWillDismiss;

/*!
 *  Method called after completion of video
 *  @warning After calling this method, rewarded video can stay on screen and show postbanner
 *
 *  @param rewardAmount Amount of app currency turned on in Appodeal Dashboard
 *  @param rewardName Name of app currency set on in Appodeal Dashboard
 */
- (void)rewardedVideoDidFinish:(NSUInteger)rewardAmount name:(NSString *)rewardName;

/*!
 *  Method called after user taps on screen
 *  @warning Not all ad networks provide this callback!
 */
- (void)rewardedVideoDidClick __attribute__((deprecated("Not all ad networks return this action")));

@end


/*!
 *  Non-skippable video delegate
 */
@protocol AppodealNonSkippableVideoDelegate <NSObject>

@optional

/*!
 *  Method called when non skippable video loads
 */
- (void)nonSkippableVideoDidLoadAd;

/*!
 *  Mehtod called if non-skippable video mediation failed
 */
- (void)nonSkippableVideoDidFailToLoadAd;

/*!
 *  Method called after non-skippable video starts displaying
 */
- (void)nonSkippableVideoDidPresent;

/*!
 *  Method called if non-skippable mediation was successful, but ready ad network can't show ad or
 *  ad presentation was too frequent according to your placement settings
 */
- (void)nonSkippableVideoDidFailToPresent;

/*!
 *  Method called before non-skippable video leaves screen
 */
- (void)nonSkippableVideoWillDismiss;

/*!
 *  Method called after completion of video
 *  @warning After calling this method, non-skippable video can stay on screen and show postbanner
 *
 */
- (void)nonSkippableVideoDidFinish;

/*!
 *  Method called after user taps on screen
 *  @warning Not all ad networks provide this callback!
 */
- (void)nonSkippableVideoDidClick __attribute__((deprecated("Not all ad networks return this action")));

@end



/*!
 *  Skippable video delegate
 */
@protocol AppodealSkippableVideoDelegate <NSObject>

@optional

/*!
 *  Method called when skippable video loads
 */
- (void)skippableVideoDidLoadAd;

/*!
 *  Method called if skippable video mediation failed
 */
- (void)skippableVideoDidFailToLoadAd;

/*!
 *  Method called after skippable video starts displaying
 */
- (void)skippableVideoDidPresent;

/*!
 *  Method called before skippable video leaves screen
 */
- (void)skippableVideoWillDismiss;

/*!
 *  Method called after completion of video: if user skips the video, this callback is not called
 *  @warning After calling this method, skippable video can stay on screen and show postbanner
 *  @warning Not all ad networks provide this callback!
 *
 */
- (void)skippableVideoDidFinish;

/*!
 *  Method called after user taps on screen
 *  @warning Not all ad networks provide this callback!
 */
- (void)skippableVideoDidClick;

@end


@protocol AppodealNativeAdDelegate <NSObject>

/*!
 *  Method called after native ads load
 */
- (void)didLoadNativeAds:(NSInteger)count;

/*!
 *  Method called if native ads get some error while loading
 */
- (void)didFailToLoadNativeAdsWithError:(NSError *)error;

@end


/*!
 *  Default APDBanner sizes
 */
extern const CGSize kAPDAdSize320x50;
extern const CGSize kAPDAdSize728x90;
extern const CGSize kAPDAdSize300x250;

/*!
 *  Used in native ad image
 *  Equals to CGSizeZero
 */
extern const CGSize kAPDImageSizeUndefined;

/*!
 *  Size validation
 *
 *  @param size kAPDAdSize320x50, kAPDAdSize728x90, kAPDAdSize300x250
 *
 *  @return BOOL
 */
extern BOOL   APDIsAdSizeValid(const CGSize size);

/*!
 *  Get nearest valid Appodeal size
 *
 *  @param size CGSize
 *
 *  @return kAPDAdSize320x50, kAPDAdSize728x90, kAPDAdSize300x250
 */
extern CGSize APDNearestValidAdSizeForCGSize(const CGSize size);

/*!
 *  Get current SDK version
 *
 *  @return current SDK version
 */
NSString * APDSdkVersionString();

extern NSString * const kAPDErrorDomain;

/*!
 *  Appodeal sdk error types
 */
typedef NS_ENUM(NSInteger, APDError) {
    /*!
     *  Unknown error
     */
    APDUnknownError = 195944097,
    /*!
     * Inconsistency error: occurrs for example if some kind
     * of ads start loading, but APDSdk does not initialize
     * for this type
     */
    APDInternalInconsistencyError,
    /*!
     *  Any network error, for example server is not available
     */
    APDNetworkingError,
    /*!
     *  Device is not reachable
     */
    APDDeviceNotReachableError,
    /*!
     *  Errors of this type occur if some network response contains
     *  data of an unsupported/unexpected type
     */
    APDJSONDecodeError,
    /*!
     *  Ad network returns no fill
     */
    APDNoFillError,
    /*!
     *  Mediation failed
     */
    APDMediationError,
    /*!
     *  Presentation failed
     */
    APDPresentationError,
    /*!
     *  Device offline or ready ad does not conform to presentation settings
     */
    APDInconsistencyPresentationError,
    /*!
     *  Inconsistency size
     */
    APDInvalidAdSizeError,
    /*!
     *  Handled exception size
     */
    APDHandledExceptionError,
    /*!
     *  Invalid type was loaded
     */
    APDInvalidAdTypeError,
    /*!
     *  Ad unit returned from server contains invalid data
     */
    APDIncorrectAdUnitError,
    /*!
     *  Error while unarchiving cached data
     */
    APDUnarchiveError,
    /*!
     *  Insufficiently device's current memory
     */
    APDLowMemoryError
};


/*!
 *  Log flags
 */
typedef NS_OPTIONS(NSUInteger, APDLogFlag) {
    /*!
     *  Only error messages are written to console.
     *  If you see this message, you must
     *  check your integration
     */
    APDLogFlagError   = 1 << 0,
    /*!
     *  Warning and error messages are written to console.
     *  Different warnings occur while the SDK works
     */
    APDLogFlagWarning = 1 << 1,
    /*!
     *  Error, warning and information messages are written to console.
     */
    APDLogFlagInfo    = 1 << 2,
    /*!
     *  Debug messages written to console
     */
    APDLogFlagDebug   = 1 << 3,
    /*!
     *  All SDK messages written to console
     */
    APDlogFlagVerbose = 1 << 4
};

/*!
 *  Log levels. Set some value to [APDSdk setLogLevel:]
 */
typedef NS_ENUM(NSUInteger, APDLogLevel) {
    /*!
     *  Log levels
     */
    APDLogLevelOff     = 0,
    /*!
     *  Only error messages are written to console.
     *  If you see this message, you must
     *  check your integration
     */
    APDLogLevelError   = APDLogFlagError,
    /*!
     *  Warning and error messages are written to console.
     *  Different warnings occur while the SDK works
     */
    APDLogLevelWarning = APDLogLevelError   | APDLogFlagWarning,
    /*!
     *  Error, warning and information messages are written to console.
     */
    APDLogLevelInfo    = APDLogLevelWarning | APDLogFlagInfo,
    /*!
     *  Debug messages written to console
     */
    APDLogLevelDebug   = APDLogLevelInfo    | APDLogFlagDebug,
    /*!
     *  All SDK messages written to console
     */
    APDLogLevelVerbose = APDLogLevelDebug   | APDlogFlagVerbose
};

/*!
 *  APDSdk supported ad types. You can initialize sdk with
 *  several ad types, by usage binary operand |
 *  For example: APDAdTypeInterstitialAd | APDAdTypeSkippableVideo
 */
typedef NS_OPTIONS(NSUInteger, APDType) {
    /*!
     *  Interstital ad
     */
    APDTypeInterstitialAd = 1 << 0,
    /*!
     *  Skippable video ad
     */
    APDTypeSkippableVideo __attribute__((deprecated("Use APDAdTypeInterstitialAd instead"))) = 1 << 1,
    /*!
     *  Banner ad
     */
    APDTypeBanner         = 1 << 2,
    /*!
     *  Native ad
     */
    APDTypeNativeAd       = 1 << 3,
    /*!
     *  Rewarded ad
     */
    APDTypeRewardedVideo  = 1 << 4,
    /*!
     *  Rectangular banner (banner of size 300x250)
     */
    APDTypeMREC           = 1 << 5
};

/*!
 *  Native ad types
 */
typedef NS_ENUM(NSUInteger, APDNativeAdType) {
    /*!
     * Native ad loaded can contain video
     * It depends on filled ad’s network
     */
    APDNativeAdTypeAuto = 0,
    /*!
     *  Native ad contains video
     */
    APDNativeAdTypeVideo,
    /*!
     *  Native ad  does not contain video
     */
    APDNativeAdTypeNoVideo
};

/*!
 *  Gender enum
 */
typedef NS_ENUM(NSUInteger, APDUserGender) {
    /*!
     *  User's gender is undefined
     */
    APDUserGenderOther = 0,
    /*!
     *  Female
     */
    APDUserGenderFemale,
    /*!
     *  Male
     */
    APDUserGenderMale
};

/*!
 *  User occupation
 */
typedef NS_ENUM(NSUInteger, APDUserOccupation) {
    /*!
     *  User's occupation is undefined / not one of the other values
     */
    APDUserOccupationOther = 0,
    /*!
     *  Work
     */
    APDUserOccupationWork,
    /*!
     *  School
     */
    APDUserOccupationSchool,
    /*!
     *  University
     */
    APDUserOccupationUniversity
};

/*!
 *  User relationship
 */
typedef NS_ENUM(NSUInteger, APDUserRelationship) {
    /*!
     *  User's relationship is undefined / not one of the other values
     */
    APDUserRelationshipOther = 0,
    /*!
     *  Single
     */
    APDUserRelationshipSingle,
    /*!
     *  Dating
     */
    APDUserRelationshipDating,
    /*!
     *  Engaged
     */
    APDUserRelationshipEngaged,
    /*!
     *  Married
     */
    APDUserRelationshipMarried,
    /*!
     *  Searching
     */
    APDUserRelationshipSearching
};

/*!
 *  User smoking attitude
 */
typedef NS_ENUM(NSUInteger, APDUserSmokingAttitude) {
    /*!
     *  Negative
     */
    APDUserSmokingAttitudeNegative = 1,
    /*!
     *  Neutral
     */
    APDUserSmokingAttitudeNeutral,
    /*!
     *  Positive
     */
    APDUserSmokingAttitudePositive
};

/*!
 *  Alcohol attitude
 */
typedef NS_ENUM(NSUInteger, APDUserAlcoholAttitude) {
    /*!
     *  Negative
     */
    APDUserAlcoholAttitudeNegative = 1,
    /*!
     *  Neutral
     */
    APDUserAlcoholAttitudeNeutral,
    /*!
     *  Positive
     */
    APDUserAlcoholAttitudePositive
};

typedef NS_ENUM(NSUInteger, APDFramework) {
    APDFrameworkNative = 1,
    APDFrameworkUnity,
    APDFrameworkCocos2d,
    APDFrameworkMarmalade,
    APDFrameworkPhoneGap,
    APDFrameworkGiderosMobile,
    APDFrameworkAdobeAir,
    APDFrameworkCordova,
    APDFrameworkXamarin,
    APDFrameworkGameMaker,
    APDFrameworkMonkeyX,
    APDFrameworkSC2,
    APDFrameworkLibGDX,
    APDFrameworkQt,
    APDFrameworkUE4,
    APDFrameworkReactNative,
    APDFrameworkCorona,
    APDFrameworkStencyl,
    APDFrameworkSDKBox,
    APDFrameworkDefold
};


