//
//  ALSdkSettings.h
//
//  Copyright (c) 2013, AppLovin Corporation. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ALAnnotations.h"

AL_ASSUME_NONNULL_BEGIN

/**
 * This class contains settings for the AppLovin SDK.
 */
@interface ALSdkSettings : NSObject

/**
 * Toggle test ads for the SDK. This is set to NO by default.
 *
 * If enabled, AppLovin will display test ads from our servers, guaranteeing 100% fill.
 * This is for integration testing only. Ensure that you set this to NO when the app is launched.
 */
@property (assign, atomic) BOOL isTestAdsEnabled;

/**
 * Toggle verbose logging for the SDK. This is set to NO by default. Set to NO if SDK should be silent (recommended for App Store submissions).
 *
 * If enabled AppLovin messages will appear in standard application log accessible via console.
 * All log messages will be prefixed by the "AppLovinSdk" tag.
 *
 * Verbose logging is <i>disabled</i> by default.
 */
@property (assign, atomic) BOOL isVerboseLogging;

/**
 * Comma-separated list of sizes to automatically preload. For example: "BANNER,INTER"
 * <p>
 * Auto preloading is enabled for <code>BANNER,INTER</code> by default.
 * To disable outright, set to "NONE".
 */
@property (strong, atomic) NSString *autoPreloadAdSizes;

/**
 * Comma-separated list of sizes to automatically preload. For example: "REGULAR,INCENTIVIZED"
 * <p>
 * Auto preloading is enabled for <code>REGULAR,INCENTIVIZED</code> by default.
 * To disable outright, set to "NONE".
 */
@property (strong, atomic) NSString *autoPreloadAdTypes;

/**
 * Determines whether to begin video ads in a muted state or not. Defaults to YES unless changed in the dashboard.
 */
@property (assign, atomic) BOOL muted;

@end

AL_ASSUME_NONNULL_END
