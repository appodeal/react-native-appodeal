/* eslint-disable no-bitwise */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';
import {AdvancedFeaturesScreen} from './screens/AdvancedFeaturesScreen';
import {Appodeal} from 'react-native-appodeal';
import {BannerView} from './advertising/BannerView';
import {BannerShowStyle} from './advertising';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{title: 'Appodeal SDK' + ' ' + Appodeal.getVersion()}}
        />
        <Stack.Screen
          name="advanced_features"
          component={AdvancedFeaturesScreen}
          options={{title: 'Advanced Features'}}
        />
        <Stack.Screen
          name="banner_screen"
          component={BannerScreen}
          options={{title: 'Banner Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BannerScreen = () => (
  <>
    <BannerView visible={true} showStyle={BannerShowStyle.VIEW} />
  </>
);
