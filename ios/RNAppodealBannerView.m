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
    
    // Set our frame to match the banner size initially
    self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, size.width, size.height);
    
    // Set banner frame to fill our bounds
    self.bannerView.frame = CGRectMake(0, 0, size.width, size.height);
    
    // Add banner to our view hierarchy immediately
    [self addSubview:self.bannerView];
    
    // Update our intrinsic content size
    [self invalidateIntrinsicContentSize];
    
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

- (void)layoutSubviews {
    [super layoutSubviews];
    
    if (self.bannerView) {
        // Get the banner's natural size
        CGSize bannerSize = self.bannerView.adSize;
        
        // Center the banner in our bounds if our container is larger
        if (CGRectGetWidth(self.bounds) > bannerSize.width ||
            CGRectGetHeight(self.bounds) > bannerSize.height) {
            
            CGRect bannerFrame = CGRectMake(
                (self.bounds.size.width - bannerSize.width) / 2.0,
                (self.bounds.size.height - bannerSize.height) / 2.0,
                bannerSize.width,
                bannerSize.height
            );
            self.bannerView.frame = bannerFrame;
        } else {
            // If container is smaller, fill it
            self.bannerView.frame = self.bounds;
        }
        
        // If banner view hasn't been added to hierarchy yet, add it
        if (self.bannerView.superview != self) {
            [self addSubview:self.bannerView];
        }
    }
}

- (CGSize)intrinsicContentSize {
    if (self.bannerView) {
        // For MREC views, return fixed size; for banner views, use adSize
        if ([self isKindOfClass:[RNAppodealMrecView class]]) {
            return CGSizeMake(300, 250); // Standard MREC size
        } else {
            return self.bannerView.adSize;
        }
    }
    return CGSizeMake(UIViewNoIntrinsicMetric, UIViewNoIntrinsicMetric);
}

#pragma mark - APDBannerViewDelegate

- (void)bannerViewDidLoadAd:(APDBannerView *)bannerView isPrecache:(BOOL)precache {
    // Ensure banner is added to view hierarchy
    if (self.bannerView.superview != self) {
        [self addSubview:self.bannerView];
    }
    
    // Use the banner's intrinsic size (don't force it to our potentially zero bounds)
    CGSize bannerSize = self.bannerView.adSize;
    self.bannerView.frame = CGRectMake(0, 0, bannerSize.width, bannerSize.height);
    
    // Update our intrinsic content size to match the banner
    [self invalidateIntrinsicContentSize];
    
    if (self.onAdLoaded) {
        // Calculate height from the banner's actual size
        CGFloat height = bannerSize.height;
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

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        NSAssert([Appodeal isInitializedForAdType:AppodealAdTypeMREC],
                 @"Appodeal should be initialised with AppodealAdTypeMREC before trying to add AppodealMrec in hierarchy");
        
        // Set our frame to MREC standard size (300x250)
        self.frame = CGRectMake(frame.origin.x, frame.origin.y, 300, 250);
        
        // Create MREC view
        self.bannerView = [[APDMRECView alloc] init];
        self.bannerView.delegate = self;
        
        // Set default placement
        self.bannerView.placement = self.placement ?: @"default";
        
        // Set banner frame to fill our bounds
        self.bannerView.frame = CGRectMake(0, 0, 300, 250);
        
        // Add banner to our view hierarchy immediately
        [self addSubview:self.bannerView];
        
        // Update our intrinsic content size
        [self invalidateIntrinsicContentSize];
        
        [self.bannerView loadAd];
    }
    return self;
}

- (void)setAdSize:(NSString *)adSize {
    // MREC views have fixed size, adSize property is not supported
    NSLog(@"Warning: setAdSize is not supported for MREC views - they have a fixed size of 300x250");
}

@end

