//
//  ALErrorCodes.h
//  sdk
//
//  Created by Matt Szaro on 4/8/14.
//
//

// Loading & Displaying Ads

// Indicates that no ads are currently eligible for your device & location.
#define kALErrorCodeNoFill 204

// Indicates that a fetch ad request timed out (usually due to poor connectivity).
#define kALErrorCodeAdRequestNetworkTimeout -1001

// Indicates that the device is not connected to internet (for instance if user is in Airplane mode). This returns the same code as NSURLErrorNotConnectedToInternet.
#define kALErrorCodeNotConnectedToInternet -1009

// Indicates that an unspecified network issue occurred.
#define kALErrorCodeAdRequestUnspecifiedError -1

// Indicates that there has been a failure to render an ad on screen.
#define kALErrorCodeUnableToRenderAd -6

// Indicates that an attempt to cache a resource to the filesystem failed; the device may be out of space.
#define kALErrorCodeUnableToPrecacheResources -200

// Indicates that an attempt to cache an image resource to the filesystem failed; the device may be out of space.
#define kALErrorCodeUnableToPrecacheImageResources -201

// Indicates that an attempt to cache a video resource to the filesystem failed; the device may be out of space.
#define kALErrorCodeUnableToPrecacheVideoResources -202

// Indicates that a AppLovin servers have returned an invalid response.
#define kALErrorCodeInvalidResponse -800

// Indicates that there was an error while attempting to render a native ad
#define kALErrorCodeUnableToRenderNativeAd -700

// Indicates that an unspecified network issue occurred.
#define kALErrorCodeUnableToPreloadNativeAd -701

// Indicates that the impression has already been tracked.
#define kALErrorCodeNativeAdImpressionAlreadyTracked -702


//
// Rewarded Videos
//

// Indicates that the developer called for a rewarded video before one was available.
#define kALErrorCodeIncentiviziedAdNotPreloaded -300

// Indicates that an unknown server-side error occurred.
#define kALErrorCodeIncentivizedUnknownServerError -400

// Indicates that a reward validation requested timed out (usually due to poor connectivity).
#define kALErrorCodeIncentivizedValidationNetworkTimeout -500

// Indicates that the user exited out of the rewarded ad early
// You may or may not wish to grant a reward depending on your preference.
#define kALErrorCodeIncentivizedUserClosedVideo -600

// Indicates that a postback URL you attempted to dispatch was empty or nil.
#define kALErrorCodeInvalidURL -900
