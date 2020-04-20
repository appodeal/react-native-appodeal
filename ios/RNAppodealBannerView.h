//
//  RNAppodealBannerView.h
//  RNAppodeal
//
//  Created by Stas Kochkin on 26/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAppodealBannerView : RCTView

@property (nonatomic, copy) NSString *adSize;

@property (nonatomic, copy) RCTBubblingEventBlock onAdLoaded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdFailedToLoad;
@property (nonatomic, copy) RCTBubblingEventBlock onAdClicked;
@property (nonatomic, copy) RCTBubblingEventBlock onAdExpired;

@end

NS_ASSUME_NONNULL_END
