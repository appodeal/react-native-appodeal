/*
 *  YMAIcon.h
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
 * Type of resource element.
 */
typedef NS_ENUM(NSUInteger, YMAIconResourceType) {
    YMAIconResourceTypeUnknown,
    YMAIconResourceTypeStatic,
    YMAIconResourceTypeIFrame,
    YMAIconResourceTypeHTML
};

/**
 * Icon horizontal position. 
 * For YMAIconHorizontalPositionLeft or YMAIconHorizontalPositionRight
 * icon should be positioned to left or right accordingly.
 * YMAIconHorizontalPositionLeftOffset means that position from x property should be used.
 */
typedef NS_ENUM(NSUInteger, YMAIconHorizontalPosition) {
    YMAIconHorizontalPositionLeft,
    YMAIconHorizontalPositionRight,
    YMAIconHorizontalPositionLeftOffset
};

/**
 * Icon vertical position. 
 * For YMAIconVerticalPositionTop or YMAIconVerticalPositionBottom 
 * icon should be positioned to top or bottom accordingly.
 * YMAIconVerticalPositionTopOffset means that position from y property should be used.
 */
typedef NS_ENUM(NSUInteger, YMAIconVerticalPosition) {
    YMAIconVerticalPositionTop,
    YMAIconVerticalPositionBottom,
    YMAIconVerticalPositionTopOffset
};

@interface YMAIcon : NSObject

/**
 * Industry initiative that icon supports.
 */
@property (nonatomic, copy, readonly) NSString *program;

/**
 * Icon horizontal position.
 * For YMAIconHorizontalPositionLeft or YMAIconHorizontalPositionRight
 * icon should be positioned to left or right accordingly.
 * YMAIconHorizontalPositionLeftOffset means that position from x property should be used.
 */
@property (nonatomic, assign, readonly) YMAIconHorizontalPosition horizontalPosition;

/**
 * Icon vertical position.
 * For YMAIconVerticalPositionTop or YMAIconVerticalPositionBottom
 * icon should be positioned to top or bottom accordingly.
 * YMAIconVerticalPositionTopOffset means that position from y property should be used.
 */
@property (nonatomic, assign, readonly) YMAIconVerticalPosition verticalPosition;

/**
 * Horizontal position that the video player uses
 * to place the top-left corner of the icon relative to the ad display area
 * (not necessarily the video player display area).
 * Should only be used if horizontalPosition is YMAIconHorizontalPositionLeftOffset.
 */
@property (nonatomic, assign, readonly) int x;

/**
 * Vertical position that the video player uses
 * to place the top-left corner of the icon relative to the ad display area 
 * (not necessarily the video player display area).
 * Should only be used if verticalPosition is YMAIconVerticalPositionTopOffset.
 */
@property (nonatomic, assign, readonly) int y;

/**
 * The width (in pixels) of the icon to be overlaid on the Ad.
 */
@property (nonatomic, assign, readonly) int width;

/**
 * The height (in pixels) of the icon to be overlaid on the Ad.
 */
@property (nonatomic, assign, readonly) int height;

/**
 * Resource type.
 */
@property (nonatomic, assign, readonly) YMAIconResourceType resourceType;

/**
 * URI to icon resource file.
 */
@property (nonatomic, copy, readonly) NSString *resourceURI;

@end
