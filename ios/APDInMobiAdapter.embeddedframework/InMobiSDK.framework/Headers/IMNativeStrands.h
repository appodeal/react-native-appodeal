//
//  IMNativeStrands.h
//  IMMonetization
//
//  Created by Inmobi on 15/05/15.
//  Copyright (c) 2015 InMobi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "IMNativeStrandsDelegate.h"

@interface IMNativeStrands : NSObject

@property (nonatomic, weak) id<IMNativeStrandsDelegate>delegate;

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
 * Initializes an IMNativeStrands instance with the specified placementId and for specific position.
 * @param placementId  the placement Id registered on the InMobi portal.
 * @return IMNativeStrand instance 
 */

-(instancetype)initWithPlacementId:(long long)placementId position:(NSInteger)position;
/**
 * Initializes an IMNativeStrands instance with the specified placementId.
 * @param placementId  the placement Id registered on the InMobi portal.
 * @return IMNativeStrand instance
 */

-(instancetype)initWithPlacementId:(long long)placementId;
/**
 * Loads a ad with default values.
 */

-(void)load;

/**
 * returns adView with all UI element
 */

-(UIView*)strandsView;

/**
 * call this method to recycle this view
 */
- (void)recycleView;
/**
 * return the Size of the ad.
 */
- (CGSize)strandsViewSize;
@end
