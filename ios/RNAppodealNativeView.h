#import <React/RCTView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAppodealNativeView : RCTView

@property (nonatomic, copy, nullable) NSString *adId;
@property (nonatomic, copy) NSString *placement;
@property (nonatomic, copy, nullable) NSString *templateName;

@property (nonatomic, copy) RCTBubblingEventBlock onAdLoaded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdFailedToLoad;
@property (nonatomic, copy) RCTBubblingEventBlock onAdClicked;
@property (nonatomic, copy) RCTBubblingEventBlock onAdExpired;
@property (nonatomic, copy) RCTBubblingEventBlock onAdShown;

@end

NS_ASSUME_NONNULL_END
