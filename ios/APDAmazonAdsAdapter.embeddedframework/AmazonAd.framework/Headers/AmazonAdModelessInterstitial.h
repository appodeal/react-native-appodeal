//
//  AmazonAdModelessInterstitial.h
//  AmazonMobileAdsSDK
//
//  Copyright (c) 2015-2016 Amazon.com. All rights reserved.
//

#import <Foundation/Foundation.h>

@class AmazonAdError;
@class AmazonAdOptions;
@protocol AmazonAdModelessInterstitialDelegate;

/**
 * Amazon Modeless Interstitial
 */
@interface AmazonAdModelessInterstitial : NSObject

/**
 * Delegate to receive modeless interstitial callbacks.
 */
@property (nonatomic, weak) id<AmazonAdModelessInterstitialDelegate> delegate;
/*
 * True if this modeless interstitial instance is ready to present in the container view.
 */
@property (readonly) BOOL isReady;

/**
 * Create and instantiate a modeless interstitial.
 * @param view UIView where ad will be placed
 */
+ (instancetype)modelessInterstitialWithContainerView:(UIView *)view;

/**
 * Load a modeless interstitial.
 * @param options ad load options
 */
- (void)load:(AmazonAdOptions *)options;

/**
 * Call this method when the container view becomes visible on screen.
 * @return YES if this modeless interstitial instance is sucessfully presented on the screen
 */
- (BOOL)onPresented;

/**
 * Call this method when the container view becomes invisible.
 */
- (void)onHidden;

@end

@protocol AmazonAdModelessInterstitialDelegate <NSObject>

@required

/**
 * The modeless interstitial relies on this method to determine which view controller will be
 * used for presenting/dismissing modal views, such as the browser view presented
 * when a user clicks on an ad.
 */
- (UIViewController *)viewControllerForPresentingModalView;

@optional

/**
 * Sent when load has succeeded and the modeless interstitial isReady for display at the appropriate moment.
 * @param modelessInterstitial Amazon Modeless Interstitial
 */
- (void)modelessInterstitialDidLoad:(AmazonAdModelessInterstitial *)modelessInterstitial;

/**
 * Sent when load has failed, typically because of network failure, an application configuration error or lack of interstitial inventory
 * @param modelessInterstitial Amazon Modeless Interstitial
 * @param error Amazon Ad Error
 */
- (void)modelessInterstitialDidFailToLoad:(AmazonAdModelessInterstitial *)modelessInterstitial withError:(AmazonAdError *)error;

/**
 * Sent when trying to present an expired modeless interstitial
 * @param modelessInterstitial Amazon Modeless Interstitial
 */
- (void)modelessInterstitialDidExpire:(AmazonAdModelessInterstitial *)interstitial;

@end
