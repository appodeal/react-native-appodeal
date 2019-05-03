//
//  AmazonAdView.h
//  AmazonMobileAdsSDK
//
//  Copyright (c) 2012-2016 Amazon.com. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "AmazonAdOptions.h"

@class AmazonAdError;
@class AmazonAdOptions;
@protocol AmazonAdViewDelegate;

/**
 * Amazon Banner Ad View
 */
@interface AmazonAdView : UIView

@property (nonatomic, weak) id<AmazonAdViewDelegate> delegate;

/**
 * Create an Ad view and instantiate it using one of the standard AdSize options specified in AmazonAdOptions
 */
+ (instancetype)amazonAdViewWithAdSize:(CGSize)adSize;
/**
 * Instantiate an auto size ad via nib or storyboard
 */
- (instancetype)initWithCoder:(NSCoder *)aDecoder;
/** 
 * Instantiate an auto size ad
 */
- (instancetype)initWithFrame:(CGRect)frame;
/**
 * Instantiate using one of the standard AdSize options specified in AmazonAdOptions.
 */
- (instancetype)initWithAdSize:(CGSize)adSize;

/**
 * Set vertical alignment constraint for an ad in the ad view container
 * @param alignment Vertical alignment property: top, center, bottom or fitToContent
 * @see AmazonAdOptions.h
 */
- (void)setVerticalAlignment:(AmazonAdVerticalAlignment)alignment;
/**
 * Set horizontal alignment constraint for an ad in the ad view container
 * @param alignment Horizontal alignment property: left, center or right
 * @see AmazonAdOptions.h
 */
- (void)setHorizontalAlignment:(AmazonAdHorizontalAlignment)alignment;

/**
 * Loads an Ad in this view
 * @param options ad load options 
 */
- (void)loadAd:(AmazonAdOptions *)options;

/** 
 * @return YES if the Ad in this view is expanded, NO otherwise.
 */
- (BOOL)isAdExpanded;

@end

@protocol AmazonAdViewDelegate <NSObject>

@required

/**
 * The ad view relies on this method to determine which view controller will be 
 * used for presenting/dismissing modal views, such as the browser view presented 
 * when a user clicks on an ad.
 */
- (UIViewController *)viewControllerForPresentingModalView;

@optional

/**
 * Callback triggered when the banner ad view will expand by presenting a modal view.
 * @param view Banner Ad View
 */
- (void)adViewWillExpand:(AmazonAdView *)view;
/**
 * Callback triggered when the banner ad view will collapse by dismissing a modal view.
 * @param view Banner Ad View
 */
- (void)adViewDidCollapse:(AmazonAdView *)view;


/**
 * This callback responds to the mraid resize function which changes the size and potentially location of this view.
 * The frame parameter's origin specifies how the top-right corner of the view should move 
 * (e.g. x = 0 and y = -50 would represent moving the top-right corner up 50 pixels. 
 * @param view Banner Ad View
 * @param frame The position and size the banner ad view will expand to.
 */
- (void)adViewWillResize:(AmazonAdView *)view toFrame:(CGRect)frame;

/**
 * Allows the app to handle resizing and moving any views containing this banner ad view.
 * @param view Banner Ad View
 * @param frame The position and size the banner ad view will epxand to.
 * @return  YES, if the SDK only changes the size of the ad view and it is the responsibility to
 *          make sure the location of the view is correct according ot the frame parameter's origin.
 *          NO, if the SDK will modify the origin of the ad view which may result in the ad view going
 *          out of the bounds of the any parent view.
 */
- (BOOL)willHandleAdViewResize:(AmazonAdView *)view toFrame:(CGRect)frame;

/**
 * Callback triggered when the ad view failed to load an ad.
 * @param view Banner Ad View
 * @param error Amazon Ad Error
 */
- (void)adViewDidFailToLoad:(AmazonAdView *)view withError:(AmazonAdError *)error;
/**
 * Callback triggered when the ad view successfully loaded an ad.
 * @param view Banner Ad View
 */
- (void)adViewDidLoad:(AmazonAdView *)view;

@end
