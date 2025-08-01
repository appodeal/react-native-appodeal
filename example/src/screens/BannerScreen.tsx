import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Appodeal, {
  AppodealAdType,
  AppodealBannerEvents,
} from 'react-native-appodeal';
import type { NavigationProps } from '../App';
import { commonStyles as styles } from '../styles/common';

interface BannerScreenProps {
  navigation: NavigationProps;
}

export default function BannerScreen({ navigation }: BannerScreenProps) {
  const showTopBanner = () => {
    Appodeal.show(AppodealAdType.BANNER_TOP);
  };

  const showBottomBanner = () => {
    Appodeal.show(AppodealAdType.BANNER_BOTTOM);
  };

  const hideBanner = () => {
    Appodeal.hide(AppodealAdType.BANNER);
  };

  const handlePredictedEcpm = () => {
    const value = Appodeal.predictedEcpm(AppodealAdType.BANNER);
    console.log('Predicted eCPM (Banner):', value);
  };

  const handleCanShow = () => {
    const value = Appodeal.canShow(AppodealAdType.BANNER);
    console.log('Can Show Banner:', value);
  };

  React.useEffect(() => {
    // Subscribe to banner events
    const onLoaded = (event: any) => console.log('Banner loaded', event);
    const onFailedToLoad = () => console.log('Banner failed to load');
    const onExpired = () => console.log('Banner expired');
    const onShown = () => console.log('Banner shown');
    const onClicked = () => console.log('Banner clicked');

    Appodeal.addEventListener(AppodealBannerEvents.LOADED, onLoaded);
    Appodeal.addEventListener(
      AppodealBannerEvents.FAILED_TO_LOAD,
      onFailedToLoad
    );
    Appodeal.addEventListener(AppodealBannerEvents.EXPIRED, onExpired);
    Appodeal.addEventListener(AppodealBannerEvents.SHOWN, onShown);
    Appodeal.addEventListener(AppodealBannerEvents.CLICKED, onClicked);

    return () => {
      Appodeal.removeEventListener(AppodealBannerEvents.LOADED, onLoaded);
      Appodeal.removeEventListener(
        AppodealBannerEvents.FAILED_TO_LOAD,
        onFailedToLoad
      );
      Appodeal.removeEventListener(AppodealBannerEvents.EXPIRED, onExpired);
      Appodeal.removeEventListener(AppodealBannerEvents.SHOWN, onShown);
      Appodeal.removeEventListener(AppodealBannerEvents.CLICKED, onClicked);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={showTopBanner}>
          <Text style={styles.buttonText}>Show Top Banner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showBottomBanner}>
          <Text style={styles.buttonText}>Show Bottom Banner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={hideBanner}>
          <Text style={styles.buttonText}>Hide Banner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePredictedEcpm}>
          <Text style={styles.buttonText}>Get Predicted eCPM</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCanShow}>
          <Text style={styles.buttonText}>Can Show Banner?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
