#import "RNAppodealNativeView.h"
#import "RNAppodealNativeAdStore.h"
#import "RNADefines.h"

#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <Appodeal/Appodeal.h>

@interface RNAppodealNativeView () <APDNativeAdPresentationDelegate>

@property (nonatomic, strong, nullable) APDNativeAd *nativeAd;
@property (nonatomic, strong, nullable) UIView *adContentView;

@end

@implementation RNAppodealNativeView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.backgroundColor = UIColor.clearColor;
        _placement = @"default";
    }
    return self;
}

- (void)setAdId:(NSString *)adId {
    if ([_adId isEqualToString:adId]) {
        return;
    }

    _adId = [adId copy];
    [self reloadNativeAdView];
}

- (void)setPlacement:(NSString *)placement {
    _placement = placement.length > 0 ? [placement copy] : @"default";

    if (self.adContentView != nil) {
        [self reloadNativeAdView];
    }
}

- (void)setTemplateName:(NSString *)templateName {
    _templateName = [templateName copy];

    if (self.adContentView != nil) {
        [self reloadNativeAdView];
    }
}

- (void)reloadNativeAdView {
    [self clearNativeAdView];

    if (self.adId.length == 0) {
        return;
    }

    NSAssert([Appodeal isInitializedForAdType:AppodealAdTypeNativeAd],
             @"Appodeal should be initialised with AppodealAdTypeNativeAd before trying to add RNAppodealNativeView in hierarchy");

    APDNativeAd *nativeAd = [[RNAppodealNativeAdStore shared] nativeAdForId:self.adId];
    if (nativeAd == nil) {
        if (self.onAdFailedToLoad) {
            self.onAdFailedToLoad(@{});
        }
        [[RNAppodealNativeAdStore shared] emitNativeEvent:kEventNativeShowFailed payload:@{@"adId": self.adId}];
        return;
    }

    [self applyTemplateIfNeeded];

    self.nativeAd = nativeAd;
    self.nativeAd.delegate = self;

    UIViewController *rootViewController = RCTPresentedViewController();
    NSError *error = nil;
    UIView *adView = [nativeAd getViewForPlacement:self.placement
                              withRootViewController:rootViewController
                                               error:&error];

    if (adView == nil || error != nil) {
        if (self.onAdFailedToLoad) {
            self.onAdFailedToLoad(@{});
        }

        NSMutableDictionary *payload = [NSMutableDictionary dictionaryWithObject:self.adId forKey:@"adId"];
        if (error.localizedDescription.length > 0) {
            payload[@"message"] = error.localizedDescription;
        }
        [[RNAppodealNativeAdStore shared] emitNativeEvent:kEventNativeShowFailed payload:payload];
        return;
    }

    self.adContentView = adView;
    self.adContentView.frame = self.bounds;
    self.adContentView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    [self addSubview:self.adContentView];

    if (self.onAdLoaded) {
        self.onAdLoaded(@{@"adId": self.adId});
    }
}

- (void)applyTemplateIfNeeded {
    [[RNAppodealNativeAdStore shared] ensureQueue];

    if (self.templateName.length == 0 || [self.templateName isEqualToString:@"default"]) {
        [[RNAppodealNativeAdStore shared] setAdViewTemplateClass:APDDefaultNativeAdView.class];
        return;
    }

    Class templateClass = NSClassFromString(self.templateName);
    [[RNAppodealNativeAdStore shared] setAdViewTemplateClass:templateClass != Nil ? templateClass : APDDefaultNativeAdView.class];
}

- (void)clearNativeAdView {
    if (self.nativeAd != nil) {
        [self.nativeAd detachFromView];
        self.nativeAd.delegate = nil;
        self.nativeAd = nil;
    }

    [self.adContentView removeFromSuperview];
    self.adContentView = nil;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.adContentView.frame = self.bounds;
}

- (void)removeFromSuperview {
    [self clearNativeAdView];
    [super removeFromSuperview];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    RCTLogError(@"RNAppodealNativeView cannot have subviews");
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
