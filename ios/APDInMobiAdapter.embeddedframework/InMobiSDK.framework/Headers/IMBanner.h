//
//  IMBanner.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//
/**
 * Class to integrate banner ads in your application
 *
 * Adding banner ads is demonstrated in the code fragment below
 * Implement the following in the viewcontroller
 
        IMBanner *bannerView = [[IMBanner alloc] initWithFrame:CGRectMake(0, 50, 320, 50) placementId:11203280001];
        [self.view addSubview:self.bannerView];
        [self.bannerView load];
 
  The code snippet above demonstrates a dead simple integration. Your application code can additionally listen for lifecycle events on the banner ad by implementing the IMBannerDelegate.
 */
#import <UIKit/UIKit.h>
#import "IMCommonConstants.h"
#import "IMBannerDelegate.h"

@interface IMBanner : UIView
/**
 * The delegate for the banner to notify of events.
 */
@property (nonatomic, weak) id<IMBannerDelegate> delegate;
/**
 * The refresh interval for the banner specified in seconds.
 */
@property (nonatomic) NSInteger refreshInterval;
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
 * The placement ID for this banner. 
 */
@property (nonatomic) long long placementId;
/**
 * The transition animation to be performed between refreshes.
 */
@property (nonatomic) UIViewAnimationTransition transitionAnimation;
/**
 * Initializes an IMBanner instance with the specified placementId.
 * @param frame CGRect for this view, according to the requested size.
 * @param placementId  the placement Id registered on the InMobi portal.
 */
-(instancetype)initWithFrame:(CGRect)frame placementId:(long long)placementId;
/**
 * Initializes an IMBanner instance with the specified placementId and delegate.
 * @param frame CGRect for this view, according to the requested size.
 * @param placementId  the placement Id registered on the InMobi portal.
 * @param delegate The delegate to receive callbacks
 */
-(instancetype)initWithFrame:(CGRect)frame placementId:(long long)placementId delegate:(id<IMBannerDelegate>)delegate;
/**
 * Loads a banner with default values.
 */
-(void)load;
/**
 * Specifies if the banner should auto refresh
 * @param refresh if the banner should be refreshed
 */
-(void)shouldAutoRefresh:(BOOL)refresh;
-(void)setRefreshInterval:(NSInteger)interval;

@end
