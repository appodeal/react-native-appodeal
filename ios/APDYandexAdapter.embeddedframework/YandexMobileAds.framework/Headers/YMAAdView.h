/*
 *  YMAAdView.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <UIKit/UIKit.h>

@class YMAAdRequest;
@class YMAAdSize;

@protocol YMAAdViewDelegate;

@interface YMAAdView : UIView

/**
 * Delegate receives notifications from YMAAdView and provides
 * #- (UIViewController *)viewControllerForPresentingModalView;
 */
@property (nonatomic, weak) id<YMAAdViewDelegate> delegate;

/**
 * This is required property. This is unique ad placement ID created at partner interface. 
 * Identifies ad placement at specific application.
 * Example: R-128282-4
 */
@property (nonatomic, copy, readonly) NSString *blockID;

/**
 * Create and initialize ad view with given blockID and size.
 * Simplest way to add banner to view is doing this by using methods:
 *
 * #- (void)displayAtTopInView:(UIView *)view;
 * #- (void)displayAtBottomInView:(UIView *)view;
 *
 * In more complex cases adding layout constraints manually needed.
 * If application uses autolayout ad view's intrinsicContentSize is resolved at the time of #adViewDidLoad: call.
 *
 * @param blockID Unique string that identifies ad type, size ... at application.
 * This ID should be obtained from the partner interface.
 * @param adSize Banner size. One of banner sizes represented by #YMAAdSize class.
 * Banners with flexible sizes have adaptive background.
 * @param delegate Object that implements #YMAAdViewDelegate protocol.
 */
- (instancetype)initWithBlockID:(NSString *)blockID
                         adSize:(YMAAdSize *)adSize
                       delegate:(id<YMAAdViewDelegate>)delegate;

/**
 * Create and initialize ad view with given blockID and fixed size.
 * Use #initWithBlockID:adSize:delegate: for flexible sizes.
 * Simplest way to add banner to view is doing this by using methods:
 *
 * #- (void)displayAtTopInView:(UIView *)view;
 * #- (void)displayAtBottomInView:(UIView *)view;
 *
 * In more complex cases adding layout constraints manually needed.
 * If application uses autolayout ad view's intrinsicContentSize equals to size passed to constructor.
 * @param blockID Unique string that identifies ad type, size ... at application. 
 * This ID should be obtained from the partner interface.
 * @param delegate Object that implements #YMAAdViewDelegate protocol.
 * @param size Banner size. One of fixed banner sizes defined in YMAAdSize.h or maximum space available for ad.
 */
- (instancetype)initWithBlockID:(NSString *)blockID
                           size:(CGSize)size
                       delegate:(id<YMAAdViewDelegate>)delegate __attribute__((deprecated("[YMAAdView initWithBlockID:adSize:delegate:] should be used instead")));

/**
 * Add banner at the top-center of view. This implemented by adding layout constraints to adView.
 * Can be used only in views that support autolayout.
 * @param view Parent view for the banner.
 */
- (void)displayAtTopInView:(UIView *)view;

/**
 * Add banner at the bottom-center of view. This implemented by adding layout constraints to adView.
 * Can be used only in views that support autolayout.
 * @param view Parent view for the banner.
 */
- (void)displayAtBottomInView:(UIView *)view;

/**
 * Start ad loading.
 */
- (void)loadAd;

/**
 * Start ad loading with specific request.
 * @param request Ad request containg data for targeting.
 */
- (void)loadAdWithRequest:(YMAAdRequest *)request;

/**
 * Get size of ad's content.
 * @return Size of content inside banner.
 */
- (CGSize)adContentSize;

@end

@protocol YMAAdViewDelegate <NSObject>

@optional

/**
 * Should be implemented to present ad content in webview. 
 * If method is not implemented, clicks are handled outside of the app with #[UIApplication openURL:].

 * @discussion In iOS one view controller cannot present several modal controllers simultaneously.
 * So returned view controller should be the topmost one.
 *
 * @return View controller which will present modal controller as a response to user interaction with banner.
 */
- (UIViewController *)viewControllerForPresentingModalView;

/**
 * Called each time ad view loaded banner.
 * This is a good opportunity to add this view to the hierarchy if it has not yet been added.
 * @param adView UIView subclass that displays ad.
 */
- (void)adViewDidLoad:(YMAAdView *)adView;

/**
 * Called when loading failed.
 * Usually it is because of no content received from server.
 */
- (void)adViewDidFailLoading:(YMAAdView *)adView error:(NSError *)error;

/**
 * Called whenever app becomes inactive because user clicked on an ad 
 * that will launch another application (Phone, App Store, SMS).
 */
- (void)adViewWillLeaveApplication:(YMAAdView *)adView;

/**
 * Called just before presenting user a full screen view, such as in-app browser,
 * in response to clicking on an ad.
 * Normally the user looks at the ad, dismisses it, and control returns to your
 * application by calling #adViewDidDismissScreen:. However if the user hits the
 * Home button or clicks on an App Store link your application will end. 
 * Next method called will be applicationWillResignActive: of your
 * application delegate (UIApplicationWillResignActiveNotification).
 * Immediately after that #adViewWillLeaveApplication: is called.
 */
- (void)adViewWillPresentScreen:(UIViewController *)viewController;

/**
 * Called just after fullscreen view has been dismissed.
 * This is a counterpart method for #adViewWillPresentScreen:
 */
- (void)adViewDidDismissScreen:(UIViewController *)viewController;

@end
