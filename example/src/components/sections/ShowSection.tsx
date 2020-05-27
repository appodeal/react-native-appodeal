import React from 'react';
import {
    AppodealAdType,
    Appodeal,
} from 'react-native-appodeal';
import { View } from 'react-native';
import { SectionHeader, Row, AdStatusFooter } from '..';
import { BannerShowStyle } from '../../advertising';


interface ShowSectionProps {
    visible: boolean,
    autocache: number,
    bannerShowStyle: BannerShowStyle,
    bannerOnScreen: boolean,
    updateBanner(): void
}


export const ShowSection = (props: ShowSectionProps) => {
    return props.visible ? (
        <View>
            <SectionHeader value="Interstitial" />
            {
                (props.autocache & AppodealAdType.INTERSTITIAL) > 0 ? null :
                    <Row
                        title='Cache interstitial'
                        onClick={() => Appodeal.cache(AppodealAdType.INTERSTITIAL)}
                    />
            }
            <Row
                title='Show interstitial'
                onClick={() => Appodeal.show(AppodealAdType.INTERSTITIAL)}
            />
            <AdStatusFooter adType={AppodealAdType.INTERSTITIAL} />
            <SectionHeader value="Rewarded ads" />
            {
                (props.autocache & AppodealAdType.REWARDED_VIDEO) > 0 ? null :
                    <Row
                        title='Cache rewarded'
                        onClick={() => Appodeal.cache(AppodealAdType.REWARDED_VIDEO)}
                    />
            }
            <Row
                title='Show rewarded'
                onClick={() => Appodeal.show(AppodealAdType.REWARDED_VIDEO)}
            />
            <AdStatusFooter adType={AppodealAdType.REWARDED_VIDEO} />
            <SectionHeader value={"Banner " + props.bannerShowStyle} />
            {
                (props.autocache & AppodealAdType.BANNER) > 0 ? null :
                    <Row
                        title='Cache banner'
                        onClick={() => Appodeal.cache(AppodealAdType.BANNER)}
                    />
            }
            <Row
                title={props.bannerOnScreen ?
                    'Hide banner' :
                    'Show banner'
                }
                onClick={props.updateBanner}
            />
            <AdStatusFooter adType={AppodealAdType.BANNER} />
        </View>
    ) : null
}
