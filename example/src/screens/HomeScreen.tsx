/* eslint-disable no-bitwise */
import React, {useCallback, useEffect} from 'react';
import {styles} from '../styles';
import {initialize} from '../advertising';
import {ShowSection} from '../components/sections/ShowSection';
import {BannerSegmentedControl} from '../components/controls/BannerSegmentedControl';
import {BannerView} from '../advertising/BannerView';
import {AutocacheControl} from '../components/controls/AutocacheControl';
import {AdvancedFeaturesSection} from '../components/sections/AdvancedFeaturesSection';
import {InitialisationSection} from '../components/sections/InitialisationSection';
import {ScrollView, SafeAreaView} from 'react-native';
import {
  AppodealAdType,
  Appodeal,
  AppodealSdkEvent,
} from 'react-native-appodeal';
import {BannerShowStyle, isViewBannerStyle, bannerAdType} from '../advertising';

interface HomeScreenState {
  initialised: boolean;
  initialising: boolean;
  bannerOnScreen: boolean;
  test: boolean;
  autocache: number;
  bannerShowStyle: BannerShowStyle;
}

const defaultState: HomeScreenState = {
  initialised: false,
  initialising: false,
  bannerOnScreen: false,
  test: true,
  autocache: AppodealAdType.INTERSTITIAL | AppodealAdType.BANNER,
  bannerShowStyle: BannerShowStyle.BOTTOM,
};

export const HomeScreen = () => {
  const [state, setState] = React.useState<HomeScreenState>(defaultState);

  const initSDK = useCallback(() => {
    if (!state.initialising) {
      return;
    }

    if (!state.initialised) {
      setState({...state, initialising: true});
      Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () => {
        setState({...state, initialising: false, initialised: true});
      });
    }

    initialize(state.test);
  }, [state.initialising]);

  useEffect(() => {
    initSDK();
  }, [initSDK]);

  useEffect(() => {
    const types = [
      AppodealAdType.INTERSTITIAL,
      AppodealAdType.REWARDED_VIDEO,
      AppodealAdType.BANNER,
    ];
    types.forEach((adType) =>
      Appodeal.setAutoCache(adType, (state.autocache & adType) > 0),
    );
  }, [state.autocache]);

  const updateBanner = () => {
    if (!isViewBannerStyle(state.bannerShowStyle)) {
      if (state.bannerOnScreen) {
        Appodeal.hide(bannerAdType(state.bannerShowStyle));
      } else {
        Appodeal.show(bannerAdType(state.bannerShowStyle));
      }
    }
    setState({
      ...state,
      bannerOnScreen: !state.bannerOnScreen,
    });
  };

  return (
    <>
      <BannerView
        showStyle={state.bannerShowStyle}
        visible={state.bannerOnScreen}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <InitialisationSection
            test={state.test}
            initialising={state.initialising}
            initialised={state.initialised}
            onValueChange={(value, key) => setState({...state, [key]: value})}
          />
          <AdvancedFeaturesSection />
          <AutocacheControl
            mask={state.autocache}
            onUpdate={(autocache) => setState({...state, autocache: autocache})}
          />
          <BannerSegmentedControl
            visible={!state.initialised}
            showStyle={state.bannerShowStyle}
            onChange={(style) => setState({...state, bannerShowStyle: style})}
          />
          <ShowSection
            visible={state.initialised}
            autocache={state.autocache}
            bannerOnScreen={state.bannerOnScreen}
            bannerShowStyle={state.bannerShowStyle}
            updateBanner={updateBanner}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
