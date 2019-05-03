/*
 *  YMAVASTTracker.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

@class YMACreative;
@class YMAVASTAd;

/**
 * Constants below describe possible VAST ad events and errors.
 * They should be used as eventName parameter in
 * trackEvent:eventName: method to track VAST events.
 */

extern NSString *const kYMAVASTAdImpression;

/**
 * Constants below describe possible VAST ad creative events.
 * They should be used as eventName parameter in
 * trackCreativeEvent:eventName: method to track Creative events.
 */
extern NSString *const kYMACreativeStart;
extern NSString *const kYMACreativeFirstQuartile;
extern NSString *const kYMACreativeMidpoint;
extern NSString *const kYMACreativeThirdQuartile;
extern NSString *const kYMACreativeComplete;
extern NSString *const kYMACreativeMute;
extern NSString *const kYMACreativeUnmute;
extern NSString *const kYMACreativeFullscreen;
extern NSString *const kYMACreativeExpand;
extern NSString *const kYMACreativeCollapse;
extern NSString *const kYMACreativeClose;

extern NSString *const kYMACreativeClickTracking;

/**
 * YMAVASTTracker tracks VAST events by sending them to server.
 */
@interface YMAVASTTracker : NSObject

/**
 * Track ad event.
 * @param ad YMAVASTAd object, that caused an event
 * @param eventName String event name. Possible values are described above
 */
+ (void)trackAdEvent:(YMAVASTAd *)ad eventName:(NSString *)eventName;

/**
 * Track creative event.
 * @param creative YMACreative, that caused an event
 * @param eventName String event name. Possible values are described above
 */
+ (void)trackCreativeEvent:(YMACreative *)creative eventName:(NSString *)eventName;

@end
