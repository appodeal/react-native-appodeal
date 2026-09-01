/**
 * Composable Appodeal native ad — AdMob-style layout in JSX.
 *
 * Stock templates: use <AppodealNative adTemplate="contentStream" />.
 * Custom layout: compose assets under AppodealNativeAdView (both platforms).
 */
import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import AppodealNativeAdViewNative, {
  type NativeProps as AdViewProps,
} from './specs/AppodealNativeAdViewNativeComponent';
import AppodealNativeAssetViewNative from './specs/AppodealNativeAssetViewNativeComponent';

export type AppodealNativeAssetType =
  | 'media'
  | 'icon'
  | 'title'
  | 'description'
  | 'callToAction'
  | 'attribution';

export type AppodealNativeAdViewProps = AdViewProps;

export type AppodealNativeAssetProps = {
  asset: AppodealNativeAssetType;
  style?: StyleProp<ViewStyle | TextStyle>;
  children?: React.ReactNode;
};

export const AppodealNativeAdView = (props: AppodealNativeAdViewProps) => {
  return <AppodealNativeAdViewNative placement="default" {...props} />;
};

export const AppodealNativeAsset = ({
  asset,
  style,
  ...rest
}: AppodealNativeAssetProps) => {
  return (
    <AppodealNativeAssetViewNative asset={asset} style={style} {...rest} />
  );
};

export const AppodealNativeMediaView = (
  props: Omit<AppodealNativeAssetProps, 'asset'>
) => <AppodealNativeAsset asset="media" {...props} />;

export const AppodealNativeIconView = (
  props: Omit<AppodealNativeAssetProps, 'asset'>
) => <AppodealNativeAsset asset="icon" {...props} />;

export const AppodealNativeTitleView = (
  props: Omit<AppodealNativeAssetProps, 'asset'>
) => <AppodealNativeAsset asset="title" {...props} />;

export const AppodealNativeDescriptionView = (
  props: Omit<AppodealNativeAssetProps, 'asset'>
) => <AppodealNativeAsset asset="description" {...props} />;

export const AppodealNativeCallToActionView = (
  props: Omit<AppodealNativeAssetProps, 'asset'>
) => <AppodealNativeAsset asset="callToAction" {...props} />;

export const AppodealNativeAttributionView = (
  props: Omit<AppodealNativeAssetProps, 'asset'>
) => <AppodealNativeAsset asset="attribution" {...props} />;
