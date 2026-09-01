#import <Foundation/Foundation.h>
#import <Appodeal/Appodeal.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAppodealNativeAdStore : NSObject <APDNativeAdQueueDelegate>

+ (instancetype)shared;

- (void)ensureQueue;
- (NSArray<NSDictionary *> *)getNativeAds:(NSInteger)count;
- (NSInteger)availableCount;
- (nullable APDNativeAd *)nativeAdForId:(NSString *)adId;
- (void)destroyAdId:(NSString *)adId;
- (void)setPreferredType:(NSString *)type;
- (void)setAdViewTemplateClass:(Class)templateClass;
- (void)cacheNativeAds:(NSInteger)count;
- (void)emitNativeEvent:(NSString *)eventName payload:(nullable NSDictionary *)payload;

@end

NS_ASSUME_NONNULL_END
