#import "RNADefines.h"
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>

#pragma mark - Event Constants Implementation

// Event system prefix
NSString *const kRNAEventPrefix = @"rna_";

// Appodeal SDK lifecycle events
NSString *const kEventAppodealInitialized       = @"onAppodealInitialized";
NSString *const kEventAppodealDidReceiveRevenue = @"onAppodealDidReceiveRevenue";

// Banner ad events
NSString *const kEventBannerLoaded          = @"onBannerLoaded";
NSString *const kEventBannerFailedToLoad    = @"onBannerFailedToLoad";
NSString *const kEventBannerExpired         = @"onBannerExpired";
NSString *const kEventBannerShown           = @"onBannerShown";
NSString *const kEventBannerClicked         = @"onBannerClicked";

// Interstitial ad events
NSString *const kEventInterstitialLoaded            = @"onInterstitialLoaded";
NSString *const kEventInterstitialFailedToLoad      = @"onInterstitialFailedToLoad";
NSString *const kEventInterstitialFailedToPresent   = @"onInterstitialFailedToShow";
NSString *const kEventInterstitialExpired           = @"onInterstitialExpired";
NSString *const kEventInterstitialShown             = @"onInterstitialShown";
NSString *const kEventInterstitialClosed            = @"onInterstitialClosed";
NSString *const kEventInterstitialClicked           = @"onInterstitialClicked";

// Rewarded video ad events
NSString *const kEventRewardedVideoLoaded           = @"onRewardedVideoLoaded";
NSString *const kEventRewardedVideoFailedToLoad     = @"onRewardedVideoFailedToLoad";
NSString *const kEventRewardedVideoFailedToPresent  = @"onRewardedVideoFailedToShow";
NSString *const kEventRewardedVideoExpired          = @"onRewardedVideoExpired";
NSString *const kEventRewardedVideoShown            = @"onRewardedVideoShown";
NSString *const kEventRewardedVideoClosed           = @"onRewardedVideoClosed";
NSString *const kEventRewardedVideoFinished         = @"onRewardedVideoFinished";
NSString *const kEventRewardedVideoClicked          = @"onRewardedVideoClicked";

#pragma mark - RCTConvert Category Implementation

@implementation RCTConvert (Appodeal)

/**
 * Converts string log level to APDLogLevel enum
 * Supports: "debug", "verbose", "off"
 * Default: APDLogLevelInfo
 */
RCT_ENUM_CONVERTER(APDLogLevel, (@{
    @"debug":    @(APDLogLevelDebug),
    @"verbose":  @(APDLogLevelVerbose),
    @"off":      @(APDLogLevelOff),
}), APDLogLevelInfo, integerValue)

/**
 * Converts string gender to AppodealUserGender enum
 * Supports: "male", "female"
 * Default: AppodealUserGenderOther
 */
RCT_ENUM_CONVERTER(AppodealUserGender, (@{
    @"male":    @(AppodealUserGenderMale),
    @"female":  @(AppodealUserGenderFemale),
}), AppodealUserGenderOther, integerValue)

/**
 * Converts JSON to RNAAdType
 * Currently returns RNAAdTypeBannerTop as default
 * TODO: Implement proper JSON parsing for ad types
 */
+ (RNAAdType)RNAAdType:(id)json RCT_DYNAMIC {
    return RNAAdTypeBannerTop;
}

@end

#pragma mark - Utility Functions Implementation

/**
 * Returns an array of all supported event method names
 * Used for event registration and validation
 * @return NSArray containing all supported event method names as strings
 */
NSArray<NSString *> *RNASupportedMethods(void) {
    return @[
        // Appodeal SDK events
        kEventAppodealInitialized,
        kEventAppodealDidReceiveRevenue,
        
        // Banner events
        kEventBannerLoaded,
        kEventBannerFailedToLoad,
        kEventBannerExpired,
        kEventBannerShown,
        kEventBannerClicked,
        
        // Interstitial events
        kEventInterstitialLoaded,
        kEventInterstitialFailedToLoad,
        kEventInterstitialShown,
        kEventInterstitialFailedToPresent,
        kEventInterstitialExpired,
        kEventInterstitialClosed,
        kEventInterstitialClicked,
        
        // Rewarded video events
        kEventRewardedVideoLoaded,
        kEventRewardedVideoFailedToLoad,
        kEventRewardedVideoFailedToPresent,
        kEventRewardedVideoExpired,
        kEventRewardedVideoShown,
        kEventRewardedVideoClosed,
        kEventRewardedVideoFinished,
        kEventRewardedVideoClicked
    ];
}

/**
 * Converts React Native ad type to Appodeal ad type
 * Performs bitwise operations to map RNAAdType to AppodealAdType
 * @param adType The React Native ad type to convert
 * @return The corresponding Appodeal ad type
 */
AppodealAdType AppodealAdTypeFromRNAAdType(RNAAdType adType) {
    AppodealAdType result = 0;
    
    // Map interstitial ads
    if ((adType & RNAAdTypeInterstitial) > 0) {
        result |= AppodealAdTypeInterstitial;
    }
    
    // Map banner ads (check if any banner type is set)
    if (isRNAAdTypeBanner(adType) > 0) {
        result |= AppodealAdTypeBanner;
    }
    
    // Map rewarded video ads
    if ((adType & RNAAdTypeRewardedVideo) > 0) {
        result |= AppodealAdTypeRewardedVideo;
    }
    
    // Map native ads
    if ((adType & RNAAdTypeNative) > 0) {
        result |= AppodealAdTypeNativeAd;
    }
    
    // Map MREC ads
    if ((adType & RNAAdTypeMREC) > 0) {
        result |= AppodealAdTypeMREC;
    }
    
    return result;
}

/**
 * Converts Appodeal ad type to React Native ad type
 * Performs bitwise operations to map AppodealAdType to RNAAdType
 * @param adType The Appodeal ad type to convert
 * @return The corresponding React Native ad type
 */
RNAAdType RNAAdTypeFromaAppodealAdType(AppodealAdType adType) {
    RNAAdType result = 0;
    
    // Map interstitial ads
    if ((adType & AppodealAdTypeInterstitial) > 0) {
        result |= RNAAdTypeInterstitial;
    }
    
    // Map banner ads
    if ((adType & AppodealAdTypeBanner) > 0) {
        result |= RNAAdTypeBanner;
    }
    
    // Map rewarded video ads
    if ((adType & AppodealAdTypeRewardedVideo) > 0) {
        result |= RNAAdTypeRewardedVideo;
    }
    
    // Map native ads
    if ((adType & AppodealAdTypeNativeAd) > 0) {
        result |= RNAAdTypeNative;
    }
    
    // Map MREC ads
    if ((adType & AppodealAdTypeMREC) > 0) {
        result |= RNAAdTypeMREC;
    }
    
    return result;
}

/**
 * Converts React Native ad type to Appodeal show style
 * Determines the appropriate show style based on ad type
 * @param adType The React Native ad type to convert
 * @return The corresponding Appodeal show style
 */
AppodealShowStyle AppodealShowStyleFromRNAAdType(RNAAdType adType) {
    // Check for interstitial ads
    if ((adType & RNAAdTypeInterstitial) > 0) {
        return AppodealShowStyleInterstitial;
    }
    
    // Check for bottom banner ads
    if ((adType & RNAAdTypeBannerBottom) > 0) {
        return AppodealShowStyleBannerBottom;
    }
    
    // Check for top banner ads
    if ((adType & RNAAdTypeBannerTop) > 0) {
        return AppodealShowStyleBannerTop;
    }
    
    // Check for rewarded video ads
    if ((adType & RNAAdTypeRewardedVideo) > 0) {
        return AppodealShowStyleRewardedVideo;
    }
    
    // Default: no show style
    return 0;
}

/**
 * Converts React Native purchase type to Appodeal purchase type
 * Simple cast from NSInteger to APDPurchaseType
 * @param type The React Native purchase type integer
 * @return The corresponding Appodeal purchase type
 */
APDPurchaseType APDPurchaseTypeFromRNPurchase(NSInteger type) {
    return (APDPurchaseType)type;
}

/**
 * Checks if the given ad type is a banner type
 * Tests for any banner-related ad type (generic, bottom, or top)
 * @param adType The ad type to check
 * @return YES if the ad type is a banner, NO otherwise
 */
BOOL isRNAAdTypeBanner(RNAAdType adType) {
    return ((adType & RNAAdTypeBanner) > 0 ||
            (adType & RNAAdTypeBannerBottom) > 0 ||
            (adType & RNAAdTypeBannerTop) > 0);
}

/**
 * Converts string representation to banner view size
 * Maps "tablet" to 728x90 and defaults to 320x50 for phones
 * @param size String representation of banner size ("tablet" or "phone")
 * @return CGSize representing the banner dimensions
 */
CGSize RNAppodealBannerViewSizeFromString(NSString *size) {
    if ([size isEqualToString:@"tablet"]) {
        return kAppodealUnitSize_728x90;
    } else {
        return kAPDAdSize320x50;
    }
}

/**
 * Converts banner view size to string representation
 * Maps 728x90 to "tablet" and defaults to "phone" for other sizes
 * @param size CGSize representing banner dimensions
 * @return String representation of the banner size
 */
NSString *NSStringFromAppodealBannerViewSize(CGSize size) {
    if (CGSizeEqualToSize(size, kAppodealUnitSize_728x90)) {
        return @"tablet";
    } else {
        return @"phone";
    }
}

/**
 * Converts Appodeal consent status to NSNumber
 * Simple wrapper to convert enum to NSNumber for React Native
 * @param status The Appodeal consent status
 * @return NSNumber representation of the consent status
 */
NSNumber *RNAppodealConsentStatusFrom(APDConsentStatus status) {
    return @(status);
}
