# react-native-appodeal

React Native package that adds Appodeal SDK support to your react-native application.

**Facebook Audience SDK** integration for React Native, available on iOS and Android. Features native, interstitial and banner ads.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  + [Initialisation](#initialisation)
  + [Callbacks](#callbacks)
  + [Presentation](#presentation)
* [Changelog](#changelog)

## Installation

Run following commands in project root directory

`$ npm install react-native-appodeal --save` 

`$ react-native link react-native-appodeal` 

#### iOS

1. Go to `ios/` folder and open *Podfile*
2. Add Appodeal adapters. See [Docs](https://wiki.appodeal.com/display/DE/iOS+SDK.+Integration+Guide)

> Note. Appodeal requires to use `use_frameworks!` . You need to remove Folly dependency from Podfile and AppDelegate

3. Run `pod install` 
4. Open `.xcworkspace` 
5. Configfure `info.plist` . Press Add+ at the end of the name *App Transport Security Settings* key and choose *Allow Arbitrary Loads*. Set its type to *Boolean* and its value to *Yes*. 

``` xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

Add *GADApplicationIdentifier* key (if you use APDGoogleAdMobAdapter).

``` xml
<key>GADApplicationIdentifier</key>
<string>YOUR_ADMOB_APP_ID</string>
```

6. Run your project ( `Cmd+R` )

#### Android

In development

## Usage

Please, read iOS and Android docs at [wiki](https://wiki.appodeal.com/) to get deeper understanding how 
Appodeal SDK works.

### Initialisation

1. Initialise Appodeal at application launch.

``` javascript
import {
    Appodeal,
    AppodealAdType
} from 'react-native-appodeal';

const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER;
const consent = true;
Appodeal.initialize('Your app key', adTypes, consent)
```

2. Configure SDK

* General configuration

``` javascript
import {
    Appodeal,
    AppodealAdType,
    AppodealLogLevel,
} from 'react-native-appodeal';
// Set ad auto caching enabled or disabled
// By default autocache is enabled for all ad types
// Call this method before or after initilisation
Appodeal.setAutoCache(AppodealAdType.INTERSTITIAL, false);
// Set testing mode
// Call this method before initilisation
Appodeal.setTesting(bool);
// Set Appodeal SDK logging level
// Call this method before initilisation
Appodeal.setLogLevel(AppodealLogLevel.DEBUG);
// Enable or disable child direct threatment
// Call this method before initilisation
Appodeal.setChildDirectedTreatment(false);
// Disable network:
// Call this method before initilisation
Appodeal.disableNetwork("some_network");
// Disable network for specific ad type:
// Call this method before initilisation
Appodeal.disableNetwork("some_network ", AppodealAdType.INTERSTITIAL);
// Enable or disable triggering show for precache ads
// Call this method before or after initilisation
Appodeal.setOnLoadedTriggerBoth(true);
// Disable location permission
// Call this method before initilisation
Appodeal.disableLocationPermissionCheck();
```

* Segments and targeting. 

``` javascript
import {
    Appodeal,
    AppodealGender
} from 'react-native-appodeal';
// Set user age
// Call this method before or after initilisation
Appodeal.setAge(25);
// Set user gender
// Supported values are male | female
// Call this method before of after initilisation
Appodeal.setGender(AppodealGender.FEMALE);
// Set specific user id from attribution system
// Call this method before initilisation
Appodeal.setUserId('some user ud')
// Set segment filter
// Call this method before of after initilisation
Appodeal.setSegmentFilter({
    "levels_played": levelsPlayed,
    "player_rank": "gold",
    "paid": false
})
// Set extras
Appodeal.setExtras({
    "attribuition_id": "some value",
})
```

* Banner specific

``` javascript
import {
    Appodeal
} from 'react-native-appodeal';
// Enable or disable tablet banners.
// Call this method before of after initilisation
Appodeal.setTabletBanners(false);
// Enable or disable smart banners.
// iOS smart banners are supported only 
// for applications where autoration is disabled
// Call this method before of after initilisation
Appodeal.setSmartBanners(false);
// Enable or disable banner refresh animation
// Call this method before of after initilisation
Appodeal.setBannerAnimation(true);
// Enable or disable banner backgound
// Call this method before of after initilisation
Appodeal.setBannerBackground(true);
```

* Android specific

``` javascript
import {
    Appodeal
} from 'react-native-appodeal';
// Mute calls if calls muted on Android
// Call this method before initilisation
Appodeal.muteVideosIfCallsMuted(bool);
// Disable write external permission warning on app start if its missing
// Call this method before initilisation
Appodeal.disableWriteExternalStoragePermissionCheck();
// Request Android M permissions on app start
// Call this method before initilisation
Appodeal.requestAndroidMPermissions();
```

### Callbacks

Set callbacks listener to get track of ad lifecycle events. 

1. Banner

``` javascript
import {
    Appodeal,
    AppodealBannerEvent
} from 'react-native-appodeal';

Appodeal.addEventListener(AppodealBannerEvent.LOADED, (event: any) =>
    console.log("Banner loaded. Height: ", event.height + ", precache: " + event.isPrecache)
)
Appodeal.addEventListener(AppodealBannerEvent.SHOWN, () =>
    console.log("Banner shown")
)
Appodeal.addEventListener(AppodealBannerEvent.EXPIRED, () =>
    console.log("Banner expired")
)
Appodeal.addEventListener(AppodealBannerEvent.CLICKED, () =>
    console.log("Banner clicked")
)
Appodeal.addEventListener(AppodealBannerEvent.FAILED_TO_LOAD, () =>
    console.log("Banner failed to load")
)
```

2. Interstitial

``` javascript
import {
    Appodeal,
    AppodealInterstitialEvent
} from 'react-native-appodeal';

Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, (event: any) =>
    console.log("Interstitial loaded. Precache: ", event.isPrecache)
)
Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => {
    console.log("Interstitial shown")
})
Appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () =>
    console.log("Interstitial expired")
)
Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
    console.log("Interstitial clicked")
)
Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
    console.log("Interstitial closed")
)
Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
    console.log("Interstitial failed to load")
)
Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
    console.log("Interstitial failed to show")
)
```

3. Rewarded video

``` javascript
import {
    Appodeal,
    AppodealRewardedEvent
} from 'react-native-appodeal';

Appodeal.addEventListener(AppodealRewardedEvent.LOADED, (event: any) =>
    console.log("Rewarded video loaded. Precache: ", event.isPrecache)
)
Appodeal.addEventListener(AppodealRewardedEvent.SHOWN, () =>
    console.log("Rewarded video shown")
)
Appodeal.addEventListener(AppodealRewardedEvent.EXPIRED, () =>
    console.log("Rewarded video expired")
)
Appodeal.addEventListener(AppodealRewardedEvent.REWARD, (event: any) =>
    console.log("Rewarded video finished. Amount: ", event.amount + ", currency: " + event.currency)
)
Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, (event: any) =>
    console.log("Rewarded video closed: ", event.isFinished)
)
Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_LOAD, () =>
    console.log("Rewarded video failed to load")
)
Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_SHOW, () =>
    console.log("Rewarded video failed to show")
)
```

### Presentation

> Note. All presentation specific methods are available only after SDK initialisation

1. Caching

If you disable autocache you should call `cache` method before trying to show any ad

``` javascript
Appodeal.cache(AppodealAdType.INTERSTITIAL)
```

2. Check that ad is loaded and can be shown

``` javascript
// Check that interstitial 
Appodeal.canShow(AppodealAdType.INTERSTITIAL, 'your_placement', (result) =>
    console.log("Interstitial ", result ? "can be shown" : "can not be shown")
)
// Check that banner is loaded 
Appodeal.isLoaded(AppodealAdType.BANNER, (result) =>
    console.log("Banner ", result ? "is loaded" : "is not loaded")
)
```

3. Show advertising

``` javascript
// Show banner at the top of screen
Appodeal.show(AppodealAdType.BANNER_TOP)
// Show interstitial for specific pacement
Appodeal.show(AppodealAdType.INTERSTITIAL, 'your_placement')
```

4. Hide

You can hide banner ad after it was shown. Call `hide` method with another ad types won't affect anything

``` javascript
Appodeal.hide(AppodealAdType.BANNER_TOP)
```

## Changelog

2.6.3

* Update Appodeal to 2.6.3
* Refactor plugin
* Update dependency management

2.1.4 

* release
