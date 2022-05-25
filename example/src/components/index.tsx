import React, {useEffect} from 'react';
import {styles} from '../styles';
import {Appodeal} from 'react-native-appodeal';
import {Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';

export const SectionHeader = (props: {value: string}) => {
  return <Text style={styles.sectionHeader}>{props.value}</Text>;
};

export const Row = (props: {
  title: string;
  onClick?(): void;
  accessory?(): any;
}) => {
  return (
    <TouchableHighlight onPress={() => props.onClick && props.onClick()}>
      <View style={styles.rowContainer}>
        <View style={styles.contentRowContainer}>
          <View style={styles.titlesRowContainer}>
            <Text style={styles.rowTitle}>{props.title}</Text>
          </View>
          <View style={styles.accessoryContainer}>
            {props.accessory && props.accessory()}
          </View>
        </View>
        <View style={styles.borderContainer}>
          <View style={styles.border} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export const AdStatusFooter = (props: {adType: number}) => {
  const [state, setState] = React.useState({
    canShow: false,
    ecpm: 0.0,
  });

  const updateState = () => {
    Appodeal.canShow(props.adType, null, (result: boolean) =>
      setState((prev) => ({...prev, canShow: result})),
    );
    Appodeal.predictedEcpm(props.adType, (result: number) =>
      setState((prev) => ({...prev, ecpm: result})),
    );
  };

  return (
    <TouchableOpacity onPress={updateState}>
      <View>
        <Text style={styles.sectionFooter} numberOfLines={2}>
          {state.canShow ? 'Can' : "Can't"} show. {'\n'} Predicted eCPM is{' '}
          {state.ecpm}.
        </Text>
      </View>
    </TouchableOpacity>
  );
};
