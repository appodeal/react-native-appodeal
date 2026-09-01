#import "RNAppodealNativeAssetView.h"

@interface RNAppodealNativeAssetView ()
@property (nonatomic, strong, readwrite) UILabel *textLabel;
@property (nonatomic, strong, readwrite) UIImageView *iconImageView;
@property (nonatomic, strong, readwrite) UIView *mediaContainer;
@end

@implementation RNAppodealNativeAssetView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        _asset = @"title";
        self.clipsToBounds = NO;
        [self rebuildContent];
    }
    return self;
}

- (void)setAsset:(NSString *)asset {
    NSString *normalized = asset.length > 0 ? asset : @"title";
    if ([_asset isEqualToString:normalized]) {
        return;
    }
    _asset = [normalized copy];
    [self rebuildContent];

    UIView *parent = self.superview;
    while (parent != nil) {
        if ([parent respondsToSelector:@selector(onAssetChanged)]) {
            [parent performSelector:@selector(onAssetChanged)];
            break;
        }
        parent = parent.superview;
    }
}

- (void)rebuildContent {
    [self.textLabel removeFromSuperview];
    [self.iconImageView removeFromSuperview];
    [self.mediaContainer removeFromSuperview];
    self.textLabel = nil;
    self.iconImageView = nil;
    self.mediaContainer = nil;

    if ([self.asset isEqualToString:@"media"]) {
        UIView *container = [[UIView alloc] initWithFrame:self.bounds];
        container.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        container.clipsToBounds = YES;
        [self addSubview:container];
        self.mediaContainer = container;
        return;
    }

    if ([self.asset isEqualToString:@"icon"]) {
        UIImageView *imageView = [[UIImageView alloc] initWithFrame:self.bounds];
        imageView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        imageView.contentMode = UIViewContentModeScaleAspectFit;
        imageView.clipsToBounds = YES;
        [self addSubview:imageView];
        self.iconImageView = imageView;
        return;
    }

    UILabel *label = [[UILabel alloc] initWithFrame:self.bounds];
    label.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    label.numberOfLines = [self.asset isEqualToString:@"title"] ? 2 : 1;
    label.lineBreakMode = NSLineBreakByTruncatingTail;
    if ([self.asset isEqualToString:@"callToAction"] || [self.asset isEqualToString:@"attribution"]) {
        label.textAlignment = NSTextAlignmentCenter;
    }
    [self addSubview:label];
    self.textLabel = label;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.textLabel.frame = self.bounds;
    self.iconImageView.frame = self.bounds;
    self.mediaContainer.frame = self.bounds;
}

@end
