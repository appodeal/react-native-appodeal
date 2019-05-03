/*
 *  YMANativeAppInstallAdView.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <UIKit/UIKit.h>

@protocol YMANativeAppInstallAd;
@protocol YMARating;

/**
 * YMANativeAppInstallAdView represents view for app install ad type. 
 * It contains views for all of app install ad assets.
 * Views for all of the required assets should be set,
 * although ad may not contain age restrictions, icon, warning or call to action.
 * If any of the required views is not provided for ad which contains corresponding assets, binding fails.
 * Optional views may be provided to increase CTR.
 *
 * @discussion Typically, any ad has title, body and sponsored assets.
 * Ad may have age, warning, icon and call to action. In case if ad has these assets, app has to display them.
 * Other assets are optional.
 *
 * YMANativeAppInstallAd provided by loader should be used to set ad assets into view.
 */

NS_ASSUME_NONNULL_BEGIN

@interface YMANativeAppInstallAdView : UIView

/**
 * Label for age restrictions, e.g. '18+'.
 */
@property (nonatomic, weak) IBOutlet UILabel *ageLabel;

/**
 * Label for ad body.
 */
@property (nonatomic, weak) IBOutlet UILabel *bodyLabel;

/**
 * Button for call to action.
 */
@property (nonatomic, weak) IBOutlet UIButton *callToActionButton;

/**
 * Label for advertiser domain.
 */
@property (nonatomic, weak, nullable) IBOutlet UILabel *domainLabel;

/**
 * ImageView for app icon.
 */
@property (nonatomic, weak) IBOutlet UIImageView *iconImageView;

/**
 * ImageView for app large image.
 */
@property (nonatomic, weak, nullable) IBOutlet UIImageView *imageView;

/**
 * Label for app price.
 */
@property (nonatomic, weak, nullable) IBOutlet UILabel *priceLabel;

/**
 * View for app star rating.
 */
@property (nonatomic, weak, nullable) IBOutlet UIView<YMARating> *ratingView;

/**
 * Label for number of app reviews.
 */
@property (nonatomic, weak, nullable) IBOutlet UILabel *reviewCountLabel;

/**
 * Label for sponsored by.
 */
@property (nonatomic, weak, nullable) IBOutlet UILabel *sponsoredLabel;

/**
 * Label for ad title.
 */
@property (nonatomic, weak) IBOutlet UILabel *titleLabel;

/**
 * Label for ad warning.
 */
@property (nonatomic, weak) IBOutlet UILabel *warningLabel;

/**
 * Ad, which is bound to view. Ad automatically sets this property during binding.
 * Ad stops all activities such as visibility monitoring when it is released.
 */
@property (nonatomic, strong, readonly, nullable) id<YMANativeAppInstallAd> ad;

NS_ASSUME_NONNULL_END

@end
