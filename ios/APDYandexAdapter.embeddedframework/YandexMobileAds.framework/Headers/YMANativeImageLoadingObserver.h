
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol YMANativeGenericAd;

/**
 * Objects conforming to @p YMANativeAdImageLoadingObserver protocol are notified about image loading progress.
 */
@protocol YMANativeAdImageLoadingObserver <NSObject>

/**
 * Notifies delegate when ad finishes loading images.
 *
 * @param ad Ad sending the message.
 */
- (void)nativeAdDidFinishLoadingImages:(id<YMANativeGenericAd>)ad;

@end

NS_ASSUME_NONNULL_END
