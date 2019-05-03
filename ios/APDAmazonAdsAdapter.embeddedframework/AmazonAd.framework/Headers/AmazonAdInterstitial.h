//
//  AmazonAdInterstitial.h
//  AmazonMobileAdsSDK
//
//  Copyright (c) 2014-2016 Amazon.com. All rights reserved.
//

#import <Foundation/Foundation.h>

@class AmazonAdError;
@class AmazonAdOptions;
@protocol AmazonAdInterstitialDelegate;

/**
 * Amazon Modal Interstitial
 */
@interface AmazonAdInterstitial : NSObject

/**
 * Delegate to receive interstitial callbacks
 */
@property (nonatomic, weak) id<AmazonAdInterstitialDelegate> delegate;

/**
 * True if this interstitial instance is ready to present on screen
 */
@property (readonly) BOOL isReady;

/**
 * True if any interstitial is currently presented on screen
 */
@property (readonly) BOOL isShowing;

/**
 * Create and instantiate an interstitial
 */
+ (instancetype)amazonAdInterstitial;

/**
 * Load an interstitial
 * @param options ad load options
 */
- (void)load:(AmazonAdOptions *)options;

/**
 * Present an interstitial on screen.
 * @param viewController View Controller presenting the Modal Interstitial view
 */
- (void)presentFromViewController:(UIViewController *)viewController;

@end

@protocol AmazonAdInterstitialDelegate <NSObject>

@optional

/**
 * Sent when load has succeeded and the interstitial isReady for display at the appropriate moment.
 * @param interstitial Amazon Modal Interstitial
 */
- (void)interstitialDidLoad:(AmazonAdInterstitial *)interstitial;

/** 
 * Sent when load has failed, typically because of network failure, an application configuration error or lack of interstitial inventory
 * @param interstitial Amazon Modal Interstitial
 */
- (void)interstitialDidFailToLoad:(AmazonAdInterstitial *)interstitial withError:(AmazonAdError *)error;

/**
 * Sent immediately before interstitial is presented on the screen. At this point you should pause any animations, timers or other
 * activities that assume user interaction and save app state. User may press Home or touch links to other apps like iTunes within the
 * interstitial, leaving your app.
 * @param interstitial Amazon Modal Interstitial
 */
- (void)interstitialWillPresent:(AmazonAdInterstitial *)interstitial;

/**
 * Sent when interstitial has been presented on the screen.
 * @param interstitial Amazon Modal Interstitial
 */
- (void)interstitialDidPresent:(AmazonAdInterstitial *)interstitial;

/**
 * Sent immediately before interstitial leaves the screen, restoring your app and your view controller used for presentAdFromViewController:.
 * At this point you should restart any foreground activities paused as part of interstitialWillPresent:.
 * @param interstitial Amazon Modal Interstitial
 */
- (void)interstitialWillDismiss:(AmazonAdInterstitial *)interstitial;

/**
 * Sent when the user has dismissed interstitial and it has left the screen.
 * @param interstitial Amazon Modal Interstitial
 */
- (void)interstitialDidDismiss:(AmazonAdInterstitial *)interstitial;

@end
