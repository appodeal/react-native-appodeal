//
//  IMRequestStatus.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//
/**
 * Collection of codes indicating the status of an ad request. 
 */

#import <Foundation/Foundation.h>
/**
 * Enumeration for error codes
 */
typedef NS_ENUM(NSInteger, IMStatusCode) {
    kIMStatusCodeNetworkUnReachable,
    kIMStatusCodeNoFill,
    kIMStatusCodeRequestInvalid,
    kIMStatusCodeRequestPending,
    kIMStatusCodeRequestTimedOut,
    kIMStatusCodeInternalError,
    kIMStatusCodeServerError,
    kIMStatusCodeAdActive,
    kIMStatusCodeEarlyRefreshRequest
};

@interface IMRequestStatus : NSError
/**
 * Create an InMobi specific error from NSError
 * @param domain The domain where the error occured. (Domain here is specific to iOS)
 * @param code The error code for this error. This can be read from NSError.code
 * @param dict A more detailed explanation of the error. This contains fields like detailed description and name. More detailed documentation is found in NSError.
 */
-(instancetype)initWithDomain:(NSString *)domain code:(IMStatusCode)code userInfo:(NSDictionary *)dict;

@end
