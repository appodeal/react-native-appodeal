//
//  APDBannerView.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Appodeal/APDSdk.h>

#ifdef ADVANCED_INTEGRATION
#import <Appodeal/AppodealRequestDelegateProtocol.h>
#endif


@class APDBannerView;
/*!
 *  Declaration of banner view delegate
 */
@protocol APDBannerViewDelegate <NSObject>

@optional

/*!
 *  Method called when banner view loaded on first attempt
 *
 *  @param bannerView Ready banner view
 */
- (void)bannerViewDidLoadAd:(APDBannerView *)bannerView;

/*!
 *  Method called when precache banner view loaded
 *  After refresh, usual banner will be shown if loaded
 *  @param precacheBannerView Ready precache
 */
- (void)precacheBannerViewDidLoadAd:(APDBannerView *)precacheBannerView __attribute__((deprecated("Use -bannerViewDidLoadAd: instead")));

/*!
 *  Method called after any banner was shown or refreshed
 *
 *  @param bannerView On screen banner view
 */
- (void)bannerViewDidShow:(APDBannerView *)bannerView;


/*!
 *  Method called after any banner refresh
 *
 *  @param bannerView On screen banner view
 */
- (void)bannerViewDidRefresh:(APDBannerView *)bannerView __attribute__((deprecated("Use -bannerViewDidShow: instead")));

/*!
 *  Method called if banner view mediation failed
 *
 *  @param bannerView Failed banner
 *  @param error      Occurred error
 */
- (void)bannerView:(APDBannerView *)bannerView didFailToLoadAdWithError:(NSError *)error;

/*!
 *  Call when user taps on banner
 *
 *  @param bannerView On screen banner view
 */
- (void)bannerViewDidReceiveTapAction:(APDBannerView *)bannerView;

@end


@interface APDBannerView : UIView 

#ifdef ADVANCED_INTEGRATION
@property (weak, nonatomic) IBOutlet id<APDBannerViewRequestDelegate> requestDelegate;
#endif
/*!
 *  Set banner view delegate
 */
@property (weak, nonatomic) IBOutlet id<APDBannerViewDelegate> delegate;

/*!
 *  Set non-null root view controller before loading banner view
 */
@property (weak, nonatomic) IBOutlet UIViewController *rootViewController;

/*!
 *  Set custom placement, turned on in Appodeal Dashboard
 */
@property (copy, nonatomic) IBInspectable NSString *placement;

/*!
 *  If this flag is set to YES, banner view will auto-resize after screen rotation
 *  (It is possible to use the flag only if the application supports one orientation)
 *  Set to NO by default
 */
@property (assign, nonatomic) IBInspectable BOOL usesSmartSizing;

/*!
 *  If this flag is set to YES, banner view will refresh after refresh interval turned on in Appodeal Dashboard
 *  Set to YES by default
 */
@property (assign, nonatomic) IBInspectable BOOL autoRefreshing;

/*!
 *  Set valid banner size. Valid values: kAPDAdSize320x50, kAPDAdSize728x90
 */
@property (assign, nonatomic) IBInspectable CGSize adSize;

/*!
 *  Set banner refresh animation
 */
@property (assign, nonatomic) IBInspectable UIViewAnimationOptions refreshAnimation;

/*!
 *  Set banner background visibility
 */
@property (assign, nonatomic) BOOL backgroundVisible;

/*!
 *  Set custom SDK
 */
@property (weak, nonatomic) APDSdk *customSdk;

/*!
 *  Get banner availability
 */
@property (assign, nonatomic, readonly, getter=isReady) BOOL ready;

/*!
 *  Initializer
 *
 *  @param adSize kAPDAdSize320x50, kAPDAdSize728x90
 *
 *  @return Instance of APDBannerView
 */
- (instancetype)initWithSize:(CGSize)adSize;

/*!
 *  Start loading
 */
- (void)loadAd;

/*!
 *  Call this method when orientation changes
 *
 *  @param orientation Current interface orientation
 */
- (void)rotateToOrientation:(UIInterfaceOrientation)orientation;

@end


