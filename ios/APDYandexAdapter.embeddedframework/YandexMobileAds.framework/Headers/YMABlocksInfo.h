/*
 *  YMABlocksInfo.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

@interface YMABlocksInfo : NSObject

/**
 * Blocks info model version.
 */
@property (nonatomic, assign, readonly) int version;

/**
 * Partner identifier.
 */
@property (nonatomic, copy, readonly) NSString *partnerID;

/**
 * Session ID which is unique for each retrieved blocks info.
 */
@property (nonatomic, copy, readonly) NSString *sessionID;

/**
 * Unique category id in partner interface.
 */
@property (nonatomic, copy, readonly) NSString *categoryID;

/**
 * Category name in partner interface.
 */
@property (nonatomic, copy, readonly) NSString *categoryName;

/**
 * Player skin file reference.
 */
@property (nonatomic, copy, readonly) NSString *skin;

/**
 * Flag that indicates whether VPAID/MRAID available.
 */
@property (nonatomic, assign, readonly) BOOL VPaidEnabled;

/**
 * Max number of buffer empties.
 */
@property (nonatomic, assign, readonly) int bufferEmptyLimit;

/**
 * Player title.
 */
@property (nonatomic, copy, readonly) NSString *title;

/**
 * Period of time after which Skip button is displayed.
 */
@property (nonatomic, assign, readonly) int skipDelay;

/**
 * Determines if time till ads end should be displayed.
 */
@property (nonatomic, assign, readonly) BOOL showTimeLeft;

/**
 * Determines if time till skip availability should be diplayed.
 */
@property (nonatomic, assign, readonly) BOOL showSkipTimeLeft;

/**
 * VAST loading timeout, milliseconds.
 */
@property (nonatomic, assign, readonly) int VASTTimeout;

/**
 * Response timeout from CDN.
 */
@property (nonatomic, assign, readonly) int videoTimeout;

/**
 * All wrappers receiving timeout.
 */
@property (nonatomic, assign, readonly) int wrapperTimeout;

/**
 * Max number of nested wrappers.
 */
@property (nonatomic, assign, readonly) int wrapperMaxCount;

/**
 * VPAID/MRAID container receiving timeout.
 */
@property (nonatomic, assign, readonly) int VPaidTimeout;

/**
 * Player skin file receiving timeout.
 */
@property (nonatomic, assign, readonly) int skinTimeout;

/**
 * Initial buffer filling timeout.
 */
@property (nonatomic, assign, readonly) int bufferFullTimeout;

/**
 * YMABlock objects.
 */
@property (nonatomic, copy, readonly) NSArray *blocks;

@end
