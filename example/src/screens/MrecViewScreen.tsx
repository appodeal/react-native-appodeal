import { useCallback, useState } from 'react';
import type { NativeSyntheticEvent } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Appodeal, { AppodealAdType, AppodealMrec } from 'react-native-appodeal';
import type {
  MrecAdInfoEvent,
  MrecAdLoadedEvent,
  MrecAdLoadFailedEvent,
} from '../../../src/specs/AppodealMrecViewNativeComponent';
import type { NavigationProps } from '../App';
import { commonStyles as styles } from '../styles/common';

interface MrecViewScreenProps {
  navigation: NavigationProps;
}

export default function MrecViewScreen({ navigation }: MrecViewScreenProps) {
  const [showMrec, setShowMrec] = useState(false);

  const showMrecView = () => {
    setShowMrec(true);
  };

  const hideMrecView = () => {
    setShowMrec(false);
  };

  const handlePredictedEcpm = () => {
    const value = Appodeal.predictedEcpm(AppodealAdType.MREC);
    console.log('Predicted eCPM (MREC):', value);
  };

  const handleCanShow = () => {
    const value = Appodeal.canShow(AppodealAdType.MREC);
    console.log('Can Show MREC:', value);
  };

  const onAdLoadedEvent = useCallback(
    (event: NativeSyntheticEvent<MrecAdLoadedEvent>) => {
      console.log(
        'MREC ad loaded:',
        'isPrecache:',
        event.nativeEvent.isPrecache
      );
    },
    []
  );

  const onAdFailedToLoadEvent = useCallback(
    (event: NativeSyntheticEvent<MrecAdLoadFailedEvent>) => {
      console.log('MREC ad failed to load:', event.nativeEvent);
    },
    []
  );

  const onAdClickedEvent = useCallback(
    (event: NativeSyntheticEvent<MrecAdInfoEvent>) => {
      console.log('MREC ad clicked:', event.nativeEvent);
    },
    []
  );

  const onAdExpiredEvent = useCallback(
    (event: NativeSyntheticEvent<MrecAdInfoEvent>) => {
      console.log('MREC ad expired:', event.nativeEvent);
    },
    []
  );

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.button} onPress={showMrecView}>
        <Text style={styles.buttonText}>Show MREC View</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={hideMrecView}>
        <Text style={styles.buttonText}>Hide MREC View</Text>
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

      {showMrec && (
        <AppodealMrec
          style={styles.mrec}
          onAdLoaded={onAdLoadedEvent}
          onAdFailedToLoad={onAdFailedToLoadEvent}
          onAdClicked={onAdClickedEvent}
          onAdExpired={onAdExpiredEvent}
        />
      )}
    </View>
  );
}
