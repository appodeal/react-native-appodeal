import React from 'react';
import {View, Switch, ActivityIndicator} from 'react-native';
import {SectionHeader, Row, LinkRow} from '..';
import {SDKState} from '../../advertising';

interface InitialisationSectionStateProps {
  state: SDKState;
}

interface InitialisationSectionDispatchProps {
  onInitialize: () => void;
}

type InitialisationSectionProps = InitialisationSectionStateProps &
  InitialisationSectionDispatchProps;

export const InitialisationSection = (props: InitialisationSectionProps) => {
  const accessory = () => {
    switch (props.state) {
      case SDKState.PENDING:
        return (
          <Switch value={false} onValueChange={(_) => props.onInitialize()} />
        );
      case SDKState.INITIALIZED:
        return <Switch value={true} disabled={true} />;
      case SDKState.INITIALIZING:
        return <ActivityIndicator />;
    }
  };

  return (
    <View>
      <SectionHeader value="Initialisation" />
      <Row title="Initialise" accessory={accessory} />
      <LinkRow title="Advanced Features" route="/advanced_features" />
    </View>
  );
};
