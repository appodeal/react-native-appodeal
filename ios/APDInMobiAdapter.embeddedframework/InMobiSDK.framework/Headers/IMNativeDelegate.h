//
//  IMNativeDelegate.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//

/**
 * A listener for receiving notifications during the lifecycle of an native ad.
 *
 * Note All the events in this listener will be invoked on your application's UI thread.
 *
 * In most cases your application will need to listen for the following events on an native ad
 
 The outcome of an ad request (if the request succeeded or failed); 
 see nativeDidFinishLoading:(IMNative*)native; and native:(IMNative*)native didFailToLoadWithError:(IMRequestStatus*)error;
 
 The ad opened an overlay that covered the screen. This means that the user can no longer interact with your application; 
 see nativeDidPresentScreen:(IMNative*)native;
 
 The ad opened overlay was dismissed. The user is now free to interact with your application; 
 see nativeDidDismissScreen:(IMNative*)native;
 
 A user interaction with the ad will result in the User leaving your application context; 
 see userWillLeaveApplicationFromNative:(IMNative*)native;
 */
#import <Foundation/Foundation.h>
#import "IMRequestStatus.h"


@class IMNative;
@protocol IMNativeDelegate <NSObject>
/**
 * Notifies the delegate that the native ad has finished loading
 */
-(void)nativeDidFinishLoading:(IMNative*)native;
/**
 * Notifies the delegate that the native ad has failed to load with error.
 */
-(void)native:(IMNative*)native didFailToLoadWithError:(IMRequestStatus*)error;
/**
 * Notifies the delegate that the native ad would be presenting a full screen content.
 */
-(void)nativeWillPresentScreen:(IMNative*)native;
/**
 * Notifies the delegate that the native ad has presented a full screen content.
 */
-(void)nativeDidPresentScreen:(IMNative*)native;
/**
 * Notifies the delegate that the native ad would be dismissing the presented full screen content.
 */
-(void)nativeWillDismissScreen:(IMNative*)native;
/**
 * Notifies the delegate that the native ad has dismissed the presented full screen content.
 */
-(void)nativeDidDismissScreen:(IMNative*)native;
/**
 * Notifies the delegate that the user will be taken outside the application context.
 */
-(void)userWillLeaveApplicationFromNative:(IMNative*)native;
/**
 * Notifies the delegate that the native ad impression has been tracked
 */
-(void)nativeAdImpressed:(IMNative*)native;
@end
