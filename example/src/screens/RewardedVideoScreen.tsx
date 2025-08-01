import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Appodeal, {
  AppodealAdType,
  AppodealRewardedEvents,
} from 'react-native-appodeal';
import type { NavigationProps } from '../App';
import { commonStyles as styles } from '../styles/common';

interface RewardedVideoScreenProps {
  navigation: NavigationProps;
}

export default function RewardedVideoScreen({
  navigation,
}: RewardedVideoScreenProps) {
  const loadRewardedVideo = () => {
    Appodeal.cache(AppodealAdType.REWARDED_VIDEO);
  };

  const showRewardedVideo = () => {
    Appodeal.show(AppodealAdType.REWARDED_VIDEO);
  };

  const handlePredictedEcpm = () => {
    const value = Appodeal.predictedEcpm(AppodealAdType.REWARDED_VIDEO);
    console.log('Predicted eCPM (Rewarded):', value);
  };

  const handleCanShow = () => {
    const value = Appodeal.canShow(AppodealAdType.REWARDED_VIDEO);
    console.log('Can Show Rewarded Video:', value);
  };

  React.useEffect(() => {
    // Subscribe to rewarded video events
    const onLoaded = (event: any) => console.log('Rewarded loaded', event);
    const onFailedToLoad = () => console.log('Rewarded failed to load');
    const onExpired = () => console.log('Rewarded expired');
    const onShown = () => console.log('Rewarded shown');
    const onFailedToShow = () => console.log('Rewarded failed to show');
    const onClosed = () => console.log('Rewarded closed');
    const onReward = (event: any) => console.log('Rewarded finished', event);
    const onClicked = () => console.log('Rewarded clicked');

    Appodeal.addEventListener(AppodealRewardedEvents.LOADED, onLoaded);
    Appodeal.addEventListener(
      AppodealRewardedEvents.FAILED_TO_LOAD,
      onFailedToLoad
    );
    Appodeal.addEventListener(AppodealRewardedEvents.EXPIRED, onExpired);
    Appodeal.addEventListener(AppodealRewardedEvents.SHOWN, onShown);
    Appodeal.addEventListener(
      AppodealRewardedEvents.FAILED_TO_SHOW,
      onFailedToShow
    );
    Appodeal.addEventListener(AppodealRewardedEvents.CLOSED, onClosed);
    Appodeal.addEventListener(AppodealRewardedEvents.REWARD, onReward);
    Appodeal.addEventListener(AppodealRewardedEvents.CLICKED, onClicked);

    return () => {
      Appodeal.removeEventListener(AppodealRewardedEvents.LOADED, onLoaded);
      Appodeal.removeEventListener(
        AppodealRewardedEvents.FAILED_TO_LOAD,
        onFailedToLoad
      );
      Appodeal.removeEventListener(AppodealRewardedEvents.EXPIRED, onExpired);
      Appodeal.removeEventListener(AppodealRewardedEvents.SHOWN, onShown);
      Appodeal.removeEventListener(
        AppodealRewardedEvents.FAILED_TO_SHOW,
        onFailedToShow
      );
      Appodeal.removeEventListener(AppodealRewardedEvents.CLOSED, onClosed);
      Appodeal.removeEventListener(AppodealRewardedEvents.REWARD, onReward);
      Appodeal.removeEventListener(AppodealRewardedEvents.CLICKED, onClicked);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={loadRewardedVideo}>
          <Text style={styles.buttonText}>Load Rewarded Video</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showRewardedVideo}>
          <Text style={styles.buttonText}>Show Rewarded Video</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePredictedEcpm}>
          <Text style={styles.buttonText}>Get Predicted eCPM</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCanShow}>
          <Text style={styles.buttonText}>Can Show Rewarded Video?</Text>
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
