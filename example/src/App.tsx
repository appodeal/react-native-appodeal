/* eslint-disable no-bitwise */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';
import {AdvancedFeaturesScreen} from './screens/AdvancedFeaturesScreen';
import {Appodeal} from 'react-native-appodeal';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen
          name="/home"
          component={HomeScreen}
          options={{title: 'Appodeal SDK' + ' ' + Appodeal.getVersion()}}
        />
        <Stack.Screen
          name="/advanced_features"
          component={AdvancedFeaturesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
