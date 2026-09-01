#import "RNAppodealNativeAdStore.h"
#import "RNADefines.h"
#import "RNAEventDispatcher.h"

@interface RNAppodealNativeAdStore ()

@property (nonatomic, strong, nullable) APDNativeAdQueue *queue;
@property (nonatomic, strong) NSMutableDictionary<NSString *, APDNativeAd *> *adsById;
@property (nonatomic, copy) NSString *preferredContentType;

@end

@implementation RNAppodealNativeAdStore

+ (instancetype)shared {
    static RNAppodealNativeAdStore *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _adsById = [NSMutableDictionary dictionary];
        _preferredContentType = @"auto";
    }
    return self;
}

#pragma mark - Queue lifecycle

- (void)ensureQueue {
    if (self.queue != nil) {
        return;
    }

    APDNativeAdQueue *queue = [[APDNativeAdQueue alloc] init];
    // Appodeal iOS docs: APDNativeAdSettings.default()
    queue.settings = [APDNativeAdSettings default];
    queue.settings.adViewClass = APDDefaultNativeAdView.class;
    queue.settings.type = [self nativeAdTypeFromPreferredContentType:self.preferredContentType];
    queue.delegate = self;

    self.queue = queue;
    [self.queue loadAd];
}

- (APDNativeAdType)nativeAdTypeFromPreferredContentType:(NSString *)type {
    if ([type isEqualToString:@"noVideo"]) {
        return APDNativeAdTypeNoVideo;
    }
    if ([type isEqualToString:@"video"]) {
        return APDNativeAdTypeVideo;
    }
    return APDNativeAdTypeAuto;
}

- (void)setPreferredType:(NSString *)type {
    self.preferredContentType = type ?: @"auto";

    if (self.queue != nil) {
        self.queue.settings.type = [self nativeAdTypeFromPreferredContentType:self.preferredContentType];
    }
}

- (void)setAdViewTemplateClass:(Class)templateClass {
    [self ensureQueue];

    if (templateClass != Nil) {
        self.queue.settings.adViewClass = templateClass;
    } else {
        self.queue.settings.adViewClass = APDDefaultNativeAdView.class;
    }
}

- (void)cacheNativeAds:(NSInteger)count {
    [self ensureQueue];

    if ([self.queue respondsToSelector:@selector(setMaxAdSize:)]) {
        [self.queue setMaxAdSize:count];
    }

    [self.queue loadAd];
}

#pragma mark - Ad access

- (NSInteger)availableCount {
    if (self.queue == nil) {
        return 0;
    }

    // APDNativeAdQueue exposes currentAdCount; Appodeal also has availableNativeAdsCount.
    if ([self.queue respondsToSelector:@selector(currentAdCount)]) {
        return self.queue.currentAdCount;
    }

    return (NSInteger)[Appodeal availableNativeAdsCount];
}

- (NSArray<NSDictionary *> *)getNativeAds:(NSInteger)count {
    [self ensureQueue];

    if (count <= 0) {
        return @[];
    }

    NSArray<APDNativeAd *> *nativeAds = [self.queue getNativeAdsOfCount:count];
    NSMutableArray<NSDictionary *> *result = [NSMutableArray arrayWithCapacity:nativeAds.count];

    for (APDNativeAd *nativeAd in nativeAds) {
        NSString *adId = [[NSUUID UUID] UUIDString];
        self.adsById[adId] = nativeAd;

        NSMutableDictionary *payload = [NSMutableDictionary dictionary];
        payload[@"id"] = adId;
        payload[@"title"] = nativeAd.title ?: @"";
        payload[@"description"] = nativeAd.descriptionText ?: @"";
        payload[@"callToAction"] = nativeAd.callToActionText ?: @"";
        payload[@"rating"] = nativeAd.starRating ?: @0;
        payload[@"containsVideo"] = @(nativeAd.containsVideo);
        payload[@"predictedEcpm"] = @([Appodeal predictedEcpmForAdType:AppodealAdTypeNativeAd]);

        [result addObject:payload];
    }

    return result;
}

- (APDNativeAd *)nativeAdForId:(NSString *)adId {
    if (adId.length == 0) {
        return nil;
    }
    return self.adsById[adId];
}

- (void)destroyAdId:(NSString *)adId {
    if (adId.length == 0) {
        return;
    }

    APDNativeAd *nativeAd = self.adsById[adId];
    if (nativeAd != nil) {
        [nativeAd detachFromView];
        nativeAd.delegate = nil;
    }

    [self.adsById removeObjectForKey:adId];
}

#pragma mark - Events

- (void)emitNativeEvent:(NSString *)eventName payload:(nullable NSDictionary *)payload {
    [[RNAEventDispatcher sharedDispatcher] dispatchEvent:eventName payload:payload];
}

#pragma mark - APDNativeAdQueueDelegate

- (void)adQueueAdIsAvailable:(APDNativeAdQueue *)adQueue ofCount:(NSInteger)count {
    [self emitNativeEvent:kEventNativeLoaded payload:@{@"count": @(count)}];
}

- (void)adQueue:(APDNativeAdQueue *)adQueue failedWithError:(NSError *)error {
    NSMutableDictionary *payload = [NSMutableDictionary dictionary];
    if (error.localizedDescription.length > 0) {
        payload[@"message"] = error.localizedDescription;
    }
    [self emitNativeEvent:kEventNativeFailedToLoad payload:payload.count > 0 ? payload : nil];
}

@end
