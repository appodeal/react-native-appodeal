/*
 *  YMAErrors.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

/* Yandex Mobile Ads error domain. */
extern NSString *const kYMAAdsErrorDomain;

/* Yandex Mobile Ads error codes. */
typedef NS_ENUM(NSUInteger, YMAAdErrorCode) {
    /* Returned when block ID is not specified. */
    YMAAdErrorCodeEmptyBlockID,
    /* Returned when banner size is invalid. */
    YMAAdErrorCodeInvalidBannerSize,
    /* Returned when Application ID is invalid. */
    YMAAdErrorCodeInvalidUUID,
    /* Returned when provided block ID doesn't exist. */
    YMAAdErrorCodeNoSuchBlockID,
    /* Returned when ad request completed successfully, but there are no ads at the moment. */
    YMAAdErrorCodeNoFill,
    /* Returned for unexpected server responses. */
    YMAAdErrorCodeBadServerResponse,
    /* Returned when requested ad size doesn't match received ad size. */
    YMAAdErrorCodeBannerSizeMismatch,
    /* Returned when requested ad type doesn't match received ad type. */
    YMAAdErrorCodeAdTypeMismatch,
    /* Returned when ad service is temporarily not available. Ad request may be retried later. */
    YMAAdErrorCodeServiceTemporarilyNotAvailable,
    /* Returned for attempt to display interstitial which has already been displayed. */
    YMAAdErrorCodeInterstitialHasAlreadyBeenPresented,
    /* Returned when interstitial can not be displayed in current orientation. */
    YMAAdErrorCodeInterstitialOrientationMismatch,
    /* Returned for attempt to load ad if AppMetrica has not been activated. */
    YMAAdErrorCodeMetricaNotStarted
};
