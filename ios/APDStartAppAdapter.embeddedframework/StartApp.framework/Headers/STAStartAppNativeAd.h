//
//  STAStartAppNativeAd.h
//  NativeAd
//
//  Created by StartApp on 9/17/14.
//  Copyright (c) 2014 StartApp. All rights reserved.
//  SDK version 3.4.3


#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "STAAbstractAd.h"

typedef enum {
    SIZE_72X72 = 0,
    SIZE_100X100 = 1,
    SIZE_150X150 = 2,
    SIZE_340X340 = 3
} STANativeAdBitmapSize;


@interface STANativeAdPreferences : STAAdPreferences
@property (nonatomic,assign) STANativeAdBitmapSize bitmapSize;
@property  int adsNumber;
@property  int primaryImageSize;
@property  int secondaryImageSize;
@property  bool contentAd;
@property  bool autoBitmapDownload;

@end


@interface STAStartAppNativeAd : STAAbstractAd

@property (nonatomic,assign) BOOL adIsLoaded;
@property (nonatomic, strong) STANativeAdPreferences *preferences;
@property (nonatomic, strong) NSMutableArray *adsDetails;

- (id) init;
- (void) loadAd;
- (void) loadAdWithDelegate:(id<STADelegateProtocol>) delegate;
- (void) loadAdWithNativeAdPreferences:(STANativeAdPreferences*) nativeAdPrefs;
- (void) loadAdWithDelegate:(id<STADelegateProtocol>) delegate withNativeAdPreferences:(STANativeAdPreferences*) nativeAdPrefs;

- (BOOL) isReady;

- (void)setAdTag:(NSString *)adTag;


@end
