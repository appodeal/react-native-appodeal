/*
 *  YMAMediaFile.h
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
 * Ad delivery method.
 */
typedef NS_ENUM(NSUInteger, YMADeliveryMethod) {
    YMADeliveryMethodUnknown,
    YMADeliveryMethodStreaming,
    YMADeliveryMethodProgressive
};

/**
 * VAST MediaFile.
 */
@interface YMAMediaFile : NSObject

/**
 * Optional media file identifier.
 */
@property (nonatomic, copy, readonly) NSString *ID;

/**
 * Location of linear file.
 */
@property (nonatomic, copy, readonly) NSString *URI;

/**
 * Ad delivery method.
 */
@property (nonatomic, assign, readonly) YMADeliveryMethod deliveryMethod;

/**
 * Video width.
 */
@property (nonatomic, assign, readonly) int width;

/**
 * Video height.
 */
@property (nonatomic, assign, readonly) int height;

/**
 * MIME type.
 */
@property (nonatomic, copy, readonly) NSString *MIMEType;

/**
 * Bitrate of encoded video in Kbps.
 */
@property (nonatomic, assign, readonly) int bitRate;

@end
