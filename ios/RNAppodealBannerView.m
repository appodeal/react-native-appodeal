#import "RNAppodealBannerView.h"
#import "RNADefines.h"

#import <React/RCTLog.h>
#import <Appodeal/Appodeal.h>


@interface RNAppodealBannerView () <APDBannerViewDelegate> {
    NSString *_placement;
    BOOL _usesSmartSizing;
}

@property (nonatomic, strong) APDBannerView *bannerView;

@end


@implementation RNAppodealBannerView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.backgroundColor = UIColor.clearColor;
        // Set default placement
        _placement = @"default";
    }
    return self;
}

- (NSString *)adSize {
    return NSStringFromAppodealBannerViewSize(self.bannerView.adSize);
}

- (void)setAdSize:(NSString *)adSize {
    UIViewController *rootViewController = RCTPresentedViewController();
    [self.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
    
    CGSize size = RNAppodealBannerViewSizeFromString(adSize);
    NSAssert([Appodeal isInitializedForAdType:AppodealAdTypeBanner],
             @"Appodeal should be initialised with AppodealAdTypeBanner before trying to add AppodealBanner in hierachy");
    
    // Create banner
    self.bannerView = [[APDBannerView alloc] initWithSize:size
                                       rootViewController:rootViewController];
    self.bannerView.delegate = self;
    
    // Set placement (use default if not set)
    self.bannerView.placement = _placement ?: @"default";
    
    // Pre-layout placeholder frame, corrected by -layoutSubviews on the first pass
    self.bannerView.frame = CGRectMake(0, 0, size.width, size.height);
    
    // Add banner to our view hierarchy immediately
    [self addSubview:self.bannerView];
    
    [self.bannerView loadAd];
}

- (NSString *)placement {
    return _placement ?: @"default";
}

- (void)setPlacement:(NSString *)placement {
    _placement = placement ?: @"default";
    if (self.bannerView) {
        self.bannerView.placement = _placement;
    }
}

- (BOOL)usesSmartSizing {
    return self.bannerView.usesSmartSizing;
}

- (void)setUsesSmartSizing:(BOOL)usesSmartSizing {
    _usesSmartSizing = usesSmartSizing;
    self.bannerView.usesSmartSizing = usesSmartSizing;
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    RCTLogError(@"RNAppodealBannerView cannot have subviews");
}

/// Sole owner of the ad view's frame. The creative is always laid out at its natural
/// `adSize`: stretching it to our bounds distorts the creative, and our bounds can be
/// zero before Yoga has measured us, which would collapse the ad entirely. The origin
/// centers the ad in whatever space we were given and is clamped to zero so an
/// oversized creative overflows to the right/bottom instead of off-screen to the left.
- (void)layoutSubviews {
    [super layoutSubviews];

    if (!self.bannerView) {
        return;
    }

    CGSize bannerSize = self.bannerView.adSize;
    CGFloat x = MAX(0, (CGRectGetWidth(self.bounds) - bannerSize.width) / 2.0);
    CGFloat y = MAX(0, (CGRectGetHeight(self.bounds) - bannerSize.height) / 2.0);

    // Snap the origin to the pixel grid, otherwise the creative renders blurry and its
    // tap target shifts by a fraction of a point
    CGFloat scale = self.window.screen.scale ?: UIScreen.mainScreen.scale;
    if (scale <= 0) {
        scale = 1.0;
    }

    self.bannerView.frame = CGRectMake(round(x * scale) / scale,
                                       round(y * scale) / scale,
                                       bannerSize.width,
                                       bannerSize.height);
}

#pragma mark - APDBannerViewDelegate

- (void)bannerViewDidLoadAd:(APDBannerView *)bannerView isPrecache:(BOOL)precache {
    // A banner replaced by -setAdSize: keeps us as its delegate, ignore its callbacks
    if (bannerView != self.bannerView) {
        return;
    }

    // Fires more than once per load cycle and on every refresh, so re-run layout to
    // re-apply the centered frame
    [self setNeedsLayout];

    if (self.onAdLoaded) {
        // Calculate height from the banner's actual size
        CGFloat height = self.bannerView.adSize.height;
        self.onAdLoaded(@{
            @"height": [NSString stringWithFormat:@"%.0f", height],
            @"isPrecache": @(precache)
        });
    }
}

- (void)bannerView:(APDBannerView *)bannerView didFailToLoadAdWithError:(NSError *)error {
    if (self.onAdFailedToLoad) {
        self.onAdFailedToLoad(@{});
    }
}

- (void)bannerViewExpired:(APDBannerView *)bannerView {
    if (self.onAdExpired) {
        self.onAdExpired(@{});
    }
}

- (void)bannerViewDidInteract:(APDBannerView *)bannerView {
    if (self.onAdClicked) {
        self.onAdClicked(@{});
    }
}

@end


@implementation RNAppodealMrecView

/// Weak reference to the most recently created MREC view. MREC is not tracked by the
/// central SDK manager on iOS, so this is what `Appodeal.isLoaded/canShow(MREC)` query.
static __weak RNAppodealMrecView *_activeMrecView = nil;

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        NSAssert([Appodeal isInitializedForAdType:AppodealAdTypeMREC],
                 @"Appodeal should be initialised with AppodealAdTypeMREC before trying to add AppodealMrec in hierarchy");
        
        // Create MREC view
        self.bannerView = [[APDMRECView alloc] init];
        self.bannerView.delegate = self;
        
        // Set default placement
        self.bannerView.placement = self.placement ?: @"default";
        
        // Pre-layout placeholder frame, corrected by -layoutSubviews on the first pass
        self.bannerView.frame = CGRectMake(0, 0, 300, 250);
        
        // Add banner to our view hierarchy immediately
        [self addSubview:self.bannerView];
        
        [self.bannerView loadAd];

        // Track this instance so the central isLoaded/canShow(MREC) calls can query it.
        _activeMrecView = self;
    }
    return self;
}

- (void)setAdSize:(NSString *)adSize {
    // MREC views have fixed size, adSize property is not supported
    NSLog(@"Warning: setAdSize is not supported for MREC views - they have a fixed size of 300x250");
}

+ (BOOL)isActiveMrecReady {
    return _activeMrecView.bannerView.isReady;
}

+ (BOOL)canShowActiveMrecForPlacement:(NSString *)placement {
    APDBannerView *mrecView = _activeMrecView.bannerView;
    if (mrecView == nil) {
        return NO;
    }
    return placement.length > 0
        ? [mrecView hasReadyAdForPlacement:placement]
        : mrecView.isReady;
}

@end

