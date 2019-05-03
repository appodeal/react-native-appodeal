//
//  APDSkippableVideo.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <Appodeal/APDSdk.h>


@class APDSkippableVideo;

/*!
 *  Declaration of skippable video delegate
 */
@protocol APDSkippableVideoDelegate <NSObject>

@optional

/*!
 *  Method called when skippable video loads
 *
 *  @param skippableVideo Ready to show skippable video
 */
- (void)skippableVideoDidLoad:(APDSkippableVideo *)skippableVideo;

/*!
 *  Method called if skippable video mediation failed
 *
 *  @param skippableVideo Failed skippable video
 */
- (void)skippableVideo:(APDSkippableVideo *)skippableVideo didFailToLoadWithError:(NSError *)error;

/*!
 *  Method called if skippable video adapter becomes unavailable
 *  This case can occur only for singleton ad networks: AdColony, Vungle, Unity
 *
 *  @param skippableVideo Failed skippable video
 */
- (void)skippableVideoDidBecomeUnavailable:(APDSkippableVideo *)skippableVideo;

/*!
 *  Method called after skippable video shows
 *
 *  @param skippableVideo Shown skippable video
 */
- (void)skippableVideoDidAppear:(APDSkippableVideo *)skippableVideo;

/*!
 *  Method called after skippable video completed
 *  @warning Not all video ad networks provide this callback,
 *  therefore this callback may not be called even if the video was  completed
 *
 *  @param skippableVideo Shown skippable video
 */
- (void)skippableVideoDidFinish:(APDSkippableVideo *)skippableVideo;

/*!
 *  Method called after skippable video is dismissed from screen
 *
 *  @param skippableVideo Shown skippable video
 */
- (void)skippableVideoDidDisappear:(APDSkippableVideo *)skippableVideo;

/*!
 *  Method called if error occurs while presenting skippable video adapter
 *
 *  @param skippableVideo Failed skippable video
 *  @param error          Error occurred
 */
- (void)skippableVideo:(APDSkippableVideo *)skippableVideo didFailToPresentWithError:(NSError *)error;

@end


/*!
 *  You should have strong reference on loading skippable video instance
 *  Instance of skippable video ad can try to load ad only once!
 *  Create new skippable video before any call -loadAd!
 *  @code - (void) loadSkippableVideo {
            self.skippableVideo = [APDSkippableVideo new];
            self.skippableVideo.delegate = self;
            [self.skippableVideo loadAd]
        }
 */
@interface APDSkippableVideo : NSObject

/*!
 *  Set delegate to skippable video
 */
@property (weak, nonatomic) id<APDSkippableVideoDelegate> delegate;

/*!
 *  Set custom placement name, that you create in Appodeal Dashboard
 */
@property (copy, nonatomic) NSString *placement;

/*!
 *  Set custom SDK
 */
@property (weak, nonatomic) APDSdk *customSdk;

/*!
 *  Get skippable video availability
 */
@property (assign, nonatomic, readonly, getter=isReady) BOOL ready;

/*!
 *  Start loading skippable video
 */
- (void)loadAd __attribute__((deprecated("As of version 1.4.0 skippable video contains in interstitial ad")));

/*!
 *  Show ready skippable video from view controller
 *
 *  @param viewController Current presented view controller
 */
- (void)presentFromViewController:(UIViewController *)viewController __attribute__((deprecated("As of version 1.4.0 skippable video contains in interstitial ad")));

@end
