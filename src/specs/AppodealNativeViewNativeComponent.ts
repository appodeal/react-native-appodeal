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
  /** Layout style: newsFeed | appWall | contentStream. Named adTemplate — `template` is a C++ keyword and breaks Fabric codegen. */
  adTemplate?: string;
  onAdLoaded?: DirectEventHandler<NativeAdInfoEvent>;
  onAdFailedToLoad?: DirectEventHandler<NativeAdLoadFailedEvent>;
  onAdShown?: DirectEventHandler<NativeAdInfoEvent>;
  onAdClicked?: DirectEventHandler<NativeAdInfoEvent>;
  onAdExpired?: DirectEventHandler<NativeAdInfoEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'RNAppodealNativeView'
) as HostComponent<NativeProps>;
