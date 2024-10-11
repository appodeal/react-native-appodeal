import React from 'react';
import {BannerShowStyle} from '../../advertising';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

interface BannerSegmentedControlProps {
  visible: boolean;
  showStyle: BannerShowStyle;
  onChange(showStyle: BannerShowStyle): void;
}

export const BannerSegmentedControl = (props: BannerSegmentedControlProps) => {
  let showStyles = [
    BannerShowStyle.BOTTOM,
    BannerShowStyle.TOP,
    BannerShowStyle.VIEW,
  ];

  const index = () => {
    return showStyles.indexOf(props.showStyle);
  };

  return props.visible ? (
    <View>
      <Text style={styles.sectionHeader}>Banner style</Text>
      <View style={styles.rowContainer}>
        <SegmentedControl
          style={styles.segmentedControl}
          values={showStyles}
          selectedIndex={index()}
          onChange={(event) =>
            props.onChange(showStyles[event.nativeEvent.selectedSegmentIndex])
          }
        />
      </View>
    </View>
  ) : null;
};
