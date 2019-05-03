/*
 *  YMALog.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */


#import <Foundation/Foundation.h>

/**
 * YMALog provides control over SDK logging.
 *
 * @warning Class is deprecated in favor of #YMAMobileAds
 */
__attribute__((deprecated("[YMAMobileAds enableLogging] should be used instead")))
@interface YMALog : NSObject

/**
 * Enables SDK logs. Logs are disabled by default.
 */
+ (void)enableLogging;

@end
