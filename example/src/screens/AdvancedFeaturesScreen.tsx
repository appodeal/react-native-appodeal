/* eslint-disable no-bitwise */
import React from 'react';
import {styles} from '../styles';
import {ScrollView, SafeAreaView, View, Switch, Text} from 'react-native';
import {Row, SectionHeader} from '../components';
import SegmentedControl from '@react-native-community/segmented-control';
import {Appodeal, AppodealConsentStatus} from 'react-native-appodeal';
import {constants} from '../advertising/constants';

let _smartBanners = true;
let _tabletBanners = false;

export const AdvancedFeaturesScreen = () => {
  const [consentStatus, setConsentStatus] = React.useState(
    Appodeal.consentStatus(),
  );
  const [smartBanners, setSmartBanners] = React.useState(_smartBanners);
  const [tabletBanners, setTabletBanners] = React.useState(_tabletBanners);

  let gdpr = ['Unknown', 'Personalized', 'Non personalized'];
  let ccpa = ['Unknown', 'Opt In', 'Opt Out'];

  const smartBannersSwitch = () => (
    <Switch
      value={smartBanners}
      onValueChange={(value) => {
        Appodeal.setSmartBanners(value);
        _smartBanners = value;
        setSmartBanners(value);
      }}
    />
  );

  const tabletBannersSwitch = () => (
    <Switch
      value={tabletBanners}
      onValueChange={(value) => {
        Appodeal.setTabletBanners(value);
        _tabletBanners = value;
        setTabletBanners(value);
      }}
    />
  );

  const subtitleAccessory = (value: any) => (
    <Text style={styles.rowRightDetail}>{value}</Text>
  );

  const extrasSections = () => (
    <>
      <SectionHeader value="Extras" />
      {Object.entries(Appodeal.getExtras()).map((entry) => (
        <Row
          key={entry[0]}
          title={entry[0]}
          accessory={() => subtitleAccessory(entry[1])}
        />
      ))}
    </>
  );

  const customStateSection = () => (
    <>
      <SectionHeader value="Custom State" />
      {Object.entries(Appodeal.getCustomState()).map((entry) => (
        <Row
          key={entry[0]}
          title={entry[0]}
          accessory={() => subtitleAccessory(entry[1])}
        />
      ))}
    </>
  );

  const consentStatusString = () => {
    switch (consentStatus) {
      case AppodealConsentStatus.OBTAINED:
        return 'Obtained';
      case AppodealConsentStatus.NOT_REQUIRED:
        return 'Not Required';
      case AppodealConsentStatus.REQUIRED:
        return 'Required';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <SectionHeader value="Appearance" />
          <Row title="Smart banners" accessory={smartBannersSwitch} />
          <Row title="Tablet banners" accessory={tabletBannersSwitch} />
          <SectionHeader value="User Consent" />
          <Row
            title="Status"
            accessory={() => subtitleAccessory(consentStatusString())}
          />
          <Row
            title="Request update"
            onClick={() =>
              Appodeal.requestConsentInfoUpdate(constants.appKey)
                .then((status) => setConsentStatus(status))
                .catch((error) => console.log(error))
                .finally(() =>
                  console.log('Appodeal did update consent information'),
                )
            }
          />
          <Row
            title="Show Form"
            accessory={() => subtitleAccessory('Force')}
            onClick={() =>
              Appodeal.showConsentForm()
                .then((status) => setConsentStatus(status))
                .catch((error) => console.log(error))
                .finally(() =>
                  console.log('Appodeal did update consent information'),
                )
            }
          />
          <Row
            title="Show Form"
            accessory={() => subtitleAccessory('If Needed')}
            onClick={() =>
              Appodeal.showConsentFormIfNeeded()
                .then((status) => setConsentStatus(status))
                .catch((error) => console.log(error))
                .finally(() =>
                  console.log('Appodeal did update consent information'),
                )
            }
          />
          <Row
            title="Revoke"
            onClick={() => {
              Appodeal.revokeConsent();
              setConsentStatus(Appodeal.consentStatus());
            }}
          />
          {Object.keys(Appodeal.getExtras()).length > 0
            ? extrasSections()
            : null}
          {Object.keys(Appodeal.getCustomState()).length > 0
            ? customStateSection()
            : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
