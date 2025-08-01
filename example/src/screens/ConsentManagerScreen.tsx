import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Appodeal, { AppodealConsentStatus } from 'react-native-appodeal';
import type { NavigationProps } from '../App';
import { commonStyles as styles } from '../styles/common';

interface ConsentManagerScreenProps {
  navigation: NavigationProps;
  route?: { params?: { appKey?: string } };
}

export default function ConsentManagerScreen({
  navigation,
  route,
}: ConsentManagerScreenProps) {
  const appKey = route?.params?.appKey;

  const loadConsentInfo = () => {
    if (!appKey) {
      console.log('App key is required to load consent info update');
      return;
    }
    Appodeal.requestConsentInfoUpdate(appKey)
      .then((status: AppodealConsentStatus) => {
        console.log(
          'Consent info update status:',
          AppodealConsentStatus[status]
        );
      })
      .catch((error: any) => {
        console.error('Consent info update error:', error);
      });
  };

  const showConsent = () => {
    Appodeal.showConsentForm()
      .then((status: AppodealConsentStatus) => {
        console.log('Show consent form status:', AppodealConsentStatus[status]);
      })
      .catch((error: any) => {
        console.error('Show consent form error:', error);
      });
  };

  const showConsentIfNeeded = () => {
    Appodeal.showConsentFormIfNeeded()
      .then((status: AppodealConsentStatus) => {
        console.log(
          'Show consent form if needed status:',
          AppodealConsentStatus[status]
        );
      })
      .catch((error: any) => {
        console.error('Show consent form if needed error:', error);
      });
  };

  const revokeConsent = () => {
    Appodeal.revokeConsent();
  };

  const getConsentStatus = () => {
    const status = Appodeal.consentStatus();
    console.log('Consent status:', AppodealConsentStatus[status]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={loadConsentInfo}>
          <Text style={styles.buttonText}>Load Consent Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showConsent}>
          <Text style={styles.buttonText}>Show Consent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showConsentIfNeeded}>
          <Text style={styles.buttonText}>Show Consent (If Needed)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={revokeConsent}>
          <Text style={styles.buttonText}>Revoke Consent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={getConsentStatus}>
          <Text style={styles.buttonText}>Get Consent Status</Text>
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
