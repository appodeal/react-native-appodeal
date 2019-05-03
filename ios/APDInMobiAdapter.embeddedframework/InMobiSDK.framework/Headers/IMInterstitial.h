//
//  IMInterstitial.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//
/**
 * Class to integrate full screen interstitial ads in your application
 * Adding interstitial ads is demonstrated in the code fragment below
 * Implement the following in the viewcontroller
 
 IMInterstitial *interstitialView = [[IMInterstitial alloc] initWithPlacementId:1203280001];
 interstitialView.delegate = self;
 [interstitialView load];
 
 - (void)interstitialDidFinishLoading:(IMInterstitial *)interstitial {
 [interstitial show];
 }
 
- (void)interstitialDidReceiveAd:(IMInterstitial *)interstitial {
 NSLog(@"interstitialDidReceiveAd");
 }
 
 - (void)interstitial:(IMInterstitial *)interstitial didFailToLoadWithError:(IMRequestStatus *)error {
 NSLog(@"Interstitial failed to load ad");
 NSLog(@"Error : %@",error.description);
 }
 
 - (void)interstitial:(IMInterstitial *)interstitial didFailToPresentWithError:(IMRequestStatus *)error{
 NSLog(@"Interstitial didFailToPresentWithError");
 NSLog(@"Error : %@",error.description);
 }
 
 - (void)interstitialDidDismiss:(IMInterstitial *)interstitial {
 NSLog(@"interstitialDidDismiss");
 }
 
 - (void)interstitialWillDismiss:(IMInterstitial *)interstitial {
 NSLog(@"interstitialWillDismiss");
 }
 
 - (void)interstitialWillPresent:(IMInterstitial *)interstitial {
 NSLog(@"interstitialWillPresent");
 }
 
 - (void)interstitialDidPresent:(IMInterstitial *)interstitial {
 NSLog(@"interstitialDidPresent");
 }
 
 - (void)userWillLeaveApplicationFromInterstitial:(IMInterstitial *)interstitial {
 NSLog(@"userWillLeaveApplicationFromInterstitial");
 }
 */
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "IMInterstitialDelegate.h"

typedef NS_ENUM(NSInteger, IMInterstitialAnimationType) {
    kIMInterstitialAnimationTypeCoverVertical,
    kIMInterstitialAnimationTypeFlipHorizontal,
    kIMInterstitialAnimationTypeNone
};

@interface IMInterstitial : NSObject
/**
 * The delegate to receive callbacks
 */
@property (nonatomic, weak) id<IMInterstitialDelegate> delegate;
/**
 * A free form set of keywords, separated by ',' to be sent with the ad request.
 * E.g: "sports,cars,bikes"
 */
@property (nonatomic, strong) NSString* keywords;
/**
 * Any additional information to be passed to InMobi.
 */
@property (nonatomic, strong) NSDictionary* extras;
/**
 * Initialize an Interstitial with the given PlacementId
 * @param placementId The placementId for loading the interstitial
 */
-(instancetype)initWithPlacementId:(long long)placementId;
/**
 * Initialize an Interstitial with the given PlacementId
 * @param placementId The placementId for loading the interstitial
 * @param delegate The delegate to receive callbacks
 */
-(instancetype)initWithPlacementId:(long long)placementId delegate:(id<IMInterstitialDelegate>)delegate;
/**
 * Loads an Interstitial
 */
-(void)load;
/**
 * To query if the interstitial is ready to be shown
 */
-(BOOL)isReady;
/**
 * Displays the interstitial on the screen
 * @param viewController, this view controller will be used to present interestitial.
 */
-(void)showFromViewController:(UIViewController *)viewController;
/**
 * Displays the interstitial on the screen
 * @param viewController, this view controller will be used to present interestitial.
 * @param type The transition type for interstitial presentation.
 */
-(void)showFromViewController:(UIViewController *)viewController withAnimation:(IMInterstitialAnimationType)type;

@end

