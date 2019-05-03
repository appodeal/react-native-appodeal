//
//  ALInterstitialAd.h
//
//  Created by Matt Szaro on 8/1/13.
//  Copyright (c) 2013, AppLovin Corporation. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "ALAnnotations.h"

#import "ALSdk.h"
#import "ALAdService.h"

AL_ASSUME_NONNULL_BEGIN

/**
 *  This class is used to display full-screen ads to the user.
 */
@interface ALInterstitialAd : NSObject

#pragma mark - Ad Delegates

/**
 *  An object conforming to the ALAdLoadDelegate protocol, which, if set, will be notified of ad load events.
 */
@property (strong, nonatomic, alnullable) id <ALAdLoadDelegate> adLoadDelegate;

/**
 *  An object conforming to the ALAdDisplayDelegate protocol, which, if set, will be notified of ad show/hide events.
 */
@property (strong, nonatomic, alnullable) id <ALAdDisplayDelegate> adDisplayDelegate;

/**
 *  An object conforming to the ALAdVideoPlaybackDelegate protocol, which, if set, will be notified of video start/finish events.
 */
@property (strong, nonatomic, alnullable) id <ALAdVideoPlaybackDelegate> adVideoPlaybackDelegate;

#pragma mark - Loading and Showing Ads, Class Methods

/**
 * Show an interstitial over the application's key window.
 * This will load the next interstitial and display it.
 *
 * Note that this method is functionally equivalent to calling
 * showOver: and passing [[UIApplication sharedApplication] keyWindow].
 */
+ (ALInterstitialAd *)show;

/**
 * Show a new interstitial ad. This method will display an interstitial*
 * over the given UIWindow.
 *
 * @param window  A window to show the interstitial over
 */
+ (ALInterstitialAd *)showOver:(UIWindow *)window;

/**
 * Show a new interstitial ad. This method will display an interstitial over the
 * key window
 *
 * @param placement  A placement to show the interstitial over
 */
+ (ALInterstitialAd *)showOverPlacement:(alnullable NSString *)placement;

/**
 * Show a new interstitial ad. This method will display an interstitial*
 * over the given UIWindow.
 *
 * @param window     A window to show the interstitial over
 * @param placement  A placement to show the interstitial over
 */
+ (ALInterstitialAd *)showOver:(UIWindow *)window placement:(alnullable NSString* )placement;

/**
 * Check if an ad is currently ready to display.
 *
 * @return YES if a subsequent call to a show method will result in an immediate display. NO if a call to a show method will require network activity first.
 */
+ (BOOL)isReadyForDisplay;

/**
 * Get a reference to the shared singleton instance.
 *
 * This method calls [ALSdk shared] which requires you to have an SDK key defined in <code>Info.plist</code>.
 * If you use <code>[ALSdk sharedWithKey: ...]</code> then you will need to use the instance methods instead.
 */
+ (ALInterstitialAd *)shared;

#pragma mark - Loading and Showing Ads, Instance Methods

/**
 * Show an interstitial over the application's key window.
 * This will load the next interstitial and display it.
 *
 * Note that this method is functionally equivalent to calling
 * showOver: and passing [[UIApplication sharedApplication] keyWindow].
 */
- (void)show;

/**
 * Show an interstitial over the application's key window.
 * This will load the next interstitial and display it.
 *
 * Note that this method is functionally equivalent to calling
 * showOver: and passing [[UIApplication sharedApplication] keyWindow].
 *
 * @param placement  Placement over which this ad is displayed
 */

- (void)showOverPlacement:(NSString *)placement;

/**
 * Show an interstitial over a given window.
 * @param window An instance of window to show the interstitial over.
 */
- (void)showOver:(UIWindow *)window;

/**
 * Show current interstitial over a given window and render a specified ad loaded by ALAdService.
 *
 * @param window An instance of window to show the interstitial over.
 * @param ad     The ad to render into this interstitial.
 */
- (void)showOver:(UIWindow *)window andRender:(ALAd *)ad;

/**
 * Show current interstitial over a given window and render a specified ad loaded by ALAdService.
 *
 * @param window     An instance of window to show the interstitial over.
 * @param ad         The ad to render into this interstitial.
 * @param placement  Placement over which this ad is displayed
 */
- (void)showOver:(UIWindow *)window placement:(alnullable NSString *)placement andRender:(ALAd *)ad;

/**
 * Check if an ad is currently ready to display.
 *
 * @return YES if a subsequent call to a show method will result in an immediate display. NO if a call to a show method will require network activity first.
 */
@property (readonly, atomic, getter=isReadyForDisplay) BOOL readyForDisplay;

#pragma mark - Dismissing Interstitials Expliticly

/**
 * Dismiss this interstitial.
 *
 * In general, this is not recommended as it negatively impacts click through rate.
 */
- (void)dismiss;

#pragma mark - Initialization

/**
 * Init this interstitial ad with a custom SDK instance.
 *
 * To simply display an interstitial, use [ALInterstitialAd showOver:window]
 *
 * @param sdk Instance of AppLovin SDK to use.
 */
- (instancetype)initWithSdk:(ALSdk *)sdk;
- (instancetype)initInterstitialAdWithSdk:(ALSdk *)sdk __deprecated_msg("Use initWithSdk instead.");

/**
 * Init this interstitial ad with a custom SDK instance and frame.
 *
 * To simply display an interstitial, use [ALInterstitialAd showOver:window].
 * In general, setting a custom frame is not recommended, unless absolutely necessary.
 * Interstitial ads are intended to be full-screen and may not look right if sized otherwise.
 *
 * @param frame Frame to use with the new interstitial.
 * @param sdk   Instance of AppLovin SDK to use.
 */
- (instancetype)initWithFrame:(CGRect)frame sdk:(ALSdk *)sdk;

#pragma mark - Advanced Configuration

/**
 *  Frame to be passed through to the descendent UIView containing this interstitial.
 *
 *  Note that this has no effect on video ads, as they are presented in their own view controller.
 */
@property (assign, nonatomic) CGRect frame;

/**
 *  Hidden setting to be passed through to the descendent UIView containing this interstitial.
 *
 *  Note that this has no effect on video ads, as they are presented in their own view controller.
 */
@property (assign, nonatomic) BOOL hidden;


- (instancetype) init __attribute__((unavailable("Use [ALInterstitialAd shared] or initInterstitialAdWithSdk: instead.")));

@end

AL_ASSUME_NONNULL_END
