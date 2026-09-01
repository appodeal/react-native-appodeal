import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type NativeAdInfoEvent = Readonly<{
  adId?: string;
}>;

export type NativeAdLoadFailedEvent = Readonly<{
  adId?: string;
  message?: string;
}>;

export interface NativeProps extends ViewProps {
  adId?: string;
  placement?: string;
  onAdLoaded?: DirectEventHandler<NativeAdInfoEvent>;
  onAdFailedToLoad?: DirectEventHandler<NativeAdLoadFailedEvent>;
  onAdShown?: DirectEventHandler<NativeAdInfoEvent>;
  onAdClicked?: DirectEventHandler<NativeAdInfoEvent>;
  onAdExpired?: DirectEventHandler<NativeAdInfoEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'RNAppodealNativeAdView'
) as HostComponent<NativeProps>;
