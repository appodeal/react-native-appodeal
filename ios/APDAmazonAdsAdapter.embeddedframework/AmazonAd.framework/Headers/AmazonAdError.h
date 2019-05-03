//
//  AmazonAdError.h
//  AmazonMobileAdsSDK
//
//  Copyright (c) 2012-2016 Amazon.com. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum {
    AmazonAdErrorRequest,           // Invalid Request. Example : "An invalid request was sent".
    AmazonAdErrorNoFill,            // No ad returned from the server. Example : "Ad not found".
    AmazonAdErrorInternalServer,    // Internal server error. Example : "Failed to load configuration".
    AmazonAdErrorNetworkConnection, // Network Connection error
    AmazonAdErrorReserved,
    AmazonAdErrorNoError = 0,
    AmazonAdErrorRequestTimeout = -1001, // NSURLSession request timeout error code
    AmazonAdErrorATSRequireSecure = -1022, // ATS blockes http requests
    AmazonAdErrorSSLFailure = -1200 // The domain is not ATS compliant which causes SSL handshake failure
} AmazonAdErrorCode;

/**
 * Amazon Ad Error object
 */
@interface AmazonAdError : NSObject

/**
 * Amazon Error Code
 */
@property (nonatomic, readonly) AmazonAdErrorCode errorCode;

/**
 * Error description message
 */
@property (nonatomic, strong, readonly) NSString *errorDescription; 

@end
