//
//  IMInterstitialDelegate.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//

/**
 * A listener for receiving notifications during the lifecycle of an interstitial.
 *
 * Note All the events in this listener will be invoked on your application's UI thread.
 
 In most cases your application will need to listen for the following events on an interstitial
 
 The outcome of an ad request (if the request succeeded or failed);
 see interstitialDidFinishLoading:(IMInterstitial*)interstitial; and interstitial:(IMInterstitial*)interstitial didFailToLoadWithError:(IMRequestStatus*)error;
 
 The full screen ad is diplayed that covered the screen. This means that the user can no longer interact with your application;
 see interstitialDidPresent:(IMInterstitial *)interstitial;
 
 The full screen ad was dismissed. The user is now free to interact with your application;
 see interstitialDidDismiss:(IMInterstitial*)interstitial;
 
 A user interaction with the ad will result in the User leaving your application context;
 see userWillLeaveApplicationFromInterstitial:(IMInterstitial*)interstitial;
 
 If your application involves running rewarded or incentivised ads, then you should, in addition to the above events, also listen for the interstitial:(IMInterstitial*)interstitial rewardActionCompletedWithRewards:(NSDictionary*)rewards event and handle it appropriately to unlock rewards for the user of your app.
 */
#import <Foundation/Foundation.h>
#import "IMRequestStatus.h"

@class IMInterstitial;
@protocol IMInterstitialDelegate <NSObject>
@optional
/**
 * Notifies the delegate that the ad server has returned an ad. Assets are not yet available.
 * Please use interstitialDidFinishLoading: to receive a callback when assets are also available.
 */
-(void)interstitialDidReceiveAd:(IMInterstitial *)interstitial;
/**
 * Notifies the delegate that the interstitial has finished loading and can be shown instantly.
 */
-(void)interstitialDidFinishLoading:(IMInterstitial*)interstitial;
/**
 * Notifies the delegate that the interstitial has failed to load with some error.
 */
-(void)interstitial:(IMInterstitial*)interstitial didFailToLoadWithError:(IMRequestStatus*)error;
/**
 * Notifies the delegate that the interstitial would be presented.
 */
-(void)interstitialWillPresent:(IMInterstitial*)interstitial;
/**
 * Notifies the delegate that the interstitial has been presented.
 */
-(void)interstitialDidPresent:(IMInterstitial *)interstitial;
/**
 * Notifies the delegate that the interstitial has failed to present with some error.
 */
-(void)interstitial:(IMInterstitial*)interstitial didFailToPresentWithError:(IMRequestStatus*)error;
/**
 * Notifies the delegate that the interstitial will be dismissed.
 */
-(void)interstitialWillDismiss:(IMInterstitial*)interstitial;
/**
 * Notifies the delegate that the interstitial has been dismissed.
 */
-(void)interstitialDidDismiss:(IMInterstitial*)interstitial;
/**
 * Notifies the delegate that the interstitial has been interacted with.
 */
-(void)interstitial:(IMInterstitial*)interstitial didInteractWithParams:(NSDictionary*)params;
/**
 * Notifies the delegate that the user has performed the action to be incentivised with.
 */
-(void)interstitial:(IMInterstitial*)interstitial rewardActionCompletedWithRewards:(NSDictionary*)rewards;
/**
 * Notifies the delegate that the user will leave application context.
 */
-(void)userWillLeaveApplicationFromInterstitial:(IMInterstitial*)interstitial;


@end

