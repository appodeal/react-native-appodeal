/*
 *  YMAYandexVASTAds.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

@protocol YMABlocksInfoLoaderDelegate;
@protocol YMAVideoAdLoaderDelegate;
@class YMABlocksInfo;
@class YMAVideoAdsRequest;

/**
 * If the response can not be parsed as XML, loader returns error. 
 * YMAVASTSpecialResponseTextKey is a key in userInfo
 * for original server response.
 */
extern NSString *const YMAVASTSpecialResponseTextKey;

/**
 * Interface for getting blocks info and requesting specific block.
 */
@interface YMAYandexVASTAds : NSObject

/**
 * Loads blocks info for specified partnerID and categoryID. 
 * Success or failure events are reported to provided delegate.
 * @param partnerID Partner identifier.
 * @param categoryID Category identifier.
 * @param delegate Object that adopts YMABlocksInfoLoaderDelegate protocol and receives events about loading status.
 */
+ (void)loadBlocksInfoForPartnerID:(NSString *)partnerID
                        categoryID:(NSString *)categoryID
                          delegate:(id<YMABlocksInfoLoaderDelegate>)delegate;

/**
 * Loads VAST description for specified video ads request.
 * @param request Request containing parameters for video ads loading.
 * @param delegate Object that conforms to YMAVideoAdLoaderDelegate protocol and receives loading status events.
 */
+ (void)loadVideoAdsWithRequest:(YMAVideoAdsRequest *)request
                       delegate:(id<YMAVideoAdLoaderDelegate>)delegate;

@end

/**
 * Delegates which adopt YMABlocksInfoLoaderDelegate are notified on blocks info loading state changes.
 */
@protocol YMABlocksInfoLoaderDelegate

/**
 * Called when blocks info have been successfully loaded.
 * @param blocksInfo YMABlocksInfo object that describes available VAST blocks for specified partnerID and categoryID.
 */
- (void)loaderDidLoadBlocksInfo:(YMABlocksInfo *)blocksInfo;

/**
 * Called when error occured while loading blocks.
 * @param error NSError object that describes reason for failure.
 */
- (void)loaderDidFailLoadingBlocksInfoWithError:(NSError *)error;

@end

/**
 * Delegates which adopt YMAVideoAdLoaderDelegate are notified on VAST block loading state changes.
 */
@protocol YMAVideoAdLoaderDelegate <NSObject>

/**
 * Called when VAST Ads have been successfully loaded.
 * @param ads NSArray of YMAVASTAd objects describing each individual VAST block. Usually there is only one object.
 */
- (void)loaderDidLoadVideoAds:(NSArray *)ads;

/**
 * Called when error occured while loading VAST Ads.
 * @param error NSError object describing problem encountered while loading VAST Ads. UserInfo dictionary may contain
 * additional information, such as server response, that cannot be parsed as an XML. @see YMAVASTSpecialResponseTextKey.
 */
- (void)loaderDidFailLoadingVideoAdsWithError:(NSError *)error;

@end
