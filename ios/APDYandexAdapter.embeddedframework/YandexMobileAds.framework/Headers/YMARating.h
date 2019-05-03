/*
 *  YMARating.h
 *
 * This file is a part of the Yandex Advertising Network.
 *
 * Version for iOS © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://legal.yandex.com/partner_ch/
 */

#import <Foundation/Foundation.h>

/**
 * YMARating protocol allows ad to set rating value to arbitrary view.
 */

@protocol YMARating <NSObject>

/**
 * Sets rating value.
 *
 * @param rating Rating represented by double value in interval from 0 to 5.
 */
- (void)setRating:(nullable NSNumber *)rating;

/**
 * Returns rating.
 *
 * @return Rating represented by double value in interval from 0 to 5.
 */
- (nullable NSNumber *)rating;

@end
