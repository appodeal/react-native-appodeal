/*
 *  YMAMobileAds.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

@interface YMAMobileAds : NSObject

/**
 * Enables SDK logs. Logs are disabled by default.
 */
+ (void)enableLogging;

/**
 * Returns SDK version.
 *
 * @return SDK version in X.YY format.
 */
+ (NSString *)SDKVersion;

/** Enable/disable location tracking.
 Location is collected automatically if tracking is enabled and application has appropriate permission.
 SDK does not prompt user to allow location tracking.
 Location which is passed in YMAAdRequest overrides location which is collected automatically.
 Automatic location tracking is enabled by default.

 @param enabled NO to disable automatic location tracking; otherwise location is tracked automatically.
 */
+ (void)setLocationTrackingEnabled:(BOOL)enabled;

@end
