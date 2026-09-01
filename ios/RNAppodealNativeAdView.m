#import "RNAppodealNativeAdView.h"
#import "RNAppodealNativeAssetView.h"
#import "RNAppodealNativeAdStore.h"
#import "RNADefines.h"

#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <Appodeal/Appodeal.h>

@interface RNAppodealNativeAdView () <APDNativeAdPresentationDelegate>
@property (nonatomic, strong, nullable) APDNativeAd *nativeAd;
@property (nonatomic, strong, nullable) UIView *mediaView;
@property (nonatomic, copy, nullable) NSString *boundAdId;
@end

@implementation RNAppodealNativeAdView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.backgroundColor = UIColor.clearColor;
        _placement = @"default";
        self.clipsToBounds = NO;
    }
    return self;
}

- (void)setAdId:(NSString *)adId {
    if ([_adId isEqualToString:adId]) {
        return;
    }
    _adId = [adId copy];
    self.boundAdId = nil;
    [self bindNativeAd];
}

- (void)setPlacement:(NSString *)placement {
    _placement = placement.length > 0 ? [placement copy] : @"default";
    if (self.boundAdId != nil) {
        self.boundAdId = nil;
        [self bindNativeAd];
    }
}

- (void)onAssetChanged {
    self.boundAdId = nil;
    [self bindNativeAd];
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    if (self.window != nil && self.boundAdId == nil && self.adId.length > 0) {
        [self bindNativeAd];
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.mediaView.frame = self.mediaAsset.mediaContainer.bounds;
    if (self.boundAdId == nil && self.adId.length > 0 && CGRectGetWidth(self.bounds) > 0) {
        [self bindNativeAd];
    }
}

- (void)clearBinding {
    if (self.nativeAd != nil) {
        [self.nativeAd detachFromView];
        self.nativeAd.delegate = nil;
        self.nativeAd = nil;
    }
    [self.mediaView removeFromSuperview];
    self.mediaView = nil;
    self.boundAdId = nil;
}

- (void)bindNativeAd {
    if (self.adId.length == 0) {
        return;
    }
    if ([self.boundAdId isEqualToString:self.adId]) {
        return;
    }
    if (self.window == nil || CGRectGetWidth(self.bounds) <= 0 || CGRectGetHeight(self.bounds) <= 0) {
        return;
    }

    [self clearBinding];

    APDNativeAd *nativeAd = [[RNAppodealNativeAdStore shared] nativeAdForId:self.adId];
    if (nativeAd == nil) {
        if (self.onAdFailedToLoad) {
            self.onAdFailedToLoad(@{@"adId": self.adId ?: @"", @"message": @"native ad not in store"});
        }
        return;
    }

    RNAppodealNativeAssetView *titleAsset = [self assetWithType:@"title"];
    RNAppodealNativeAssetView *descriptionAsset = [self assetWithType:@"description"];
    RNAppodealNativeAssetView *ctaAsset = [self assetWithType:@"callToAction"];
    RNAppodealNativeAssetView *attributionAsset = [self assetWithType:@"attribution"];
    RNAppodealNativeAssetView *iconAsset = [self assetWithType:@"icon"];
    RNAppodealNativeAssetView *mediaAsset = [self assetWithType:@"media"];

    if (mediaAsset == nil && iconAsset == nil) {
        if (self.onAdFailedToLoad) {
            self.onAdFailedToLoad(@{
                @"adId": self.adId ?: @"",
                @"message": @"composable native ad requires media or icon asset"
            });
        }
        return;
    }

    // Fill text/image assets from the ad object (iOS custom path fills via
    // APDNativeAdView outlets; here RN owns the views so we copy fields).
    titleAsset.textLabel.text = nativeAd.title ?: @"";
    descriptionAsset.textLabel.text = nativeAd.descriptionText ?: @"";
    ctaAsset.textLabel.text = nativeAd.callToActionText ?: @"";
    if (attributionAsset.textLabel.text.length == 0) {
        attributionAsset.textLabel.text = @"Ad";
    }

    if (iconAsset.iconImageView != nil && nativeAd.iconImage != nil) {
        if ([nativeAd.iconImage respondsToSelector:@selector(image)]) {
            iconAsset.iconImageView.image = [nativeAd.iconImage performSelector:@selector(image)];
        }
    }

    UIViewController *rootViewController = RCTPresentedViewController();
    if (rootViewController == nil) {
        if (self.onAdFailedToLoad) {
            self.onAdFailedToLoad(@{@"adId": self.adId ?: @"", @"message": @"root view controller unavailable"});
        }
        return;
    }

    // Media: prefer APDMediaView when available (Appodeal iOS media container).
    if (mediaAsset.mediaContainer != nil) {
        Class mediaClass = NSClassFromString(@"APDMediaView");
        if (mediaClass != Nil) {
            UIView *media = [[mediaClass alloc] initWithFrame:mediaAsset.mediaContainer.bounds];
            media.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            [mediaAsset.mediaContainer addSubview:media];
            self.mediaView = media;
            if ([media respondsToSelector:@selector(setNativeAd:rootViewController:)]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
                [media performSelector:@selector(setNativeAd:rootViewController:)
                            withObject:nativeAd
                            withObject:rootViewController];
#pragma clang diagnostic pop
            } else if ([media respondsToSelector:@selector(setNativeAd:)]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
                [media performSelector:@selector(setNativeAd:) withObject:nativeAd];
#pragma clang diagnostic pop
            }
        } else if (nativeAd.mainImage != nil && [nativeAd.mainImage respondsToSelector:@selector(image)]) {
            UIImageView *imageView = [[UIImageView alloc] initWithFrame:mediaAsset.mediaContainer.bounds];
            imageView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            imageView.contentMode = UIViewContentModeScaleAspectFit;
            imageView.image = [nativeAd.mainImage performSelector:@selector(image)];
            [mediaAsset.mediaContainer addSubview:imageView];
            self.mediaView = imageView;
        }
    }

    self.nativeAd = nativeAd;
    self.nativeAd.delegate = self;

    // Register the RN-composed hierarchy for impressions / clicks.
    // Pair of detachFromView used in RNAppodealNativeAdStore.
    if ([nativeAd respondsToSelector:@selector(attachToView:withRootViewController:)]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [nativeAd performSelector:@selector(attachToView:withRootViewController:)
                       withObject:self
                       withObject:rootViewController];
#pragma clang diagnostic pop
    } else if ([nativeAd respondsToSelector:@selector(attachToView:)]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [nativeAd performSelector:@selector(attachToView:) withObject:self];
#pragma clang diagnostic pop
    }

    self.boundAdId = self.adId;
    if (self.onAdLoaded) {
        self.onAdLoaded(@{@"adId": self.adId ?: @""});
    }
}

- (RNAppodealNativeAssetView *)mediaAsset {
    return [self assetWithType:@"media"];
}

- (RNAppodealNativeAssetView *)assetWithType:(NSString *)type {
    return [self findAsset:type inView:self];
}

- (RNAppodealNativeAssetView *)findAsset:(NSString *)type inView:(UIView *)view {
    if ([view isKindOfClass:[RNAppodealNativeAssetView class]]) {
        RNAppodealNativeAssetView *assetView = (RNAppodealNativeAssetView *)view;
        if ([assetView.asset isEqualToString:type]) {
            return assetView;
        }
    }
    for (UIView *child in view.subviews) {
        RNAppodealNativeAssetView *found = [self findAsset:type inView:child];
        if (found != nil) {
            return found;
        }
    }
    return nil;
}

- (void)removeFromSuperview {
    [self clearBinding];
    [super removeFromSuperview];
}

#pragma mark - APDNativeAdPresentationDelegate

- (void)nativeAdWillLogImpression:(APDNativeAd *)nativeAd {
    if (self.onAdShown) {
        self.onAdShown(@{@"adId": self.adId ?: @""});
    }
    [[RNAppodealNativeAdStore shared] emitNativeEvent:kEventNativeShown payload:@{@"adId": self.adId ?: @""}];
}

- (void)nativeAdWillLogUserInteraction:(APDNativeAd *)nativeAd {
    if (self.onAdClicked) {
        self.onAdClicked(@{@"adId": self.adId ?: @""});
    }
    [[RNAppodealNativeAdStore shared] emitNativeEvent:kEventNativeClicked payload:@{@"adId": self.adId ?: @""}];
}

@end
