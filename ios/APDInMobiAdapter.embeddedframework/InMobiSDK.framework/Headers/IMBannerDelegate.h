//
//  IMBannerDelegate.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//
/**
 * A listener for receiving notifications during the lifecycle of a banner ad.
 *
 * Note All the events in this listener will be invoked on your application's UI thread.
 
 In most cases your application will need to listen for the following events on a banner ad
 
 The outcome of an ad request (if the request succeeded or failed); 
 see bannerDidFinishLoading:(IMBanner*)banner; and banner:(IMBanner*)banner didFailToLoadWithError:(IMRequestStatus*)error;
 
 The ad opened an overlay that covered the screen. This means that the user can no longer interact with your application; 
 see bannerDidPresentScreen:(IMBanner*)banner
 
 The ad overlay opened was dismissed. The user is now free to interact with your application; 
 see bannerDidDismissScreen:(IMBanner*)banner;
 
 A user interaction with the ad will result in the User leaving your application context; 
 see userWillLeaveApplicationFromBanner:(IMBanner*)banner;
 
 If your application involves running rewarded or incentivised ads, then you should, in addition to the above events, also listen for the banner:(IMBanner*)banner rewardActionCompletedWithRewards:(NSDictionary*)rewards event and handle it appropriately to unlock rewards for the user of your app.
 */
#import <Foundation/Foundation.h>
#import "IMRequestStatus.h"

@class IMBanner;
@protocol IMBannerDelegate <NSObject>
/**
 * Notifies the delegate that the banner has finished loading
 */
-(void)bannerDidFinishLoading:(IMBanner*)banner;
/**
 * Notifies the delegate that the banner has failed to load with some error.
 */
-(void)banner:(IMBanner*)banner didFailToLoadWithError:(IMRequestStatus*)error;
/**
 * Notifies the delegate that the banner was interacted with.
 */
-(void)banner:(IMBanner*)banner didInteractWithParams:(NSDictionary*)params;
/**
 * Notifies the delegate that the user would be taken out of the application context.
 */
-(void)userWillLeaveApplicationFromBanner:(IMBanner*)banner;
/**
 * Notifies the delegate that the banner would be presenting a full screen content.
 */
-(void)bannerWillPresentScreen:(IMBanner*)banner;
/**
 * Notifies the delegate that the banner has finished presenting screen.
 */
-(void)bannerDidPresentScreen:(IMBanner*)banner;
/**
 * Notifies the delegate that the banner will start dismissing the presented screen.
 */
-(void)bannerWillDismissScreen:(IMBanner*)banner;
/**
 * Notifies the delegate that the banner has dismissed the presented screen.
 */
-(void)bannerDidDismissScreen:(IMBanner*)banner;
/**
 * Notifies the delegate that the user has completed the action to be incentivised with.
 */
-(void)banner:(IMBanner*)banner rewardActionCompletedWithRewards:(NSDictionary*)rewards;

@end
