//
//  STANativeAdDetails.h
//  StartApp
//
//  Created by StartApp on 9/15/14.
//  Copyright (c) 2014 StartApp. All rights reserved.
//  SDK version 3.4.3

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface STANativeAdDetails : NSObject

@property (nonatomic, strong) NSString *title;
@property (nonatomic, strong) NSString *description;
@property (nonatomic, strong) NSNumber *rating;
@property (nonatomic, strong) NSString *imageUrl;
@property (nonatomic, strong) NSString *secondaryImageUrl;
@property (nonatomic, strong) UIImage *imageBitmap;
@property (nonatomic, strong) UIImage *secondaryImageBitmap;
@property (nonatomic, strong) NSString *category;
@property (nonatomic, strong) NSString *adId;
@property (nonatomic, strong) NSString *clickToInstall;
@property (nonatomic, strong) NSString *eulaUrl;
@property (nonatomic, strong) NSString *policyImageUrl;
@property (nonatomic, strong) NSString *policyImagePath;

- (void) sendImpression;
- (void) sendClick;

@end
