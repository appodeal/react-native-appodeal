/*
 *  YMANativeTemplateAppearance.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class YMALabelAppearance;
@class YMAButtonAppearance;
@class YMARatingAppearance;
@class YMAImageAppearance;

typedef struct YMAHorizontalOffset {
    CGFloat left, right;
} YMAHorizontalOffset;

/**
 * YMANativeTemplateAppearance provides interfaces for native templates customization.
 * Use YMAMutableNativeTemplateAppearance to change appearance values, e.g. @p [appearance mutableCopy].
 */
@interface YMANativeTemplateAppearance : NSObject <NSCopying, NSMutableCopying>

/**
 * Banner border width.
 */
@property (nonatomic, assign, readonly) CGFloat borderWidth;

/**
 * Banner border color.
 */
@property (nonatomic, strong, readonly) UIColor *borderColor;

/**
 * Banner background color.
 */
@property (nonatomic, strong, readonly) UIColor *backgroundColor;

/**
 * Horizontal space between banner edge and content.
 */
@property (nonatomic, assign, readonly) YMAHorizontalOffset contentPadding;

/**
 * Horizontal image margins: left margin determines image offset from left content padding, 
 * right margin determines offset between image and text block.
 *
 * @warning Image margins are ignored for big images which are located below text block
 * and stretched to match banner width.
 */
@property (nonatomic, assign, readonly) YMAHorizontalOffset imageMargins;

/**
 * Age label appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMALabelAppearance *ageAppearance;

/**
 * Body label appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMALabelAppearance *bodyAppearance;

/**
 * Call to action button appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMAButtonAppearance *callToActionAppearance;

/**
 * Domain label appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMALabelAppearance *domainAppearance;

/**
 * Favicon image appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMAImageAppearance *faviconAppearance;

/**
 * Image appearance.
 *
 * @warning Image appearance is ignored for big images which are located below text block 
 * and stretched to match banner width.
 */
@property (nonatomic, copy, readonly, nullable) YMAImageAppearance *imageAppearance;

/**
 * Star rating appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMARatingAppearance *ratingAppearance;

/**
 * Sponsored label appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMALabelAppearance *sponsoredAppearance;

/**
 * Title label appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMALabelAppearance *titleAppearance;

/**
 * Review count label appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMALabelAppearance *reviewCountAppearance;

/**
 * Warning label appearance.
 */
@property (nonatomic, copy, readonly, nullable) YMALabelAppearance *warningAppearance;

/**
 * Provides appearance, configured with default values.
 *
 * @return Appearance configured with default values.
 */
+ (instancetype)defaultAppearance;

@end

/**
 * YMAMutableNativeTemplateAppearance is mutable version of YMANativeTemplateAppearance, which allows
 * to modify appearance.
 */
@interface YMAMutableNativeTemplateAppearance : YMANativeTemplateAppearance

/**
 * Banner border width.
 */
@property (nonatomic, assign) CGFloat borderWidth;

/**
 * Banner border color.
 */
@property (nonatomic, strong) UIColor *borderColor;

/**
 * Banner background color.
 */
@property (nonatomic, strong) UIColor *backgroundColor;

/**
 * Horizontal space between banner edge and content.
 */
@property (nonatomic, assign) YMAHorizontalOffset contentPadding;

/**
 * Horizontal image margins: left margin determines image offset from left content padding,
 * right margin determines offset between image and text block.
 */
@property (nonatomic, assign) YMAHorizontalOffset imageMargins;

/**
 * Age label appearance.
 */
@property (nonatomic, copy, nullable) YMALabelAppearance *ageAppearance;

/**
 * Body label appearance.
 */
@property (nonatomic, copy, nullable) YMALabelAppearance *bodyAppearance;

/**
 * Call to action button appearance.
 */
@property (nonatomic, copy, nullable) YMAButtonAppearance *callToActionAppearance;

/**
 * Domain label appearance.
 */
@property (nonatomic, copy, nullable) YMALabelAppearance *domainAppearance;

/**
 * Favicon image appearance.
 */
@property (nonatomic, copy, nullable) YMAImageAppearance *faviconAppearance;

/**
 * Image appearance.
 */
@property (nonatomic, copy, nullable) YMAImageAppearance *imageAppearance;

/**
 * Star rating appearance.
 */
@property (nonatomic, copy, nullable) YMARatingAppearance *ratingAppearance;

/**
 * Sponsored label appearance.
 */
@property (nonatomic, copy, nullable) YMALabelAppearance *sponsoredAppearance;

/**
 * Title label appearance.
 */
@property (nonatomic, copy, nullable) YMALabelAppearance *titleAppearance;

/**
 * Votes number label appearance.
 */
@property (nonatomic, copy, nullable) YMALabelAppearance *reviewCountAppearance;

/**
 * Warning label appearance.
 */
@property (nonatomic, copy, nullable) YMALabelAppearance *warningAppearance;

@end

NS_ASSUME_NONNULL_END
