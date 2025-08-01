import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Appodeal, {
  AppodealAdType,
  AppodealLogLevel,
  AppodealSdkEvents,
} from 'react-native-appodeal';
import type { BaseScreenProps } from '../App';
import { commonStyles as styles } from '../styles/common';

const exampleAppodealKey =
  Platform.OS === 'android'
    ? 'd908f77a97ae0993514bc8edba7e776a36593c77e5f44994'
    : 'dee74c5129f53fc629a44a690a02296694e3eef99f2d3a5f';

interface HomeScreenProps extends BaseScreenProps {}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const initializeAppodeal = () => {
    Appodeal.setTesting(true);
    Appodeal.setLogLevel(AppodealLogLevel.DEBUG);

    Appodeal.setAutoCache(AppodealAdType.INTERSTITIAL, false);
    Appodeal.setAutoCache(AppodealAdType.REWARDED_VIDEO, false);

    Appodeal.addEventListener(AppodealSdkEvents.INITIALIZED, () => {
      console.log('Appodeal initialized');
    });

    Appodeal.initialize(
      exampleAppodealKey,
      AppodealAdType.INTERSTITIAL |
        AppodealAdType.REWARDED_VIDEO |
        AppodealAdType.BANNER |
        AppodealAdType.BANNER_TOP |
        AppodealAdType.MREC
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pluginVersion}>
          Plugin version: {Appodeal.getVersion()}
        </Text>
        <Text style={styles.sdkVersion}>
          SDK version: {Appodeal.getPlatformSdkVersion()}{' '}
        </Text>

        <TouchableOpacity style={styles.button} onPress={initializeAppodeal}>
          <Text style={styles.buttonText}>Initialize Appodeal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Interstitial')}
        >
          <Text style={styles.buttonText}>Interstitial Ads</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RewardedVideo')}
        >
          <Text style={styles.buttonText}>Rewarded Video Ads</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Banner')}
        >
          <Text style={styles.buttonText}>Banner Ads</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BannerView')}
        >
          <Text style={styles.buttonText}>Banner View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MrecView')}
        >
          <Text style={styles.buttonText}>MREC View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('ConsentManager', {
              appKey: exampleAppodealKey,
            })
          }
        >
          <Text style={styles.buttonText}>Consent Manager</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
