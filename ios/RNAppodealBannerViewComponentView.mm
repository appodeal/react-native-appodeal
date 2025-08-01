#import "RNAppodealBannerViewComponentView.h"
#import "RNAppodealBannerView.h"

#import <react/renderer/components/RNAppodealSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNAppodealSpec/EventEmitters.h>
#import <react/renderer/components/RNAppodealSpec/Props.h>
#import <react/renderer/components/RNAppodealSpec/RCTComponentViewHelpers.h>
#import <React/RCTConversions.h>

using namespace facebook::react;

@interface RNAppodealBannerViewComponentView () <RCTRNAppodealBannerViewViewProtocol>
@end

@implementation RNAppodealBannerViewComponentView {
    RNAppodealBannerView *_bannerView;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNAppodealBannerViewProps>();
        _props = defaultProps;
        
        _bannerView = [[RNAppodealBannerView alloc] initWithFrame:frame];
        self.contentView = _bannerView;
        
        __weak __typeof__(self) weakSelf = self;
        _bannerView.onAdLoaded = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto bannerEventEmitter = std::static_pointer_cast<const RNAppodealBannerViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealBannerViewEventEmitter::OnAdLoaded eventData = {
                    .height = std::string([event[@"height"] UTF8String] ?: ""),
                    .isPrecache = [event[@"isPrecache"] boolValue]
                };
                bannerEventEmitter->onAdLoaded(eventData);
            }
        };
        
        _bannerView.onAdFailedToLoad = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto bannerEventEmitter = std::static_pointer_cast<const RNAppodealBannerViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealBannerViewEventEmitter::OnAdFailedToLoad eventData = {};
                bannerEventEmitter->onAdFailedToLoad(eventData);
            }
        };
        
        _bannerView.onAdClicked = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto bannerEventEmitter = std::static_pointer_cast<const RNAppodealBannerViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealBannerViewEventEmitter::OnAdClicked eventData = {};
                bannerEventEmitter->onAdClicked(eventData);
            }
        };
        
        _bannerView.onAdExpired = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto bannerEventEmitter = std::static_pointer_cast<const RNAppodealBannerViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealBannerViewEventEmitter::OnAdExpired eventData = {};
                bannerEventEmitter->onAdExpired(eventData);
            }
        };
    }
    return self;
}

#pragma mark - RCTComponentViewProtocol

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps {
    const auto &oldViewProps = *std::static_pointer_cast<const RNAppodealBannerViewProps>(_props);
    const auto &newViewProps = *std::static_pointer_cast<const RNAppodealBannerViewProps>(props);
    
    if (oldViewProps.adSize != newViewProps.adSize) {
        _bannerView.adSize = RCTNSStringFromString(newViewProps.adSize);
    }
    
    if (oldViewProps.placement != newViewProps.placement) {
        _bannerView.placement = RCTNSStringFromString(newViewProps.placement);
    }
    
    if (oldViewProps.usesSmartSizing != newViewProps.usesSmartSizing) {
        _bannerView.usesSmartSizing = newViewProps.usesSmartSizing;
    }
    
    [super updateProps:props oldProps:oldProps];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<RNAppodealBannerViewComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> RNAppodealBannerViewCls(void) {
    return RNAppodealBannerViewComponentView.class;
}