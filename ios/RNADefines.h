#import <Foundation/Foundation.h>
#import <Appodeal/Appodeal.h>
#import <StackConsentManager/StackConsentManager-Swift.h>

NS_ASSUME_NONNULL_BEGIN

#pragma mark - Event Constants

/**
 * Event system prefix for all RNA events
 */
FOUNDATION_EXPORT NSString *const kRNAEventPrefix;

/**
 * Appodeal SDK lifecycle events
 */
FOUNDATION_EXPORT NSString *const kEventAppodealInitialized;
FOUNDATION_EXPORT NSString *const kEventAppodealDidReceiveRevenue;

/**
 * Banner ad events
 */
FOUNDATION_EXPORT NSString *const kEventBannerLoaded;
FOUNDATION_EXPORT NSString *const kEventBannerFailedToLoad;
FOUNDATION_EXPORT NSString *const kEventBannerExpired;
FOUNDATION_EXPORT NSString *const kEventBannerShown;
FOUNDATION_EXPORT NSString *const kEventBannerClicked;

/**
 * Interstitial ad events
 */
FOUNDATION_EXPORT NSString *const kEventInterstitialLoaded;
FOUNDATION_EXPORT NSString *const kEventInterstitialFailedToLoad;
FOUNDATION_EXPORT NSString *const kEventInterstitialFailedToPresent;
FOUNDATION_EXPORT NSString *const kEventInterstitialExpired;
FOUNDATION_EXPORT NSString *const kEventInterstitialShown;
FOUNDATION_EXPORT NSString *const kEventInterstitialClosed;
FOUNDATION_EXPORT NSString *const kEventInterstitialClicked;

/**
 * Rewarded video ad events
 */
FOUNDATION_EXPORT NSString *const kEventRewardedVideoLoaded;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoFailedToLoad;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoFailedToPresent;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoExpired;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoShown;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoClicked;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoClosed;
FOUNDATION_EXPORT NSString *const kEventRewardedVideoFinished;

#ifdef __cplusplus
extern "C" {
#endif

#pragma mark - Public Functions

/**
 * Returns an array of all supported event method names
 * @return NSArray containing all supported event method names as strings
 */
NSArray<NSString *> *RNASupportedMethods(void);

#pragma mark - Ad Type Definitions

/**
 * React Native Appodeal ad type options
 * Used for bitwise operations to combine multiple ad types
 */
typedef NS_OPTIONS(NSInteger, RNAAdType) {
    RNAAdTypeNone = 0,                    ///< No ad type selected
    RNAAdTypeInterstitial = 1 << 0,      ///< Interstitial ads
    RNAAdTypeBanner = 1 << 2,            ///< Banner ads (generic)
    RNAAdTypeBannerBottom = 1 << 3,      ///< Banner ads at bottom
    RNAAdTypeBannerTop = 1 << 4,         ///< Banner ads at top
    RNAAdTypeRewardedVideo = 1 << 5,     ///< Rewarded video ads
    RNAAdTypeNative = 1 << 7,            ///< Native ads
    RNAAdTypeMREC = 1 << 8               ///< MREC (Medium Rectangle) ads
};

#pragma mark - Conversion Functions

/**
 * Converts React Native ad type to Appodeal ad type
 * @param adType The React Native ad type to convert
 * @return The corresponding Appodeal ad type
 */
AppodealAdType AppodealAdTypeFromRNAAdType(RNAAdType adType);

/**
 * Converts Appodeal ad type to React Native ad type
 * @param adType The Appodeal ad type to convert
 * @return The corresponding React Native ad type
 */
RNAAdType RNAAdTypeFromaAppodealAdType(AppodealAdType adType);

/**
 * Converts React Native ad type to Appodeal show style
 * @param adType The React Native ad type to convert
 * @return The corresponding Appodeal show style
 */
AppodealShowStyle AppodealShowStyleFromRNAAdType(RNAAdType adType);

/**
 * Converts React Native purchase type to Appodeal purchase type
 * @param type The React Native purchase type integer
 * @return The corresponding Appodeal purchase type
 */
APDPurchaseType APDPurchaseTypeFromRNPurchase(NSInteger type);

/**
 * Checks if the given ad type is a banner type
 * @param adType The ad type to check
 * @return YES if the ad type is a banner, NO otherwise
 */
BOOL isRNAAdTypeBanner(RNAAdType adType);

/**
 * Converts string representation to banner view size
 * @param size String representation of banner size ("tablet" or "phone")
 * @return CGSize representing the banner dimensions
 */
CGSize RNAppodealBannerViewSizeFromString(NSString *size);

/**
 * Converts banner view size to string representation
 * @param size CGSize representing banner dimensions
 * @return String representation of the banner size
 */
NSString *NSStringFromAppodealBannerViewSize(CGSize size);

/**
 * Converts Appodeal consent status to NSNumber
 * @param status The Appodeal consent status
 * @return NSNumber representation of the consent status
 */
NSNumber *RNAppodealConsentStatusFrom(APDConsentStatus status);

#ifdef __cplusplus
}
#endif

NS_ASSUME_NONNULL_END
