/*
 *  YMANativeImageAdView.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <UIKit/UIKit.h>

@protocol YMANativeImageAd;

/**
 * YMANativeImageAdView represents view for image ad type. It contains views for all of image ad assets.
 * YMANativeImageAd provided by loader should be used to set ad assets into view.
 */

NS_ASSUME_NONNULL_BEGIN

@interface YMANativeImageAdView : UIView

/**
 * ImageView for ad image.
 */
@property (nonatomic, weak) IBOutlet UIImageView *imageView;

/**
 * Ad, which is bound to view. Ad automatically sets this property during binding.
 * Ad stops all activities such as visibility monitoring when it is released.
 */
@property (nonatomic, strong, readonly, nullable) id<YMANativeImageAd> ad;

@end

NS_ASSUME_NONNULL_END
