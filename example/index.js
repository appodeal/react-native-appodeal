import React, { Component } from 'react';
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';
import Button from 'react-native-button';
import ModalPicker from 'react-native-modal-picker'
import { Appodeal } from 'react-native-appodeal';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AppodealReactDevelop extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      autocache: false,
      adType: 0,
    };
  
  this.autocacheChanged = this.autocacheChanged.bind(this);
  }

  getCurrentAdType() {
    switch(this.state.adType){
      case 0:
        return Appodeal.NONE;
        break;
      case 1:
        return Appodeal.INTERSTITIAL;
        break;
      case 2:
        return Appodeal.BANNER;
        break;
      case 3:
        return Appodeal.BANNER_TOP;
        break;
      case 4:
        return Appodeal.BANNER_BOTTOM;
        break;
      case 5:
        return Appodeal.REWARDED_VIDEO;
        break;
      default:
        return Appodeal.NONE;
        break;
    }
  }
  
  initializeClicked() {
    //Interstitial callbacks
    Appodeal.addEventListener('onInterstitialLoaded', (event) => console.log("Interstitial loaded. Precache: ", event.isPrecache));
    Appodeal.addEventListener('onInterstitialClicked', () => console.log("Interstitial clicked"));
    Appodeal.addEventListener('onInterstitialClosed', () => console.log("Interstitial closed"));
    Appodeal.addEventListener('onInterstitialFailedToLoad', () => console.log("Interstitial failed to load"));
    Appodeal.addEventListener('onInterstitialShown', () => console.log("Interstitial shown"));
    
    //Banner callbacks
    Appodeal.addEventListener('onBannerClicked', () => console.log("Banner clicked"));
    Appodeal.addEventListener('onBannerFailedToLoad', () => console.log("Banner failed to load"));
    Appodeal.addEventListener('onBannerLoaded', (event) => console.log("Banner loaded. Height: ", event.height + ", precache: " + event.isPrecache));
    Appodeal.addEventListener('onBannerShown', () => console.log("Banner shown"));
    
    //Rewarded video callbacks
    Appodeal.addEventListener('onRewardedVideoClosed', (event) => console.log("Rewarded video closed: ", event.isFinished));
    Appodeal.addEventListener('onRewardedVideoFailedToLoad', () => console.log("Rewarded video failed to load"));
    Appodeal.addEventListener('onRewardedVideoFinished', (event) => console.log("Rewarded video finished. Amount: ", event.amount + ", currency" + event.currency));
    Appodeal.addEventListener('onRewardedVideoLoaded', () => console.log("Rewarded video loaded"));
    Appodeal.addEventListener('onRewardedVideoShown', () => console.log("Rewarded video shown"));
    
    //Set user settings
    Appodeal.setAge(42);
    Appodeal.setGender(Appodeal.Gender.male);
    Appodeal.setUserId("your_custom_user_id");
    
    Appodeal.setLogLevel(Appodeal.LogLevel.verbose);
    Appodeal.setSmartBanners(false);
    Appodeal.setBannerAnimation(false);
    Appodeal.setTabletBanners(false);
    
    Appodeal.setAutoCache(this.getCurrentAdType(), this.state.autocache);
    Appodeal.initialize("4b46ef930cd37cf11da84ae4d41019abb7234d5bbce3f000", this.getCurrentAdType());
    
    //Custom rules for segments
    Appodeal.setCustomStringRule("custom_string_rule", "value");
    Appodeal.setCustomBooleanRule("special_user", true);
    Appodeal.setCustomIntegerRule("age", 18);
    Appodeal.setCustomDoubleRule("hours_online", 1.5);
  }
  isLoadedClicked() {
    Appodeal.isLoaded(this.getCurrentAdType(), (isLoaded) => alert(isLoaded));
  }
  autocacheChanged() {
  this.setState({
            autocache: !this.state.autocache
        });
  }
  adTypeChanged(newAdType){
    this.setState({
      adType: newAdType
    });
  }
  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Ad Types' },
      { key: index++, label: 'Interstitial'},
      { key: index++, label: 'Banner' },
      { key: index++, label: 'Banner top' },
      { key: index++, label: 'Banner bottom' },
      { key: index++, label: 'Rewarded Video' }
    ];
    return (
      <View style={styles.container}>
        
        <ModalPicker
          style={{width: 200}}
          data={data}
          initValue="AdType"
          onChange={(option)=>{ this.adTypeChanged(option.key) }} />
      
        <View style={{width: 200}}>
          <CheckboxField
            label={"Autocache"}
            checked={this.state.autocache}
            onSelect={this.autocacheChanged}
            selected={this.state.autocache}
            checkboxStyle={styles.checkboxStyle}
            labelStyle={styles.labelStyle}
            selectedColor="#ef3326"
            labelSide="right">
            <Text style={{ color: "#fff" }}> Y </Text>
          </CheckboxField>
        </View>
      
        <Button
          style={styles.button}
          styleDisabled={styles.disabledButton}
          onPress={() => this.initializeClicked()}>
            Initialize
        </Button>
      
        <Button
          style={styles.button}
          styleDisabled={styles.disabledButton}
          onPress={() => Appodeal.cache(this.getCurrentAdType())}>
            Cache
        </Button>
      
        <Button
          style={styles.button}
          styleDisabled={styles.disabledButton}
          onPress={() => this.isLoadedClicked()}>
            Is loaded
        </Button>
      
        <Button
          style={styles.button}
          styleDisabled={styles.disabledButton}
          onPress={() => Appodeal.show(this.getCurrentAdType(), "initial_screen", (result) => console.log(result)) }>
            Show
        </Button>
      
        <Button
          style={styles.button}
          styleDisabled={styles.disabledButton}
          onPress={() => Appodeal.hide(this.getCurrentAdType())}>
            Hide
        </Button>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef3326',
  },
  button: {
  marginTop: 8,
  backgroundColor: "#fff",
    borderRadius: 5,
  padding: 10,
  alignItems: 'center',
  color: '#ef3326',
  width: 200
  },
  disabledButton: {
  backgroundColor: "#aaa",
  color: '#000',
  },
  checkboxStyle: {
      width: 26,
      height: 26,
      borderWidth: 2,
      borderColor: '#ddd',
      borderRadius: 5
  },
  labelStyle: {
      flex: 1,
    color: "#fff"
  },
});

AppRegistry.registerComponent('AppodealReactDevelop', () => AppodealReactDevelop);
