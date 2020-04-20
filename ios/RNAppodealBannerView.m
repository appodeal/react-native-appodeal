//
//  RNAppodealBannerView.m
//  RNAppodeal
//
//  Created by Stas Kochkin on 26/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNAppodealBannerView.h"
#import "RNADefines.h"

#import <React/RCTLog.h>
#import <Appodeal/Appodeal.h>


@interface RNAppodealBannerView () <APDBannerViewDelegate>

@property (nonatomic, strong) APDBannerView *bannerView;

@end


@implementation RNAppodealBannerView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.backgroundColor = UIColor.clearColor;
    }
    return self;
}

- (NSString *)adSize {
    return NSStringFromAppodealBannerViewSize(self.bannerView.adSize);
}

- (void)setAdSize:(NSString *)adSize {
    UIViewController *rootViewController = UIApplication.sharedApplication.keyWindow.rootViewController;
    [self.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
    CGSize size = RNAppodealBannerViewSizeFromString(adSize);
    if (size.height == 250) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated"
        self.bannerView = [[APDMRECView alloc] init];
#pragma clang diagnostic pop
    } else {
        self.bannerView = [[APDBannerView alloc] initWithSize:size
                                           rootViewController:rootViewController];
    }
    self.bannerView.delegate = self;
    self.bannerView.frame = self.bounds;
    [self addSubview:self.bannerView];
    [self.bannerView loadAd];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    RCTLogError(@"RNDFPBannerView cannot have subviews");
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.bannerView.frame = self.bounds;
}

#pragma mark APDBannerViewDelegate

- (void)bannerViewDidLoadAd:(APDBannerView *)bannerView isPrecache:(BOOL)precache {
    self.onAdLoaded ? self.onAdLoaded(@{@"isPreache": @(precache)}) : nil;
}

- (void)bannerView:(APDBannerView *)bannerView didFailToLoadAdWithError:(NSError *)error {
    self.onAdFailedToLoad ? self.onAdFailedToLoad(@{@"error": error.localizedDescription}) : nil;
}

- (void)bannerViewExpired:(APDBannerView *)bannerView {
    self.onAdExpired ? self.onAdExpired(@{}) : nil;
}

- (void)bannerViewDidInteract:(APDBannerView *)bannerView {
    self.onAdClicked ? self.onAdClicked(@{}) : nil;
}

@end
