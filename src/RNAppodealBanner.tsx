import React from 'react';
import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';


interface AppodealBannerProps {
	adSize: AdSize,
	placement?: string,
	usesSmartSizing?: boolean
	onAdLoaded?: Function,
	onAdFailedToLoad?: Function,
	onAdClicked?: Function,
	onAdExpired?: Function,
	style?: StyleProp<ViewStyle>
}

type AdSize = 'phone' | 'tablet' | 'mrec';

interface NativeAppodealBannerProps {
	adSize: AdSize,
	placement?: string,
	usesSmartSizing?: boolean,
	onAdLoaded?: Function,
	onAdFailedToLoad?: Function,
	onAdClicked?: Function,
	onAdExpired?: Function,
	style?: StyleProp<ViewStyle>,
}

const RNAppodealBannerView = requireNativeComponent<NativeAppodealBannerProps>('RNAppodealBannerView');

const AppodealBanner = (props: AppodealBannerProps) => {
	const { 
		adSize, 
		placement, 
		usesSmartSizing,
		onAdLoaded, 
		onAdFailedToLoad, 
		onAdClicked, 
		onAdExpired, 
		style, 
		...restProps 
	} = props

	const height: Record<AdSize, number> = {
		phone: 50,
		tablet: 90,
		mrec: 250
	};

	return (
		<RNAppodealBannerView 
			adSize={adSize}
			onAdLoaded={onAdLoaded}
			onAdFailedToLoad={onAdFailedToLoad}
			onAdClicked={onAdClicked}
			onAdExpired={onAdExpired}
			placement={placement}
			usesSmartSizing={usesSmartSizing}
			style={[style, {height: height[adSize]}]}
			{...restProps}
			/>
		);
}

export default AppodealBanner;
