/* eslint-disable no-bitwise */
import React from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {styles} from '../../styles';
import {AppodealAdType} from 'react-native-appodeal';

interface AutocacheControlProps {
  mask: number;
  onUpdate(mask: number): void;
}

const CustomButton = (props: {
  title: string;
  selected: boolean;
  onPress(): void;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={props.selected ? styles.buttonSelected : styles.buttonPlain}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const AutocacheControl = (props: AutocacheControlProps) => {
  const update = (adType: number) => {
    let newMask = props.mask;
    if (newMask & adType) {
      newMask &= ~adType;
    } else {
      newMask |= adType;
    }
    props.onUpdate(newMask);
  };

  return (
    <View>
      <Text style={styles.sectionHeader}>Autocache</Text>
      <View style={styles.rowContainer}>
        <ScrollView pagingEnabled horizontal={true}>
          <CustomButton
            title="Banner"
            selected={(props.mask & AppodealAdType.BANNER) > 0}
            onPress={() => update(AppodealAdType.BANNER)}
          />
          <CustomButton
            title="MREC"
            selected={(props.mask & AppodealAdType.MREC) > 0}
            onPress={() => update(AppodealAdType.MREC)}
          />
          <CustomButton
            title="Interstitial"
            selected={(props.mask & AppodealAdType.INTERSTITIAL) > 0}
            onPress={() => update(AppodealAdType.INTERSTITIAL)}
          />
          <CustomButton
            title="Rewarded"
            selected={(props.mask & AppodealAdType.REWARDED_VIDEO) > 0}
            onPress={() => update(AppodealAdType.REWARDED_VIDEO)}
          />
        </ScrollView>
      </View>
    </View>
  );
};
