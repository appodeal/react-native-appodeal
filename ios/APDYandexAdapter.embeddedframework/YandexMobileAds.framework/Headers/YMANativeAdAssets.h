
#import <Foundation/Foundation.h>

@class YMANativeAdImage;

/**
 * Ad assets.
 */
@interface YMANativeAdAssets : NSObject

/**
 * Age restrictions. Available in content and app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *age;

/**
 * Ad body text. Available in content and app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *body;

/**
 * Call to action. Available in content and app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *callToAction;

/**
 * Advertiser's domain. Available in content and app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *domain;

/**
 * Website favicon. Available in content ads.
 */
@property (nonatomic, strong, readonly, nullable) YMANativeAdImage *favicon;

/**
 * App icon. Available in app install ads.
 */
@property (nonatomic, strong, readonly, nullable) YMANativeAdImage *icon;

/**
 * Main ad image. Available in content, app install and image ads.
 */
@property (nonatomic, strong, readonly, nullable) YMANativeAdImage *image;

/**
 * Price. Available in app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *price;

/**
 * App rating. Available in app install ads.
 */
@property (nonatomic, strong, readonly, nullable) NSNumber *rating;

/**
 * App reviews number. Available in app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *reviewCount;

/**
 * Sponsored text. Available in content and app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *sponsored;

/**
 * Ad title. Available in content and app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *title;

/**
 * Warning text. Available in content and app install ads.
 */
@property (nonatomic, copy, readonly, nullable) NSString *warning;

@end
