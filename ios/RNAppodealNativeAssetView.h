#import <React/RCTView.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Single native-ad asset marker.
 * asset: media | icon | title | description | callToAction | attribution
 */
@interface RNAppodealNativeAssetView : RCTView

@property (nonatomic, copy) NSString *asset;

@property (nonatomic, strong, readonly) UILabel *textLabel;
@property (nonatomic, strong, readonly) UIImageView *iconImageView;
@property (nonatomic, strong, readonly) UIView *mediaContainer;

@end

NS_ASSUME_NONNULL_END
