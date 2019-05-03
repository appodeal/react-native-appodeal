/*
 *  YMAAdSize.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * YMAAdSize represents banner size which should be used for creating #YMAAdView.
 */
@interface YMAAdSize : NSObject

/**
 * CGSize describing initial banner size. Real banner size is always resolved at the time of
 * #adViewDidLoad: call in #adContentSize property of #YMAAdView.
 */
@property (nonatomic, assign, readonly) CGSize size;

/**
 * Size attributes.
 */
@property (nonatomic, copy, readonly) NSDictionary *attributes;

/**
 * Banners with fixed sizes always fit maximum size passed as method argument and have transparent background.
 *
 * @param size Maximum space available for banner.
 * @return Fixed banner size.
 */
+ (instancetype)fixedSizeWithCGSize:(CGSize)size;

/**
 * Returns ad size suitable for any banner fitting screen.
 * Specific banner sizes may be selected in partner interface.
 *
 * @return Ad size suitable for any banner fitting screen.
 */
+ (instancetype)flexibleSize;

/**
 * Banners with flexible width always fit maximum width passed as method argument.
 * Banner height is resolved at the time of #adViewDidLoad: call in #adContentSize property of #YMAAdView.
 *
 * @discussion Banner height is initially zero. It is not changed automatically after being resolved.
 * However, banner intrinsic size is changed
 * so that banner will fit it's content if added with autolayout constraints.
 * Banner frame should be updated manually if frames are calculated using direct approach.
 *
 * @param width Banner container width.
 * @return Flexible banner size.
 */
+ (instancetype)flexibleSizeWithContainerWidth:(CGFloat)width;

/**
 * Banners with flexible sizes always fit maximum size passed as method argument.
 * Banners with flexible sizes stretch to container width when possible.
 *
 * @param size Maximum space available for banner.
 * @return Flexible banner size.
 */
+ (instancetype)flexibleSizeWithCGSize:(CGSize)size;

@end

NS_ASSUME_NONNULL_END

#pragma mark - Fixed sizes

/**
 * YMAAdSizeBanner_320x50 is banner size of 320x50 logical pixels.
 */
extern CGSize const YMAAdSizeBanner_320x50;

/**
 * YMAAdSizeBanner_320x100 is banner size of 320x100 logical pixels.
 */
extern CGSize const YMAAdSizeBanner_320x100;

/**
 * YMAAdSizeBanner_300x250 is banner size of 300x250 logical pixels.
 */
extern CGSize const YMAAdSizeBanner_300x250;

/**
 * YMAAdSizeBanner_300x300 is banner size of 300x300 logical pixels.
 */
extern CGSize const YMAAdSizeBanner_300x300;

/**
 * YMAAdSizeBanner_240x400 is banner size of 240x400 logical pixels.
 */
extern CGSize const YMAAdSizeBanner_240x400;

/**
 * YMAAdSizeBanner_400x240 is banner size of 400x240 logical pixels.
 */
extern CGSize const YMAAdSizeBanner_400x240;

/**
 * YMAAdSizeBanner_728x90 is banner size of 728x90 logical pixels.
 */
extern CGSize const YMAAdSizeBanner_728x90;
