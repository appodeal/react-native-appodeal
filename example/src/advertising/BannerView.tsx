import React from 'react';
import { BannerShowStyle, isViewBannerStyle } from "."
import { AppodealBanner } from "react-native-appodeal"
import { styles } from "../styles"


interface BannerViewProps {
    visible: boolean,
    showStyle: BannerShowStyle
}

export const BannerView = (props: BannerViewProps) => {
    const mrec = props.showStyle == BannerShowStyle.MREC;

    return isViewBannerStyle(props.showStyle) && props.visible ?
        <AppodealBanner
            style={mrec ? styles.mrec : styles.banner}
            adSize={mrec ? 'mrec' : 'phone'}
            onAdLoaded={() => console.log("Banner view did load")}
            onAdExpired={() => console.log("Banner view expired")}
            onAdClicked={() => console.log("Banner view is clicked")}
            onAdFailedToLoad={() => console.log("Banner view is failed to load")}
        /> :
        null
}