import React from 'react';
import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';


interface AppodealMrecProps {
	placement?: string,
	onAdLoaded?: Function,
	onAdFailedToLoad?: Function,
	onAdClicked?: Function,
	onAdExpired?: Function,
	style?: StyleProp<ViewStyle>
}


interface NativeAppodealMrecProps {
	placement?: string,
	onAdLoaded?: Function,
	onAdFailedToLoad?: Function,
	onAdClicked?: Function,
	onAdExpired?: Function,
	style?: StyleProp<ViewStyle>,
}


const RNAppodealMrecView = requireNativeComponent<NativeAppodealMrecProps>('RNAppodealMrecView');

const AppodealMrec = (props: AppodealMrecProps) => {
	const { 
		placement, 
		onAdLoaded, 
		onAdFailedToLoad, 
		onAdClicked, 
		onAdExpired, 
		style, 
		...restProps 
	} = props

	return (
		<RNAppodealMrecView 
			onAdLoaded={onAdLoaded}
			onAdFailedToLoad={onAdFailedToLoad}
			onAdClicked={onAdClicked}
			onAdExpired={onAdExpired}
			placement={placement}
			style={[style, {height: 250}]}
			{...restProps}
			/>
		);
}

export default AppodealMrec;