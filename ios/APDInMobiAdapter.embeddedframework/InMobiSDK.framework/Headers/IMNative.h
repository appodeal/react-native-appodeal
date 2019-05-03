//
//  IMNative.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//
/**
 * Class to integrate native ads in your application
 * Use this class to integrate native ads in your application. For native ads, your application is given the raw assets for the ad. Your application can render these in a manner that is native to the look and feel of your application to drive better user engagement with the ad. If you need to customize aspects of ad impression and click-through reporting, your application can use the IMCustomNative class.
 */
#import <Foundation/Foundation.h>
#include "IMCommonConstants.h"
#import "IMNativeDelegate.h"

@interface IMNative : NSObject
/**
 * The content of the native ad.
 */
@property (nonatomic, strong, readonly) NSString* adContent;
/**
 * The delegate to receive callbacks
 */
@property (nonatomic, weak) id<IMNativeDelegate> delegate;
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
 * Initialize a Native ad with the given PlacementId
 * @param placementId The placementId for loading the interstitial
 */
-(instancetype)initWithPlacementId:(long long)placementId;
/**
 * Initialize a Native ad with the given PlacementId
 * @param placementId The placementId for loading the interstitial
 * @param delegate The delegate to receive callbacks from IMNative
 */
-(instancetype)initWithPlacementId:(long long)placementId delegate:(id<IMNativeDelegate>)delegate;
/**
 * Loads a Native ad
 */
-(void)load;
/**
 * Binds the native instance to the rendered view to fire impressions.
 * @param native The native instance that was used to create the view.
 * @param view The view that has rendered the native ad's content
 */
+(void)bindNative:(IMNative*)native toView:(UIView*)view;
/**
 * Use this method to stop tracking impressions on a particular view. This method should be called especially when using native ads inside UITableView.
 * If the view submited previously was a UITableViewCell, please use this method to stop tracking the view to avoid faulty impressions.
 * Your -(UITableViewCell*)tableView:(UITableView*)tableView cellForRowAtIndexpath:(NSIndexPath*)indexPath should look like below
 
        if(isAnAd) { //This is an ad.
            // Build the native ad from the assets.
            //Call bindNative to start tracking impressions.
            [IMNative bindNative:nativeAd toView:view];
        } else { //This is a content element.
            [IMNative unBindView:view];
        }
 
 * @param view The view on which the impressions should not be tracked anymore.
 */
+(void)unBindView:(UIView*)view;
/**
 * Reports that a click has happened on the native ad.
 * @param params Any additional params that the publisher would like to report.
 */
-(void)reportAdClick:(NSDictionary*)params;
/**
 * Reports that a click has happened on the native ad and open the landing page too.
 * @param params Any additional params that the publisher would like to report.
 */
-(void)reportAdClickAndOpenLandingURL:(NSDictionary*)params;



@end
