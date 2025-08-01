import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type MrecAdLoadedEvent = Readonly<{
  isPrecache: boolean;
}>;

export type MrecAdLoadFailedEvent = Readonly<{}>;

export type MrecAdInfoEvent = Readonly<{}>;

export interface NativeProps extends ViewProps {
  placement?: string;
  onAdLoaded?: DirectEventHandler<MrecAdLoadedEvent>;
  onAdFailedToLoad?: DirectEventHandler<MrecAdLoadFailedEvent>;
  onAdClicked?: DirectEventHandler<MrecAdInfoEvent>;
  onAdExpired?: DirectEventHandler<MrecAdInfoEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'RNAppodealMrecView'
) as HostComponent<NativeProps>;
