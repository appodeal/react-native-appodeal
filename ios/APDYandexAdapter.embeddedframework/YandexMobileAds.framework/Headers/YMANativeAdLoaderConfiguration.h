
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/** Small image size */
extern NSString *const kYMANativeImageSizeSmall;

/** Medium image size */
extern NSString *const kYMANativeImageSizeMedium;

/** Large image size */
extern NSString *const kYMANativeImageSizeLarge;

@interface YMANativeAdLoaderConfiguration : NSObject

/**
 * Unique ad placement ID created at partner interface.
 * Identifies ad placement for specific application.
 * Format: R-M-XXXXXX-Y
 */
@property (nonatomic, copy, readonly) NSString *blockID;

/**
 * Sizes of images supported by application. Affects ad image asset size.
 */
@property (nonatomic, copy, readonly) NSArray *imageSizes;

/**
 * Determines if ad images should be loaded as a part of ad loading process.
 * All images will be loaded and ready to be used if set to YES. 
 * Otherwise images should be loaded manually with @p loadImages method.
 *
 * @discussion It is strongly recommended to load images manually 
 * if many ads with large images are loaded.
 * Otherwise images will consume too much memory and can eventually crash application.
 */
@property (nonatomic, assign, readonly) BOOL shouldLoadImagesAutomatically;

/**
 * Returns native ad loader configuration, for loading ads for specific block ID and any image size.
 *
 * @param blockID Unique ad placement ID created at partner interface.
 * @param shouldLoadImagesAutomatically Determines if ad images should be loaded as a part of ad loading process.
 *
 * @discussion It is strongly recommended to load images manually
 * if many ads with large images are loaded.
 * Otherwise images will consume too much memory and can eventually crash application.
 *
 * @return Native ad loader configuration.
 */
- (instancetype)initWithBlockID:(NSString *)blockID
        loadImagesAutomatically:(BOOL)shouldLoadImagesAutomatically;

/**
 * Returns native ad loader configuration, for loading ads for specific block ID and any image size.
 *
 * @param blockID Unique ad placement ID created at partner interface.
 * @param imageSizes Sizes of images to supported by application. Ad image asset will be of one of supported sizes.
 * @param shouldLoadImagesAutomatically Determines if ad images should be loaded as a part of ad loading process.
 *
 * @discussion It is strongly recommended to load images manually
 * if many ads with large images are loaded.
 * Otherwise images will consume too much memory and can eventually crash application.
 *
 * @return Native ad loader configuration.
 */
- (instancetype)initWithBlockID:(NSString *)blockID
                     imageSizes:(NSArray *)imageSizes
        loadImagesAutomatically:(BOOL)shouldLoadImagesAutomatically NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
