//
//  APDNativeAdQueue.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Appodeal/APDNativeAd.h>
#import <Appodeal/APDDefines.h>


@class APDNativeAdQueue;


@protocol APDNativeAdQueueDelegate <NSObject>

@optional

/**
 Method called when loader receives native ad.
 
 @param adQueue ad queue object
 @param count count of available native ad
 */
- (void)adQueueAdIsAvailable:(APDNativeAdQueue *)adQueue ofCount:(NSInteger)count;


/**
 Method called when loader fails to receive native ad.
 
 @param adQueue ad queue object
 @param error Error occurred
 */
- (void)adQueue:(APDNativeAdQueue *)adQueue failedWithError:(NSError *)error;

@end


@interface APDNativeAdQueue : NSObject

/*!
 *  Set loader delegate
 */
@property (nonatomic, weak) id<APDNativeAdQueueDelegate> delegate;


/**
 * Get count of available native ads
 */
@property (nonatomic, readonly, assign) NSInteger currentAdCount;


/**
 Set max count of native ads
 
 @param adSize max count of native ad
 */

- (void)setMaxAdSize:(NSInteger)adSize;


/**
 * Call this method to load native ads
 
 @param type APDNativeAdTypeAuto or APDNativeAdTypeVideo or APDNativeAdTypeNoVideo
 */
- (void)loadAdOfType:(APDNativeAdType)type;


/**
 Call this method to get native ads
 
 @param count count available native ads
 @return array of native ad
 */
- (NSArray <__kindof APDNativeAd *> *)getNativeAdsOfCount:(NSInteger)count;


@end
