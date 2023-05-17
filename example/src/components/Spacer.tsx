import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  horizontal?: boolean;
  value?: number;
}

export const Spacer = (props: SpacerProps) => {
  const defaultValue = 'auto';

  return (
    <View
      style={{
        width: props.horizontal ? props.value : defaultValue,
        height: !props.horizontal ? props.value : defaultValue,
      }}
    />
  );
};
