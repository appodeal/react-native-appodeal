import React from 'react';
import {BannerShowStyle, isViewBannerStyle} from '.';
import {AppodealBanner, AppodealMrec} from 'react-native-appodeal';
import {styles} from '../styles';

interface BannerViewProps {
  visible: boolean;
  showStyle: BannerShowStyle;
}

interface MrecViewProps {
  visible: boolean;
}

export const BannerView = (props: BannerViewProps) => {
  return isViewBannerStyle(props.showStyle) && props.visible ? (
    <AppodealBanner
      style={styles.banner}
      adSize={'phone'}
      onAdLoaded={() => console.log('Banner view did load')}
      onAdExpired={() => console.log('Banner view expired')}
      onAdClicked={() => console.log('Banner view is clicked')}
      onAdFailedToLoad={() => console.log('Banner view is failed to load')}
      usesSmartSizing
    />
  ) : null;
};

export const MrecView = (props: MrecViewProps) => {
  return props.visible ? (
    <AppodealMrec
      style={styles.mrec}
      onAdLoaded={() => console.log('MREC view did load')}
      onAdExpired={() => console.log('MREC view expired')}
      onAdClicked={() => console.log('MREC view is clicked')}
      onAdFailedToLoad={() => console.log('MREC view is failed to load')}
    />
  ) : null;
};
