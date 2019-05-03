//
//  AmazonAdOptions.h
//  AmazonMobileAdsSDK
//
//  Copyright (c) 2012-2016 Amazon.com. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Vertical alignment setting options.
 */
typedef NS_ENUM(NSInteger, AmazonAdVerticalAlignment)
{
    AmazonAdVerticalAlignmentTop,
    AmazonAdVerticalAlignmentCenter,
    AmazonAdVerticalAlignmentBottom,
    AmazonAdVerticalAlignmentFitToContent
};

/**
 * Horizontal alignment setting options.
 */
typedef NS_ENUM(NSInteger, AmazonAdHorizontalAlignment)
{
    AmazonAdHorizontalAlignmentLeft,
    AmazonAdHorizontalAlignmentCenter,
    AmazonAdHorizontalAlignmentRight
};

/**
 * Standard 320x50 Amazon Ad Size for phones.
 */
extern const CGSize AmazonAdSize_320x50;

/**
 * Standard 300x250 Amazon Ad Size.
 */
extern const CGSize AmazonAdSize_300x250;

/**
 * Standard 600x90 Amazon Ad Size for tablets.
 */
extern const CGSize AmazonAdSize_600x90;

/** 
 * Standard 728x90 Amazon Ad Size for tablets.
 */
extern const CGSize AmazonAdSize_728x90;

/**
 * Standard 1024x50 Amazon Ad Size for tablets.
 */
extern const CGSize AmazonAdSize_1024x50;

/**
 * AmazonAdOptions contains a set of options for loading Ads.
 */
@interface AmazonAdOptions : NSObject

/**
 * Set the isTestRequest to YES, during development/integration only. 
 * This option is turned off by default.
 */
@property (nonatomic) BOOL isTestRequest;

/**
 * If your application is enabled to read lat/long, you can configure 
 * this option to receive geo targetted ads.
 * This option is turned off by default.
 */
@property (nonatomic) BOOL usesGeoLocation;

/**
 * This will set the timeout of the request for the ad
 *
 * The minimum value is 5 seconds and the maximum value is 60 seconds
 * The default value is 10 seconds
 */
@property (nonatomic) NSTimeInterval timeout;

/**
 * @return an instance of options to use.
 */
+ (instancetype)options;

/**
 * Sets an advanced option property in the form of a key/value pair.
 * @param value Advanced option property value
 * @param key Advanced option property key
 */
- (void)setAdvancedOption:(NSString *)value forKey:(NSString *)key;

/**
 * @return a dictionary of the advanced option properties.
 */
- (NSDictionary *)advancedOptions;

@end
