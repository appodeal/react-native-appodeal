/* eslint-disable no-bitwise */
import React, {useEffect} from 'react';
import {styles} from '../styles';
import {initialize, isInitialized, SDKState} from '../advertising';
import {ShowSection} from '../components/sections/ShowSection';
import {BannerSegmentedControl} from '../components/controls/BannerSegmentedControl';
import {AutocacheControl} from '../components/controls/AutocacheControl';
import {InitialisationSection} from '../components/sections/InitialisationSection';
import {ScrollView, SafeAreaView, Switch} from 'react-native';
import {Row} from '../components';
import {
  AppodealAdType,
  Appodeal,
  AppodealSdkEvent,
} from 'react-native-appodeal';
import {BannerShowStyle} from '../advertising';

export const HomeScreen = () => {
  const [state, setState] = React.useState(
    isInitialized() ? SDKState.INITIALIZED : SDKState.PENDING,
  );

  const [autocache, setAutocache] = React.useState(
    AppodealAdType.INTERSTITIAL | AppodealAdType.BANNER,
  );

  const [testMode, setTestMode] = React.useState(true);

  const [bannerShowStyle, setBannerShowStyle] = React.useState(
    BannerShowStyle.BOTTOM,
  );

  const initSDK = () => {
    if (state === SDKState.INITIALIZING) {
      return;
    }

    if (state !== SDKState.INITIALIZED) {
      setState(SDKState.INITIALIZING);
      Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () => {
        setState(SDKState.INITIALIZED);
      });
    }

    initialize(testMode);
  };

  useEffect(() => {
    const types = [
      AppodealAdType.INTERSTITIAL,
      AppodealAdType.REWARDED_VIDEO,
      AppodealAdType.BANNER,
    ];
    types.forEach((adType) =>
      Appodeal.setAutoCache(adType, (autocache & adType) > 0),
    );
  }, [autocache]);

  const testModeSwitch = () => (
    <Switch value={testMode} onValueChange={setTestMode} />
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <InitialisationSection state={state} onInitialize={initSDK} />
          <Row title="Test mode" accessory={testModeSwitch} />
          <AutocacheControl
            mask={autocache}
            onUpdate={(value) => setAutocache(value)}
          />
          <BannerSegmentedControl
            visible={state !== SDKState.INITIALIZED}
            showStyle={bannerShowStyle}
            onChange={setBannerShowStyle}
          />
          <ShowSection
            visible={state === SDKState.INITIALIZED}
            autocache={autocache}
            bannerShowStyle={bannerShowStyle}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
