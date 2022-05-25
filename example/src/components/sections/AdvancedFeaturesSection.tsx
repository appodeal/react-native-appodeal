import React from 'react';
import {View} from 'react-native';
import {SectionHeader} from '..';
import {
  AppodealCCPAConsentStatus,
  AppodealGDPRConsentStatus,
} from 'react-native-appodeal';

interface RegulationSectionProps {
  synchronised: boolean;
  ccpaConsent: AppodealCCPAConsentStatus;
  gdprConsent: AppodealGDPRConsentStatus;
}

export const AdvancedFeaturesSection = () => { // = (props: RegulationSectionProps) => {
//   const regulations = ['unknown 🏴', 'none 🏳', 'GDPR 🇪🇺', 'CCPA 🇺🇸'];

//   const statuses = [
//     'unknown',
//     'non personalised',
//     'partly personalised',
//     'personalised',
//   ];

  return (
    <View>
      <SectionHeader value="Advanced features" />
      {/* <Row title={'Regulation: ' + regulations[props.regulation]} />
      <Row title={'Consent status: ' + statuses[props.consent]} /> */}
    </View>
  );
};
