/* eslint-disable no-bitwise */
import React from 'react';
import {AppodealAdType, Appodeal} from 'react-native-appodeal';
import {View} from 'react-native';
import {SectionHeader, Row} from '..';
import {
  BannerShowStyle,
  bannerAdType,
  isViewBannerStyle,
} from '../../advertising';
import {BannerView, MrecView} from '../../advertising/BannerView';
import {Spacer} from '../Spacer';

interface ShowSectionProps {
  visible: boolean;
  autocache: number;
  bannerShowStyle: BannerShowStyle;
}

export const ShowSection = (props: ShowSectionProps) => {
  const [isBannerPresented, setBannerPresented] = React.useState(false);
  const [isMrecPresented, setMrecPresented] = React.useState(false);

  const updateBanner = () => {
    if (!isViewBannerStyle(props.bannerShowStyle)) {
      if (isBannerPresented) {
        Appodeal.hide(bannerAdType(props.bannerShowStyle));
        setBannerPresented(false);
      } else if (Appodeal.canShow(bannerAdType(props.bannerShowStyle))) {
        Appodeal.show(bannerAdType(props.bannerShowStyle));
        setBannerPresented(true);
      }
    } else {
      setBannerPresented(!isBannerPresented);
    }
  };

  return props.visible ? (
    <View>
      <SectionHeader value="Interstitial" />
      {(props.autocache & AppodealAdType.INTERSTITIAL) > 0 ? null : (
        <Row
          title="Cache interstitial"
          onClick={() => Appodeal.cache(AppodealAdType.INTERSTITIAL)}
        />
      )}
      <Row
        title="Show interstitial"
        onClick={() => Appodeal.show(AppodealAdType.INTERSTITIAL)}
      />
      {/* <AdStatusFooter adType={AppodealAdType.INTERSTITIAL} /> */}
      <SectionHeader value="Rewarded ads" />
      {(props.autocache & AppodealAdType.REWARDED_VIDEO) > 0 ? null : (
        <Row
          title="Cache rewarded"
          onClick={() => Appodeal.cache(AppodealAdType.REWARDED_VIDEO)}
        />
      )}
      <Row
        title="Show rewarded"
        onClick={() => Appodeal.show(AppodealAdType.REWARDED_VIDEO)}
      />
      {/* <AdStatusFooter adType={AppodealAdType.REWARDED_VIDEO} /> */}
      <SectionHeader value={'Banner ' + props.bannerShowStyle} />
      {(props.autocache & AppodealAdType.BANNER) > 0 ? null : (
        <Row
          title="Cache banner"
          onClick={() => Appodeal.cache(AppodealAdType.BANNER)}
        />
      )}
      <Row
        title={isBannerPresented ? 'Hide banner' : 'Show banner'}
        onClick={updateBanner}
      />
      <BannerView
        showStyle={props.bannerShowStyle}
        visible={isBannerPresented}
      />
      {/* <AdStatusFooter adType={AppodealAdType.BANNER} /> */}
      <SectionHeader value={'MREC'} />
      <Row
        title={!isMrecPresented ? 'Show MREC' : 'Hide MREC'}
        onClick={() => setMrecPresented(!isMrecPresented)}
      />
      <MrecView visible={isMrecPresented} />
      <Spacer value={350} />
    </View>
  ) : null;
};
