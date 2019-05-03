/*
 *  YMAVASTErrors.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

/* Yandex Mobile Video Ads error domain. */
extern NSString *const kYMAVASTErrorDomain;

/* Yandex Mobile Video Ads error code. */
typedef NS_ENUM(NSUInteger, YMAVASTErrorCode) {
    /* Returned for empty VAST response. */
    YMAVASTErrorCodeNoAdsInVASTResponse,
    /* Returned for invalid XML in VAST response. */
    YMAVASTErrorCodeInvalidXMLResponse,
    /* Returned for invalid VAST request. */
    YMAVASTErrorCodeCannotBuildRequest
};
