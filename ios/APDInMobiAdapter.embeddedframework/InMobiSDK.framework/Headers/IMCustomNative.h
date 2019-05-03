//
//  IMCustomNative.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//
/**
 * Class to integrate customised native ads in your application
 * Provides a customization of the ad impression and click-through
 * reporting facets for a native ad.
 */
#import "IMNative.h"

@interface IMCustomNative : IMNative

/**
 * Binds the native instance to the rendered view to fire impressions.
 * @param native The native instance used to create the view;
 * @param view The view that has rendered the native ad's content.
 * @param impressionTracker a custom HTML/Javascript for the publisher to track impressions if required.
 */
+(void)bindNative:(IMNative*)native toView:(UIView *)view withImpressionTrackerScript:(NSString*)impressionTracker;
/**
 * Binds the native instance to the rendered view to fire impressions.
 * @param native The native instance used to create the view.
 * @param view The view that has rendered the native ad.
 * @param impressionTrackerURL a custom URL for the publisher to track impressions if required.
 */
+(void)bindNative:(IMNative*)native toView:(UIView *)view withImpressionTrackerURL:(NSURL*)impressionTrackerURL;
/**
 * Reports that a click has happened on the native ad.
 * @param extras Any additional params that the publisher would like to report.
 * @param clickTracker A custom HTML/Javascript that the publisher provides to track clicks if required.
 */
-(void)reportAdClick:(NSDictionary*)extras withCustomClickTrackerScript:(NSString*)clickTracker;
/**
 * Reports that a click has happened on the native ad.
 * @param extras Any additional params that the publisher would like to report.
 * @param clickTrackerURL A custom URL that the publisher provides to track clicks if required.
 */
-(void)reportAdClick:(NSDictionary*)extras withCustomClickTrackerURL:(NSURL*)clickTrackerURL;
/**
 * Reports that a click has happened on the native ad and open the landing page too.
 * @param extras Any additional params that the publisher would like to report.
 * @param clickTracker A custom HTML/Javascript that the publiser can provide to track clicks if required.
 */
-(void)reportAdClickAndOpenLandingURL:(NSDictionary*)extras withCustomClickTrackerScript:(NSString*)clickTracker;
/**
 * Reports that a click has happened on the native ad and open the landing page too.
 * @param extras Any additional params that the publisher would like to report.
 * @param clickTrackerURL A custom URL that the publisher provides to track clicks if required.
 */
-(void)reportAdClickAndOpenLandingURL:(NSDictionary*)extras withCustomClickTrackerURL:(NSURL*)clickTrackerURL;

@end
