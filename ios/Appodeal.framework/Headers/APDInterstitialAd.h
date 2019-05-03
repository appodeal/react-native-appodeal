//
//  APDInterstital.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Appodeal/APDSdk.h>

#ifdef ADVANCED_INTEGRATION
#import <Appodeal/AppodealRequestDelegateProtocol.h>
#endif

@class APDInterstitialAd;

/*!
 *  Declaration of interstitial delgate
 */
@protocol APDInterstitalAdDelegate <NSObject>

@optional

/*!
 *  Method called when interstitial loads
 *
 *  @param interstitialAd Instance of ready to show interstitial
 */
- (void)interstitialAdDidLoad:(APDInterstitialAd *)interstitialAd;

/*!
 *  Method called if precached interstitial loads.
 *  If you want to show only expensive ads, ignore this method!
 *
 *  @param precacheInterstitial Instance of ready interstitial
 */
- (void)precacheInterstitialAdDidLoad:(APDInterstitialAd *)precacheInterstitial;

/*!
 *  Method called if interstitial mediation attempt was unsuccessful
 *
 *  @param interstitialAd Instance of failed interstitial
 *  @param error          Mediation error
 */
- (void)interstitialAd:(APDInterstitialAd *)interstitialAd didFailToLoadWithError:(NSError *)error;

/*!
 *  Method called when interstitial shows on screen
 *
 *  @param interstitialAd Shown interstitial
 */
- (void)interstitialAdDidAppear:(APDInterstitialAd *)interstitialAd;

/*!
 *  Method called when interstitial did dismiss from screen
 *
 *  @param interstitialAd Shown interstitial
 */
- (void)interstitialAdDidDisappear:(APDInterstitialAd *)interstitialAd;

/*!
 *  Method called in case that interstitial failed while showing
 *  For example an error occurs in current ad network
 *
 *  @param interstitialAd Shown interstitial
 *  @param error          Error
 */
- (void)interstitialAd:(APDInterstitialAd *)interstitialAd didFailToPresentWithError:(NSError *)error;

/*!
 *  Call when user taps on interstitial
 *
 *  @param interstitialAd Shown interstitial
 */
- (void)interstitialAdDidRecieveTapAction:(APDInterstitialAd *)interstitialAd;

@end


/*!
 *  You should have strong reference on the instance of loading an interstitial
 *  Instance of interstitial ad can try to load ad only once!
 *  Create new interstitial before any call -loadAd!
 *  @code - (void) loadInterstitial {
        self.interstital = [APDInterstitialAd new];
        self.interstital.delegate = self;
        [self.interstital loadAd]
    }
 */
@interface APDInterstitialAd : NSObject

#ifdef ADVANCED_INTEGRATION
@property (weak, nonatomic) id<APDInterstitalAdRequestDelegate> requestDelegate;
#endif
/*!
 *  Set interstitial delegate
 */
@property (weak, nonatomic) id<APDInterstitalAdDelegate> delegate;

/*!
 *  Set custom placement name, that you create in Appodeal Dashboard
 */
@property (copy, nonatomic) NSString *placement;

/*!
 *  Set custom SDK
 */
@property (weak, nonatomic) APDSdk *customSdk;

/*!
 *  Get interstitial availability
 */
@property (assign, nonatomic, readonly, getter=isReady) BOOL ready;


/*!
 *  Get interstitial already shown
 */
@property (assign, nonatomic, readonly) BOOL hasBeenPresented;

/*!
 *  Start loading interstitial
 */
- (void)loadAd;

/*!
 *  Show ready interstitial from view controller
 *
 *  @param viewController Current presented view controller
 */
- (void)presentFromViewController:(UIViewController *)viewController;

@end

