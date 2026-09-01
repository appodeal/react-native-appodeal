import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  /**
   * Asset role inside AppodealNativeAdView:
   * media | icon | title | description | callToAction | attribution
   */
  asset?: string;
}

export default codegenNativeComponent<NativeProps>(
  'RNAppodealNativeAssetView'
) as HostComponent<NativeProps>;
