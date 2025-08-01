import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Appodeal, {
  AppodealAdType,
  AppodealInterstitialEvents,
} from 'react-native-appodeal';
import type { NavigationProps } from '../App';
import { commonStyles as styles } from '../styles/common';

interface InterstitialScreenProps {
  navigation: NavigationProps;
}

export default function InterstitialScreen({
  navigation,
}: InterstitialScreenProps) {
  const loadInterstitial = () => {
    Appodeal.cache(AppodealAdType.INTERSTITIAL);
  };

  const showInterstitial = () => {
    Appodeal.show(AppodealAdType.INTERSTITIAL);
  };

  const handlePredictedEcpm = () => {
    const value = Appodeal.predictedEcpm(AppodealAdType.INTERSTITIAL);
    console.log('Predicted eCPM:', value);
  };

  const handleCanShow = () => {
    const value = Appodeal.canShow(AppodealAdType.INTERSTITIAL);
    console.log('Can Show Interstitial:', value);
  };

  React.useEffect(() => {
    // Subscribe to interstitial events
    const onLoaded = (event: any) => console.log('Interstitial loaded', event);
    const onFailedToLoad = () => console.log('Interstitial failed to load');
    const onExpired = () => console.log('Interstitial expired');
    const onShown = () => console.log('Interstitial shown');
    const onFailedToShow = () => console.log('Interstitial failed to show');
    const onClicked = () => console.log('Interstitial clicked');
    const onClosed = () => console.log('Interstitial closed');

    Appodeal.addEventListener(AppodealInterstitialEvents.LOADED, onLoaded);
    Appodeal.addEventListener(
      AppodealInterstitialEvents.FAILED_TO_LOAD,
      onFailedToLoad
    );
    Appodeal.addEventListener(AppodealInterstitialEvents.EXPIRED, onExpired);
    Appodeal.addEventListener(AppodealInterstitialEvents.SHOWN, onShown);
    Appodeal.addEventListener(
      AppodealInterstitialEvents.FAILED_TO_SHOW,
      onFailedToShow
    );
    Appodeal.addEventListener(AppodealInterstitialEvents.CLICKED, onClicked);
    Appodeal.addEventListener(AppodealInterstitialEvents.CLOSED, onClosed);

    return () => {
      Appodeal.removeEventListener(AppodealInterstitialEvents.LOADED, onLoaded);
      Appodeal.removeEventListener(
        AppodealInterstitialEvents.FAILED_TO_LOAD,
        onFailedToLoad
      );
      Appodeal.removeEventListener(
        AppodealInterstitialEvents.EXPIRED,
        onExpired
      );
      Appodeal.removeEventListener(AppodealInterstitialEvents.SHOWN, onShown);
      Appodeal.removeEventListener(
        AppodealInterstitialEvents.FAILED_TO_SHOW,
        onFailedToShow
      );
      Appodeal.removeEventListener(
        AppodealInterstitialEvents.CLICKED,
        onClicked
      );
      Appodeal.removeEventListener(AppodealInterstitialEvents.CLOSED, onClosed);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={loadInterstitial}>
          <Text style={styles.buttonText}>Load Interstitial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showInterstitial}>
          <Text style={styles.buttonText}>Show Interstitial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePredictedEcpm}>
          <Text style={styles.buttonText}>Get Predicted eCPM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCanShow}>
          <Text style={styles.buttonText}>Can Show Interstitial?</Text>
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
