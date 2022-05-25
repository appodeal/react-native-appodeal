import React from 'react';
import {View, Switch, ActivityIndicator} from 'react-native';
import {SectionHeader, Row} from '..';

interface InitialisationSectionStateProps {
  test: boolean;
  initialised: boolean;
  initialising: boolean;
}

interface InitialisationSectionDispatchProps {
  onValueChange: (
    value: boolean,
    key: keyof InitialisationSectionStateProps,
  ) => void;
}

type InitialisationSectionProps = InitialisationSectionStateProps &
  InitialisationSectionDispatchProps;

export const InitialisationSection = (props: InitialisationSectionProps) => {
  return (
    <View>
      <SectionHeader value="Initialisation" />
      <Row
        title="Test mode"
        accessory={() => (
          <Switch
            value={props.test}
            disabled={props.initialised}
            onValueChange={(value) => props.onValueChange(value, 'test')}
          />
        )}
      />
      <Row
        title="Initialise"
        accessory={() =>
          props.initialising ? (
            <ActivityIndicator />
          ) : (
            <Switch
              value={props.initialised}
              disabled={props.initialised}
              onValueChange={(value) =>
                props.onValueChange(value, 'initialising')
              }
            />
          )
        }
      />
    </View>
  );
};
