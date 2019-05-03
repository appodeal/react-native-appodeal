//
//  AppodealBannerView.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Appodeal/APDBannerView.h>
#import <Appodeal/APDMRECView.h>
#import <UIKit/UIKit.h>


@class AppodealBannerView;
/**
 *  Banner view delegate declaration
 */
@protocol AppodealBannerViewDelegate <NSObject>

@optional

/**
 *  Method called when banner loads first, after refresh this method not call
 *
 *  @param bannerView Non-null, ready to show banner
 */
- (void)bannerViewDidLoadAd:(APDBannerView *)bannerView;

/**
 *  Method called in case that banner mediation failed
 *
 *  @param bannerView Non-null failed banner view
 *  @param error      Error occurred during mediation
 */
- (void)bannerView:(APDBannerView *)bannerView didFailToLoadAdWithError:(NSError *)error;

/**
 *  Method called when user taps on banner
 *
 *  @param bannerView Non-null banner view
 */
- (void)bannerViewDidInteract:(APDBannerView *)bannerView;

/*!
 *  Method called after any banner was shown or refreshed
 *
 *  @param bannerView On screen banner view
 */
- (void)bannerViewDidShow:(APDBannerView *)bannerView;

/**
 *  Method called after banner view reloaded content automatically
 *
 *  @param bannerView Non-null banner view
 */
- (void)bannerViewDidRefresh:(APDBannerView *)bannerView __attribute__((deprecated("Use -bannerViewDidShow: instead")));

@end

/*!
 *  Alias on APDBannerView.
 *  Needed only for backward compatibility with Appodeal SDK version 0.10.8 and lower
 *  @warning If you integrate Appodeal for the first time, we highly recommend using APDBannerView
 */
@interface AppodealBannerView : APDBannerView

/**
 *  Gets banner availability
 */
@property (assign, nonatomic, readonly, getter=isReady) BOOL ready;

/**
 *  Set delegate to receive callbacks declared in AppodealBannerViewDelegate protocol
 *
 *  @param delegate Nullable delegate
 */
- (void)setDelegate:(id<AppodealBannerViewDelegate>)delegate;

/**
 *  Gets object that you set by -setDelegate:
 *
 *  @return Nullable belegate
 */
- (id<AppodealBannerViewDelegate>)delegate;

/**
 *  Initializer
 *
 *  @discussion Objective-C
 *  @code [[AppodealBannerView alloc] initWithSize:kAPDAdSize320x50 rootViewController:self]; @endcode
 *
 *  @discussion Swift
 *  @code AppodealBannerView.init(size: kAPDAdSize320x50, rootViewController: self) @endcode
 *
 *
 *  @param size               Appodeal valid size
 *  @param rootViewController Non-null view controller
 *
 *  @return Instance of Appodeal banner view class
 */
- (instancetype)initWithSize:(CGSize)size rootViewController:(UIViewController *)rootViewController;

/**
 *  Start banner mediation
 */
- (void)loadAd;

@end


@interface AppodealMRECView : APDMRECView

/**
 *  Set delegate to receive callbacks declared in AppodealBannerViewDelegate protocol
 *
 *  @param delegate Nullable delegate
 */
- (void)setDelegate:(id<AppodealBannerViewDelegate>)delegate;

/**
 *  Gets object that you set by -setDelegate:
 *
 *  @return Nullable delegate
 */
- (id<AppodealBannerViewDelegate>)delegate;

/**
 *  Initializer
 *
 *
 *  @discussion Objective-C
 *  @code [[AppodealMRECView alloc] initWithRootViewController:self]; @endcode
 *
 *  @discussion Swift
 *  @code AppodealMRECView.init(rootViewController: self) @endcode
 *
 *  @param rootViewController Non-null view controller
 *
 *  @return Instance of Appodeal mrec view class of size 300 x 250
 */
- (instancetype) initWithRootViewController: (UIViewController *) rootViewController;


@end
