/*
 *  YMAVideoAdsRequest.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

extern NSString *const kYMAVideoAdsCharsetUTF8;
extern NSString *const kYMAVideoAdsCharsetCP1251;
extern NSString *const kYMAVideoAdsCharsetKOI8R;
extern NSString *const kYMAVideoAdsCharsetKOI8U;

@class YMABlocksInfo;

/**
 * YMAVideoAdsRequest allows to configure parameters for video ads loading.
 */

@interface YMAVideoAdsRequest : NSObject <NSCopying, NSMutableCopying>

/**
 * Initializes YMAVideoAdsRequest with required parameters.
 * @param blockID Block ID retrieved from YMABlock.
 * @param blocksInfo BlockInfo object provided by blocksInfo request.
 * @param pageRef page-ref provided to partners by Yandex.
 * @param targetRef target-ref provided to partners by Yandex.
 * @return YMAVideoAdsRequest initialized with required parameters.
 */
- (id)initWithBlockID:(NSString *)blockID
           blocksInfo:(YMABlocksInfo *)blocksInfo
              pageRef:(NSString *)pageRef
            targetRef:(NSString *)targetRef;

/**
 * Block ID to load ads for.
 */
@property (nonatomic, copy, readonly) NSString *blockID;

/**
 * BlockInfo object provided by blocksInfo request.
 */
@property (nonatomic, strong, readonly) YMABlocksInfo *blocksInfo;

/**
 * Referrer, page-ref provided to partners by Yandex.
 */
@property (nonatomic, copy, readonly) NSString *pageRef;

/**
 * Domain, target-ref provided to partners by Yandex.
 */
@property (nonatomic, copy, readonly) NSString *targetRef;

/**
 * Size of player used to display video content.
 */
@property (nonatomic, copy, readonly) NSValue *playerSize;

/**
 * External user id in coordinates of advertising space.
 */
@property (nonatomic, copy, readonly) NSString *externalUserID;

/**
 * Publisher id.
 */
@property (nonatomic, copy, readonly) NSString *publisherID;

/**
 * Publisher name.
 */
@property (nonatomic, copy, readonly) NSString *publisherName;

/**
 * Content id retrieved from advertising space.
 */
@property (nonatomic, copy, readonly) NSString *contentID;

/**
 * Content name.
 */
@property (nonatomic, copy, readonly) NSString *contentName;

/**
 * Genre id retrieved from advertising space.
 */
@property (nonatomic, copy, readonly) NSString *genreID __attribute__((deprecated("genreIDs should be used instead")));

/**
 * Genre ids retrieved from advertising space.
 */
@property (nonatomic, copy, readonly) NSArray *genreIDs;

/**
 * Genre names retrieved from advertising space.
 */
@property (nonatomic, copy, readonly) NSArray *genreNames;

/**
 * Array of tag strings.
 */
@property (nonatomic, copy, readonly) NSArray *tags;

/**
 * Bitrate in Kbps.
 */
@property (nonatomic, assign, readonly) NSInteger bitrate;

/**
 * Charset. One of the following predefined charsets should be used:
 * - kYMAVideoAdsCharsetUTF8
 * - kYMAVideoAdsCharsetCP1251
 * - kYMAVideoAdsCharsetKOI8R
 * - kYMAVideoAdsCharsetKOI8U
 * Default is UTF-8 charset defined by kYMAVideoAdsChasetUTF8 constant.
 */
@property (nonatomic, copy, readonly) NSString *charset;

/**
 * Custom additional parameters.
 */
@property (nonatomic, copy, readonly) NSString *extendedParameters;

@end

/**
 * YMAMutableVideoAdsRequest allows to configure optional parameters for video ads loading.
 */
@interface YMAMutableVideoAdsRequest : YMAVideoAdsRequest

/**
 * Size of player used to display video content.
 */
@property (nonatomic, copy) NSValue *playerSize;

/**
 * External user id in coordinates of advertising space.
 */
@property (nonatomic, copy) NSString *externalUserID;

/**
 * Publisher id.
 */
@property (nonatomic, copy) NSString *publisherID;

/**
 * Publisher name.
 */
@property (nonatomic, copy) NSString *publisherName;

/**
 * Content id retrieved from advertising space.
 */
@property (nonatomic, copy) NSString *contentID;

/**
 * Content name.
 */
@property (nonatomic, copy) NSString *contentName;

/**
 * Genre id retrieved from advertising space.
 */
@property (nonatomic, copy) NSString *genreID __attribute__((deprecated("genreIDs should be used instead")));

/**
 * Genre ids retrieved from advertising space.
 */
@property (nonatomic, copy) NSArray *genreIDs;

/**
 * Genre names retrieved from advertising space.
 */
@property (nonatomic, copy) NSArray *genreNames;

/**
 * Array of tag strings.
 */
@property (nonatomic, copy) NSArray *tags;

/**
 * Bitrate in Kbps.
 */
@property (nonatomic, assign) NSInteger bitrate;

/**
 * Charset. One of the following predefined charsets should be used:
 * - kYMAVideoAdsCharsetUTF8
 * - kYMAVideoAdsCharsetCP1251
 * - kYMAVideoAdsCharsetKOI8R
 * - kYMAVideoAdsCharsetKOI8U
 * Default is UTF-8 charset defined by kYMAVideoAdsCharsetUTF8 constant.
 */
@property (nonatomic, copy) NSString *charset;

/**
 * Custom additional parameters.
 */
@property (nonatomic, copy) NSString *extendedParameters;

@end
