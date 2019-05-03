/*
 *  YMAInterstitialController.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <UIKit/UIKit.h>

@class YMAAdRequest;

@protocol YMAInterstitialDelegate;

@interface YMAInterstitialController : UIViewController

/**
 * Unique ad placement ID created at partner interface.
 * Example: R-128282-4
 */
@property (nonatomic, copy, readonly) NSString *blockID;

/**
 * Indicates if interstitial content has been loaded and ready to be presented.
 * Delegate methods interstitialDidLoadAd: called just after this property value set YES.
 */
@property (nonatomic, assign, readonly) BOOL loaded;

/**
 * Optional delegate, that receives life-cycle events from ad
 */
@property (nonatomic, weak) id<YMAInterstitialDelegate> delegate;

/**
 * If set to YES, web links are opened in in-app broswer.
 * If set to NO, web links are opened in Safari.
 * Default is NO.
 */
@property (nonatomic, assign) BOOL shouldOpenLinksInApp;

/**
 * Returns YES if the interstitial controller has already been presented.
 * Note that an interstitial controller can only be presented once. 
 * New instance should be created for each presentation.
 */
@property (nonatomic, assign, readonly) BOOL hasBeenPresented;

/**
 * Initializer. 
 * @param blockID Unique string that identifies ad type, size ... at application.
 * This ID could be obtained from the partner interface (partner.yandex.ru).
 */
- (instancetype)initWithBlockID:(NSString *)blockID;

/**
 * Starts loading interstitial ad.
 * Interstitial ads are usually preloaded and then displayed between screen changes.
 */
- (void)load;

/**
 * Starts loading interstitial ad with specific request.
 * Interstitial ads are usually preloaded and then displayed between screen changes.
 * @param request Ad request containg data for targeting.
 */
- (void)loadWithRequest:(YMAAdRequest *)request;

/**
 * This method should be called after preload is finished.
 * When preload is finished delegate will receive 'interstitialDidLoadAd:' and 'loaded' property will be set to YES.
 * Before that moment this call will has no effect.
 * Calling this method will invoke delegate's 'interstitialWillAppear:' just before presenting interstitial ad,
 *  and 'interstitialDidAppear:' right after presentation animation is over. When user dismisses ad first 'interstitialWillDisappear:' is called just before starting dismiss animation and then
 * 'interstitialDidDisappear:' will be called on delegate right after ad dismissal.
 * @param viewController Controller's 'presentViewController:' used to present fullscreen interstitial ad.
 */
- (void)presentInterstitialFromViewController:(UIViewController *)viewController;

/**
 * @see presentInterstitialFromViewController:
 *
 *@param dismissalBlock Block executed right after interstitial dismissed.
 */
- (void)presentInterstitialFromViewController:(UIViewController *)viewController dismissalBlock:(void(^)())dismissalBlock;

@end

@protocol YMAInterstitialDelegate <NSObject>

@optional

/**
 * Called as indicator that preload is finished and ad is ready to be presented using 'presentInterstitialFromViewController:'.
 */
- (void)interstitialDidLoadAd:(YMAInterstitialController *)interstitial;

/**
 * Called if ad failed to load. Failure describes reason. List of error codes could be found in 'YMAErrors.h'.
 */
- (void)interstitialDidFailToLoadAd:(YMAInterstitialController *)interstitial error:(NSError *)error;

/**
 * Called before application will resign active as a result user clicking an ad that will start some other application, such as AppStore or Phone.
 */
- (void)interstitialWillLeaveApplication:(YMAInterstitialController *)interstitial;

/**
 * Called if ad could not be presented. Failure describes reason. List of error codes could be found in 'YMAErrors.h'.
 */
- (void)interstitialDidFailToPresentAd:(YMAInterstitialController *)interstitial error:(NSError *)error;

/**
 * Called just before interstitial starts presentation
 */
- (void)interstitialWillAppear:(YMAInterstitialController *)interstitial;

/**
 * Called just after interstitial has been presented
 */
- (void)interstitialDidAppear:(YMAInterstitialController *)interstitial;

/**
 * Called just before interstitial dismissed.
 */
- (void)interstitialWillDisappear:(YMAInterstitialController *)interstitial;

/**
 * Called just after interstitial has been dismissed.
 */
- (void)interstitialDidDisappear:(YMAInterstitialController *)interstitial;

/**
 * Called before presenting some other fullscreen content such as in-app web browser as a result of user interactions with ad.
 */
- (void)interstitialWillPresentScreen:(UIViewController *)webBrowser;

@end
