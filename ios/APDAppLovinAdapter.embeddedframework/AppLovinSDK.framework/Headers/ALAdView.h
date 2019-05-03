//
//  ALAdView.h
//  sdk
//
//  Created by Basil on 3/1/12.
//  Copyright (c) 2013, AppLovin Corporation. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "ALSdk.h"
#import "ALAdService.h"
#import "ALAdViewEventDelegate.h"

AL_ASSUME_NONNULL_BEGIN

/**
 * This protocol describes a UIView which is capable of loading and showing ads. ALAdView is its sole public concrete implementation.
 *
 * The functionality of this protocol is exposed via the concrete ALAdView class.
 * To invoke any of its methods, use that; e.g.
 *
 * ALAdView* adView = [[ALAdView alloc] initWithSize: [ALAdSize sizeBanner]];
 * [adView loadNextAd];
 */
@protocol ALAdViewProtocol

/**
 * @name Ad Delegates
 */

/**
 *  An object conforming to the ALAdLoadDelegate protocol, which, if set, will be notified of ad load events.
 *
 *  Please note: This delegate is retained strongly and might lead to retain cycles if delegate holds strong reference to this ALAdView.
 */
@property (strong, atomic, alnullable) id <ALAdLoadDelegate> adLoadDelegate;

/**
 *  An object conforming to the ALAdDisplayDelegate protocol, which, if set, will be notified of ad show/hide events.
 *
 *  Please note: This delegate is retained strongly and might lead to retain cycles if delegate holds strong reference to this ALAdView.
 */
@property (strong, atomic, alnullable) id <ALAdDisplayDelegate> adDisplayDelegate;

/**
 *  An object conforming to the ALAdViewEventDelegate protocol, which, if set, will be notified of ALAdView-specific events.
 *
 *  Please note: This delegate is retained strongly and might lead to retain cycles if delegate holds strong reference to this ALAdView.
 */
@property (strong, atomic, alnullable) id <ALAdViewEventDelegate> adEventDelegate;

// Primarily for internal use; banners and mrecs cannot contain videos.
@property (strong, atomic, alnullable) id <ALAdVideoPlaybackDelegate> adVideoPlaybackDelegate;

/**
 * @name Ad View Configuration
 */

/**
 *  The size of ads to be loaded within this ALAdView.
 */
@property (strong, atomic) ALAdSize *adSize;

/**
 *  Whether or not this ALAdView should automatically load and rotate banners.
 *
 *  If YES, ads will be automatically loaded and updated. If NO, you are reponsible for this behavior via [ALAdView loadNextAd]. Defaults to YES.
 */
@property (assign, atomic, getter=isAutoloadEnabled, setter=setAutoloadEnabled:) BOOL autoload;
@property (assign, atomic, getter=isAutoloadEnabled, setter=setAutoloadEnabled:) BOOL shouldAutoload;

/**
 *  The UIViewController in whose view this ALAdView is placed.
 */
@property (strong, atomic, alnullable) UIViewController *parentController __deprecated_msg("This property is deprecated and will be removed in a future SDK version.");

/**
 * @name Loading and Rendering Ads
 */

/**
 * Start loading a new advertisement. This method will return immediately. An
 * advertisement will be rendered by this view asynchonously when available.
 */
- (void)loadNextAd;

/**
 * Check if the next ad is currently ready to display.
 *
 * @return YES if a subsequent call to a show method will result in an immediate display. NO if a call to a show method will require network activity first.
 */
@property (readonly, atomic, getter=isReadyForDisplay) BOOL readyForDisplay;

/**
 * Render a specific ad that was loaded via ALAdService.
 *
 * @param ad Ad to render. Must not be nil.
 */
- (void)render:(ALAd *)ad;

/**
 * Render a specific ad that was loaded via ALAdService.
 *
 * @param ad          Ad to render. Must not be nil.
 * @param placement   Name of the placement over which the ad is rendered. May be null
 */
- (void)render:(ALAd *)ad overPlacement:(alnullable NSString *)placement;

/**
 * @name Initialization
 */

/**
 *  Initialize the ad view with a given size.
 *
 *  @param size ALAdSize representing the size of this ad. For example, [ALAdSize sizeBanner].
 *
 *  @return A new instance of ALAdView.
 */
- (instancetype)initWithSize:(ALAdSize *)size;

/**
 *  Initialize the ad view with a given size.
 *
 *  @param sdk Instance of ALSdk to use.
 *  @param size ALAdSize representing the size of this ad. For example, [ALAdSize sizeBanner].
 *
 *  @return A new instance of ALAdView.
 */
- (instancetype)initWithSdk:(ALSdk *)sdk size:(ALAdSize *)size;

/**
 * Initialize ad view with a given frame, ad size, and ALSdk instance.
 *
 * @param frame  Frame to use.
 * @param size   Ad size to use.
 * @param sdk    Instace of ALSdk to use.
 *
 * @return A new instance of ALAdView.
 */
- (id)initWithFrame:(CGRect)frame size:(ALAdSize *)size sdk:(ALSdk *)sdk;


- (id)init __attribute__((unavailable("Use initWithSize:")));

@end

/**
 * This class represents the only public implementation of ALAdViewProtocol.
 *
 * It should be used for all ad related tasks.
 */
@interface ALAdView : UIView <ALAdViewProtocol>

@end

AL_ASSUME_NONNULL_END
