//
//  APDReviewVideo.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <Appodeal/APDSdk.h>
#import <Appodeal/APDRewardProtocol.h>

#ifdef ADVANCED_INTEGRATION
#import <Appodeal/AppodealRequestDelegateProtocol.h>
#endif

@class APDRewardedVideo;

/*!
 *  Declaration of rewarded video delegate
 */
@protocol APDRewardedVideoDelegate <NSObject>

@optional

/*!
 *  Method called when rewarded video loads
 *
 *  @param rewardedVideo Ready to show rewarded video
 */
- (void)rewardedVideoDidLoad:(APDRewardedVideo *)rewardedVideo;

/*!
 *  Method called if skippable rewarded mediation failed
 *
 *  @param rewardedVideo Failed rewarded video
 */
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo didFailToLoadWithError:(NSError *)error;

/*!
 *  Method called if rewarded video adapter becomes unavailable
 *  This case can occur only for singleton ad networks: AdColony, Vungle, Unity
 *
 *  @param rewardedVideo Failed rewarded video
 */
- (void)rewardedVideoDidBecomeUnavailable:(APDRewardedVideo *)rewardedVideo;

/*!
 *  Method called after rewarded video shows
 *
 *  @param rewardedVideo Shown rewarded video
 */
- (void)rewardedVideoDidAppear:(APDRewardedVideo *)rewardedVideo;

/*!
 *  Method called after rewarded video is dismissed from screen
 *
 *  @param rewardedVideo Shown rewarded video
 */
- (void)rewardedVideoDidDisappear:(APDRewardedVideo *)rewardedVideo;

/*!
 *   Method called after rewarded video completes
 *   @warning After calling this method video controller can show postbanner
 *   view and stay on screen.
 *
 *  @param rewardedVideo Completed rewarded video
 *  @param reward        Object conformed APDReward protocol with values turned on in Appodeal Dashboard
 */
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo didFinishWithReward:(id<APDReward>)reward;

/*!
 *  Method called if an error occurs while presenting the rewarded video adapter
 *
 *  @param rewardedVideo  Failed rewarded video
 *  @param error          Error occurred
 */
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo didFailToPresentWithError:(NSError *)error;

@end

/*!
 *  You should have strong reference on loading rewarded video instance
 *  Instance of rewarded video ad can try to load ad only once!
 *  Create new rewarded video before any call -loadAd!
 *  @code - (void) loadRewardedVideo {
            self.rewardedVideo = [APDRewaredVideo new];
            self.rewardedVideo.delegate = self;
            [self.rewardedVideo loadAd]
        }
 */
@interface APDRewardedVideo : NSObject

#ifdef ADVANCED_INTEGRATION
@property (weak, nonatomic) id<APDRewardedVideoRequestDelegate> requestDelegate;
#endif

/*!
 *  Set delegate to skippable video
 */
@property (weak, nonatomic) id<APDRewardedVideoDelegate> delegate;

/*!
 *  Return reward object currencyName as NSString, and amount as NSUInteger
 */
@property (strong, nonatomic, readonly) id<APDReward> reward;

/*!
 *  Set custom placement name, that you create in the Appodeal Dashboard
 */
@property (copy, nonatomic) NSString *placement;

/*!
 *  Set custom SDK
 */
@property (weak, nonatomic) APDSdk *customSdk;

/*!
 *  Get rewarded video availability
 */
@property (assign, nonatomic, readonly, getter=isReady) BOOL ready;

/*!
 *  Start loading rewarded video
 */
- (void)loadAd;

/*!
 *  Show ready rewarded video from view controller
 *
 *  @param viewController Current presented view controller
 */
- (void)presentFromViewController:(UIViewController *)viewController;

@end
