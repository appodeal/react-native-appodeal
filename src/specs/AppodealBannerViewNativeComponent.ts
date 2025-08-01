import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type BannerAdLoadedEvent = Readonly<{
  height: string;
  isPrecache: boolean;
}>;

export type BannerAdLoadFailedEvent = Readonly<{}>;

export type BannerAdInfoEvent = Readonly<{}>;

export interface NativeProps extends ViewProps {
  adSize?: string;
  placement?: string;
  usesSmartSizing?: boolean;
  onAdLoaded?: DirectEventHandler<BannerAdLoadedEvent>;
  onAdFailedToLoad?: DirectEventHandler<BannerAdLoadFailedEvent>;
  onAdClicked?: DirectEventHandler<BannerAdInfoEvent>;
  onAdExpired?: DirectEventHandler<BannerAdInfoEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'RNAppodealBannerView'
) as HostComponent<NativeProps>;
