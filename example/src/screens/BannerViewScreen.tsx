import { useCallback, useState } from 'react';
import type { NativeSyntheticEvent } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Appodeal, {
  AppodealAdType,
  AppodealBanner,
} from 'react-native-appodeal';
import type {
  BannerAdInfoEvent,
  BannerAdLoadedEvent,
  BannerAdLoadFailedEvent,
} from '../../../src/specs/AppodealBannerViewNativeComponent';
import type { NavigationProps } from '../App';
import { commonStyles as styles } from '../styles/common';

interface BannerViewScreenProps {
  navigation: NavigationProps;
}

export default function BannerViewScreen({
  navigation,
}: BannerViewScreenProps) {
  const [showBanner, setShowBanner] = useState(false);

  const showBannerView = () => {
    setShowBanner(true);
  };

  const hideBannerView = () => {
    setShowBanner(false);
  };

  const handlePredictedEcpm = () => {
    const value = Appodeal.predictedEcpm(AppodealAdType.BANNER);
    console.log('Predicted eCPM (Banner):', value);
  };

  const handleCanShow = () => {
    const value = Appodeal.canShow(AppodealAdType.BANNER);
    console.log('Can Show Banner:', value);
  };

  const onAdLoadedEvent = useCallback(
    (event: NativeSyntheticEvent<BannerAdLoadedEvent>) => {
      console.log(
        'Banner ad loaded:',
        'height:',
        event.nativeEvent.height,
        'isPrecache:',
        event.nativeEvent.isPrecache
      );
    },
    []
  );

  const onAdFailedToLoadEvent = useCallback(
    (event: NativeSyntheticEvent<BannerAdLoadFailedEvent>) => {
      console.log('Banner ad failed to load:', event.nativeEvent);
    },
    []
  );

  const onAdClickedEvent = useCallback(
    (event: NativeSyntheticEvent<BannerAdInfoEvent>) => {
      console.log('Banner ad clicked:', event.nativeEvent);
    },
    []
  );

  const onAdExpiredEvent = useCallback(
    (event: NativeSyntheticEvent<BannerAdInfoEvent>) => {
      console.log('Banner ad expired:', event.nativeEvent);
    },
    []
  );

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.button} onPress={showBannerView}>
        <Text style={styles.buttonText}>Show Banner View</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={hideBannerView}>
        <Text style={styles.buttonText}>Hide Banner View</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePredictedEcpm}>
        <Text style={styles.buttonText}>Get Predicted eCPM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCanShow}>
        <Text style={styles.buttonText}>Check Can Show</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      {showBanner && (
        <AppodealBanner
          style={styles.banner}
          adSize="phone"
          onAdLoaded={onAdLoadedEvent}
          onAdFailedToLoad={onAdFailedToLoadEvent}
          onAdClicked={onAdClickedEvent}
          onAdExpired={onAdExpiredEvent}
        />
      )}
    </View>
  );
}
