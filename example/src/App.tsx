/* eslint-disable no-bitwise */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';
import {Appodeal} from 'react-native-appodeal';

const Stack = createNativeStackNavigator();

export const App = () => {
  const [state, setState] = React.useState('');

  useEffect(() => Appodeal.getVersion((ver: string) => setState(ver)), []);

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Appodeal SDK' + ' ' + state}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
