//
//  IMNativeStrandsDelegate.h
//  IMMonetization
//
//  Created by Inmobi on 12/06/15.
//  Copyright (c) 2015 InMobi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "IMRequestStatus.h"

@class IMNativeStrands;
@protocol IMNativeStrandsDelegate <NSObject>

/**
 * Notifies the delegate that the nativeStrands ad has finished loading
 */
-(void)nativeStrandsDidFinishLoading:(IMNativeStrands*)nativeStrands;
/**
 * Notifies the delegate that the nativeStrands ad has failed to load with error.
 */
-(void)nativeStrands:(IMNativeStrands*)nativeStrands didFailToLoadWithError:(IMRequestStatus*)error;
/**
 * Notifies the delegate that the nativeStrands ad would be presenting a full screen content.
 */
-(void)nativeStrandsWillPresentScreen:(IMNativeStrands*)nativeStrands;
/**
 * Notifies the delegate that the nativeStrands ad has presented a full screen content.
 */
-(void)nativeStrandsDidPresentScreen:(IMNativeStrands*)nativeStrands;
/**
 * Notifies the delegate that the nativeStrands ad would be dismissing the presented full screen content.
 */
-(void)nativeStrandsWillDismissScreen:(IMNativeStrands*)nativeStrands;
/**
 * Notifies the delegate that the nativeStrands ad has dismissed the presented full screen content.
 */
-(void)nativeStrandsDidDismissScreen:(IMNativeStrands*)nativeStrands;
/**
 * Notifies the delegate that the user will be taken outside the application context.
 */
-(void)userWillLeaveApplicationFromNativeStrands:(IMNativeStrands*)nativeStrands;
/**
 * Notifies the delegate that the nativeStrands ad impression has been tracked
 */
-(void)nativeStrandsAdImpressed:(IMNativeStrands*)nativeStrands;
/**
 * Notifies the delegate that the user has clicked on the ad.
 */
-(void)nativeStrandsAdClicked:(IMNativeStrands*)nativeStrands;

@end
