//
//  ALAdType.h
//  sdk
//
//  Created by Matt Szaro on 10/1/13.
//
//

#import <Foundation/Foundation.h>
#import "ALAnnotations.h"

AL_ASSUME_NONNULL_BEGIN

/**
 *  This class represents the behavior of an ad.
 */

@interface ALAdType : NSObject <NSCopying>

/**
 *  @name Ad Type Identification
 */

/**
 *  String representing the name of this ad type.
 */
@property (copy, nonatomic, readonly) NSString *label;

/**
 *  @name Supported Ad Type Singletons
 */

/**
 *  Represents a standard advertisement.
 *
 *  @return ALAdType representing a standard advertisement.
 */
+ (ALAdType *)typeRegular;

/**
 *  Represents a rewarded video.
 *
 *  Typically, you'll award your users coins for viewing this type of ad.
 *
 *  @return ALAdType representing a rewarded video.
 */
+ (ALAdType *)typeIncentivized;

/**
 *  Represents a native ad.
 *
 *  @return ALAdType representing a native ad.
 */
+ (ALAdType *)typeNative;

/**
 *  Retrieve an <code>NSArray</code> of all available ad size singleton instances.
 *
 *  @return <code>[NSArray arrayWithObjects: [ALAdType typeRegular], [ALAdType typeIncentivized], nil];</code>
 */
+ (NSArray *)allTypes;

@end

AL_ASSUME_NONNULL_END
