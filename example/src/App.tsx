import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

// Import screens
import BannerScreen from './screens/BannerScreen';
import BannerViewScreen from './screens/BannerViewScreen';
import ConsentManagerScreen from './screens/ConsentManagerScreen';
import HomeScreen from './screens/HomeScreen';
import InterstitialScreen from './screens/InterstitialScreen';
import MrecViewScreen from './screens/MrecViewScreen';
import RewardedVideoScreen from './screens/RewardedVideoScreen';
import { commonStyles as styles } from './styles/common';

type ScreenName =
  | 'Home'
  | 'Interstitial'
  | 'RewardedVideo'
  | 'Banner'
  | 'BannerView'
  | 'MrecView'
  | 'ConsentManager';

interface ScreenConfig {
  name: ScreenName;
  title: string;
  component: React.ComponentType<any>;
}

const screens: ScreenConfig[] = [
  { name: 'Home', title: 'Appodeal Test App', component: HomeScreen },
  {
    name: 'Interstitial',
    title: 'Interstitial Ads',
    component: InterstitialScreen,
  },
  {
    name: 'RewardedVideo',
    title: 'Rewarded Video Ads',
    component: RewardedVideoScreen,
  },
  { name: 'Banner', title: 'Banner Ads', component: BannerScreen },
  { name: 'BannerView', title: 'Banner View', component: BannerViewScreen },
  { name: 'MrecView', title: 'MREC View', component: MrecViewScreen },
  {
    name: 'ConsentManager',
    title: 'Consent Manager',
    component: ConsentManagerScreen,
  },
];

export interface NavigationProps {
  navigate: (screenName: ScreenName, params?: any) => void;
  goBack: () => void;
  currentScreen: ScreenName;
}

export interface BaseScreenProps {
  navigation: NavigationProps;
  route?: { params?: any };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');
  const [navigationStack, setNavigationStack] = useState<ScreenName[]>([
    'Home',
  ]);
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});

  const navigate = (screenName: ScreenName, params?: any) => {
    setCurrentScreen(screenName);
    setNavigationStack((prev) => [...prev, screenName]);
    if (params) {
      setScreenParams((prev) => ({ ...prev, [screenName]: params }));
    }
  };

  const goBack = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop();
      const previousScreen = newStack[newStack.length - 1];
      if (previousScreen) {
        setCurrentScreen(previousScreen);
      }
      setNavigationStack(newStack);
    }
  };

  const currentScreenConfig = screens.find(
    (screen) => screen.name === currentScreen
  );
  const CurrentScreenComponent = currentScreenConfig?.component || HomeScreen;

  const navigation: NavigationProps = {
    navigate,
    goBack,
    currentScreen,
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with safe area */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          {/* Center title - perfectly centered */}
          <Text style={styles.headerTitle}>
            {currentScreenConfig?.title || 'Appodeal Test App'}
          </Text>
        </View>
      </SafeAreaView>

      {/* Screen Content */}
      <SafeAreaView style={styles.screenContainer}>
        <CurrentScreenComponent
          navigation={navigation}
          route={{ params: screenParams[currentScreen] }}
        />
      </SafeAreaView>
    </View>
  );
}
