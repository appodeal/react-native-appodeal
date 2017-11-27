
# react-native-appodeal

React Native package that adds Appodeal SDK support to your react-native application.

## Getting started

`$ npm install react-native-appodeal --save`

### Mostly automatic installation

`$ react-native link react-native-appodeal`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-appodeal` and add `RNAppodeal.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAppodeal.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.reactlibrary.RNAppodealPackage;` to the imports at the top of the file
  - Add `new RNAppodealPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-appodeal'
  	project(':react-native-appodeal').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-appodeal/android')
  	```
3. Insert following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-appodeal')
  	```

### After install Configuration

### iOS Configuration

+ Download [Appodeal SDK](http://bit.ly/appodeal-ios-sdk-2-1-4) and unzip it somewhere.
+ Drag'n'drop it to the opened XCode project and select copy if needed or add it manually.
+ Go to `Build Phases`, expand `Link Binnary With Libraries` and add there following frameworks and libraries:
  AdSupport, AudioToolbox, AVFoundation, CFNetwork, CoreGraphics, CoreImage, CoreLocation, CoreMedia, CoreMotion, CoreTelephony, EventKitUI, GLKit, ImageIO, JavaScriptCore, libc++, libsqlite3.dylib, libxml2.2.dylib, libz.dylib, MediaPlayer, MessageUI, MobileCoreServices, QuartzCore, Security, StoreKit, SystemConfiguration, Twitter, UIKit, WebKit.
+ Set up the following keys in your app’s info.plist:
```plist
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

### Android

+ Insert following repository (to use AdColony ad network with Appodeal) inside repositories block in `android/app/build.gradle`:

```gradle
maven {
   url  "https://adcolony.bintray.com/AdColony"      
}
```

+ Enable multiDex in your application. Follow [this](https://developer.android.com/studio/build/multidex.html) documentation to enable it.

## Usage
```javascript
import { Appodeal } from 'react-native-appodeal';


/*
Available Ad Types:
Appodeal.NONE = 0;
Appodeal.INTERSTITIAL = 3;
Appodeal.BANNER = 4;
Appodeal.BANNER_BOTTOM = 8;
Appodeal.BANNER_TOP = 16;
Appodeal.REWARDED_VIDEO = 128;
Appodeal.NON_SKIPPABLE_VIDEO = 256;
*/

//additional configuration that should be used before initialization:

//set ad auto caching enabled/disabled:
Appodeal.setAutoCache(adtypes, bool);
//enable/disable tablet banners support:
Appodeal.setTabletBanners(bool);
//enable/disable smart banners support:
Appodeal.setSmartBanners(bool);
//enable/disable banner refresh animation:
Appodeal.setBannerAnimation(bool);
//enable/disable banner background:
Appodeal.setBannerBackground(bool);
//set testing mode enabled/disabled
Appodeal.setTesting(bool);
/*enabled/disable additional logging from sdk for debugging:
available constants: LogLevel.none | LogLevel.debug | LogLevel.verbose */
Appodeal.setLogLevel(LogLevel.verbose);
//enable/disable child direct threatment:
Appodeal.setChildDirectedTreatment(bool);
//enable/disable triggering show for precache ads:
Appodeal.setOnLoadedTriggerBoth(bool);
//disable network:
Appodeal.disableNetwork(networkName);
//disable network for ad type:
Appodeal.disableNetwork(network, adTypes);
//disable location tracking:
Appodeal.disableLocationPermissionCheck();
//disable write external permission warning on app start if its missing:
Appodeal.disableWriteExternalStoragePermissionCheck();
//request Android M permissions on app start:
Appodeal.requestAndroidMPermissions();
//mute calls if calls muted on Android:
Appodeal.muteVideosIfCallsMuted(bool);

//Initialize Appodeal SDK:
Appodeal.initialize("your-appodeal-application-key", adtypes);

//Display Ads, can return bool if ads was shown or not in a callback parameter:
Appodeal.show(adtypes, "placement_name", (result) => console.log(result));
//or
Appodeal.show(adtypes, "placement_name");

//Caching ad an if autocache was disabled before initialization:
Appodeal.cache(adtypes);

//Hiding banner ads:
Appodeal.hide(Appodeal.BANNER);

//Check if an ad was loaded:
Appodeal.isLoaded(adtypes, (isLoaded) => console.log(isLoaded));

//Check if loaded ad is precache or not:
Appodeal.isPrecache(adtypes, (isPrecache) => console.log(isPrecache));

//Check if ad can be shown for specified placement or default placement:
Appodeal.canShow(adtypes, (canShow) => console.log(canShow));

//Show test Screen for testing network integrations:
Appodeal.showTestScreen();

//Ad Events available with Appodeal React Native Module:
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

//Rewarded video callbacks
Appodeal.addEventListener('onNonSkippableVideoClosed', (event) => console.log("Non Skippable video closed: ", event.isFinished));
Appodeal.addEventListener('onNonSkippableVideoFailedToLoad', () => console.log("Non Skippable video failed to load"));
Appodeal.addEventListener('onNonSkippableVideoFinished', () => console.log("Non Skippable video finished"));
Appodeal.addEventListener('onNonSkippableVideoLoaded', () => console.log("Non Skippable video loaded"));
Appodeal.addEventListener('onNonSkippableVideoShown', () => console.log("Non Skippable video shown"));
```

## Changelog

2.1.4 
+ release