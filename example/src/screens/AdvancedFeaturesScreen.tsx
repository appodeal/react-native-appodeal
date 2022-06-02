/* eslint-disable no-bitwise */
import React, {useEffect} from 'react';
import {styles} from '../styles';
import {ScrollView, SafeAreaView} from 'react-native';
import {
  AppodealAdType,
  Appodeal,
  AppodealSdkEvent,
} from 'react-native-appodeal';

export const AdvancedFeaturesScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
