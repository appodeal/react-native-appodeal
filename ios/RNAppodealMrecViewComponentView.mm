#import "RNAppodealMrecViewComponentView.h"
#import "RNAppodealBannerView.h"

#import <react/renderer/components/RNAppodealSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNAppodealSpec/EventEmitters.h>
#import <react/renderer/components/RNAppodealSpec/Props.h>
#import <react/renderer/components/RNAppodealSpec/RCTComponentViewHelpers.h>
#import <React/RCTConversions.h>

using namespace facebook::react;

@interface RNAppodealMrecViewComponentView () <RCTRNAppodealMrecViewViewProtocol>
@end

@implementation RNAppodealMrecViewComponentView {
    RNAppodealBannerView *_mrecView;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNAppodealMrecViewProps>();
        _props = defaultProps;
        
        _mrecView = [[RNAppodealMrecView alloc] initWithFrame:frame];
        _mrecView.adSize = @"mrec";
        self.contentView = _mrecView;
        
        __weak __typeof__(self) weakSelf = self;
        _mrecView.onAdLoaded = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto mrecEventEmitter = std::static_pointer_cast<const RNAppodealMrecViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealMrecViewEventEmitter::OnAdLoaded eventData = {
                    .isPrecache = [event[@"isPrecache"] boolValue]
                };
                mrecEventEmitter->onAdLoaded(eventData);
            }
        };
        
        _mrecView.onAdFailedToLoad = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto mrecEventEmitter = std::static_pointer_cast<const RNAppodealMrecViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealMrecViewEventEmitter::OnAdFailedToLoad eventData = {};
                mrecEventEmitter->onAdFailedToLoad(eventData);
            }
        };
        
        _mrecView.onAdClicked = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto mrecEventEmitter = std::static_pointer_cast<const RNAppodealMrecViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealMrecViewEventEmitter::OnAdClicked eventData = {};
                mrecEventEmitter->onAdClicked(eventData);
            }
        };
        
        _mrecView.onAdExpired = ^(NSDictionary *event) {
            __typeof__(self) strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitter) {
                auto mrecEventEmitter = std::static_pointer_cast<const RNAppodealMrecViewEventEmitter>(strongSelf->_eventEmitter);
                RNAppodealMrecViewEventEmitter::OnAdExpired eventData = {};
                mrecEventEmitter->onAdExpired(eventData);
            }
        };
    }
    return self;
}

#pragma mark - RCTComponentViewProtocol

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps {
    const auto &oldViewProps = *std::static_pointer_cast<const RNAppodealMrecViewProps>(_props);
    const auto &newViewProps = *std::static_pointer_cast<const RNAppodealMrecViewProps>(props);
    
    if (oldViewProps.placement != newViewProps.placement) {
        _mrecView.placement = RCTNSStringFromString(newViewProps.placement);
    }
    
    [super updateProps:props oldProps:oldProps];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<RNAppodealMrecViewComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> RNAppodealMrecViewCls(void) {
    return RNAppodealMrecViewComponentView.class;
}
