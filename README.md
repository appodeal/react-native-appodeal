# react-native-appodeal

React Native package that adds Appodeal SDK support to your react-native application.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  + [Initialisation](#initialisation)
  + [Callbacks](#callbacks)
  + [Presentation](#presentation)
* [Consent Manager](#consentmanager)
* [Banner View](#bannerview)
* [Changelog](#changelog)

## Installation

Run following commands in project root directory

`$ npm install react-native-appodeal --save` 

`$ react-native link react-native-appodeal` 

#### iOS

1. Go to `ios/` folder and open *Podfile*
2. Add Appodeal adapters. See [Docs](https://wiki.appodeal.com/display/DE/iOS+SDK.+Integration+Guide)

> Note. Appodeal requires to use `use_frameworks!` . You need to remove Flipper dependency from Podfile and AppDelegate

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

1. Add Appodeal adapters. 

Add dependencies into `build.gradle` (module: app)

``` groovy
dependencies {
    ...
    implementation 'com.appodeal.ads:sdk:2.6.3.+'
    ...
}
```

Add repository into `build.gradle` (module: project)

``` groovy
allprojects {
    repositories {
        ...
        maven { url "https://artifactory.appodeal.com/appodeal" }
        ...
    }
}
```

> Note. You can change following implementation to use custom mediation setup. See [Docs](https://wiki.appodeal.com/display/DE/Android+SDK.+Integration+Guide)

2. Enable `multidex` 

In `build.gradle` (module: app)

``` groovy
defaultConfig {
    ...
    multiDexEnabled true
    ...
}
...
dependencies {
    ...
    implementation 'com.android.support:multidex:1.0.3'
    ...
}
```

3. Set all required permissions in *AndroidManifest.xml*. See [Docs](https://wiki.appodeal.com/display/DE/Android+SDK.+Integration+Guide)

``` xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
```

4. Network security configuration

Add the Network Security Configuration file to your AndroidManifest.xml:

``` xml
<?xml version="1.0" encoding="utf-8"?>
<manifest>
    <application 
		...
        android:networkSecurityConfig="@xml/network_security_config">
    </application>
</manifest>
```

In your *network_security_config.xml* file, add base-config that sets `cleartextTrafficPermitted` to `true` :

``` xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">127.0.0.1</domain>
    </domain-config>
</network-security-config>
```

5. Admob Configuration (if you use Admob adapter)

``` xml
<manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="[ADMOB_APP_ID]"/>
    </application>
</manifest>
```

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

## Consent Manager

Consent manager is used to provide GDPR and CCPA compliance. Consent manager SDK can be synchronized at any moment of application lifecycle. We recommend to synchronize it at application launch. Multiple synchronization calls are allowed.

Required parameter is `appKey` - Appodeal API Key.

To synchronise user consent you can use following methods. If user consent is required it will shows fullscreen Consent Dialog.
Callback will return information about latest user consent and current regulation zone.

Since the 2.7.0 version, Appdoeal SDK can be initialized directly with the Consent Report object of Consent Manager. If your application uses Consent Manager and you call the synchronize method before Appodeal initialization you don't need to pass boolean consent as an argument. SDK will check that the consent report exists and will use it. 

> In case Appodeal will try to initialize without boolean consent or before the Consent Manager is synchronized it will use `false` boolean consent.

``` javascript
import {
    Appodeal,
    AppodealConsentStatus,
    AppodealConsentRegulation,
} from 'react-native-appodeal';

Appodeal.synchroniseConsent('Your appKey', (consent: AppodealConsentStatus, regulation: AppodealConsentRegulation) => {
    // Initialise Appodeal SDK here
    Appodeal.initialize('Your appKey', adTypes);
})
```

You can force consent manager to show consent dialog at any moment of application lifecycle after consent manager was synchronised.

``` javascript
import {
    Appodeal,
    AppodealConsentStatus,
    AppodealConsentRegulation,
} from 'react-native-appodeal';

Appodeal.forceShowConsentDialog((consent: AppodealConsentStatus, regulation: AppodealConsentRegulation) => {
    // Handle updated data
})
```

You can get consent result for specific vendor bundle, that registered in Appodeal system. Eg you can use your application id.

``` javascript
import { Appodeal } from 'react-native-appodeal';

Appodeal.hasConsent('com.organisation.app', (consentResult: boolean) => {
    // Handle updated data
})
```

> Note. Usage of Consent Manager is not required. 

## Banner View

AppodealBanner is a component that allows you to display ads in a banner format (know as _AppodealBannerView_).

Banners are available in 3 sizes:

* `phone` (320x50)
* `tablet` (728x90)
* `mrec` (MREC)

> Note if you want to show MREC banners in your app, you need to initialise Appodeal SDK with *AppodealAdType. MREC*

Appodeal Banner View can be used only *after* Appodeal SDK was initialized. You can show only *one* banner on the screen.
Static banners (top or bottom) can't be used in one session with _AppodealBanner_. 

``` javascript
import {
    AppodealBanner
} from 'react-native-appodeal';

<AppodealBanner
    style = {{
        height: 50,
        width: '100%',
        backgroundColor: 'hsl(0, 0%, 97%)',
        alignContent: 'stretch',
    }}
    adSize = 'phone'
    usesSmartSizing // (iOS specific) on Android smart banners are enabled by default.
/>
```

When banner is added on screen it starts to load ad automatically event if autocache is disabled.

### Styling

Height property of banner styles should corresponds to *adSize* attribute. We recommend to use 

| adSize | height |
|---|---|
| 'phone' | 50 |
| 'tablet' | 90 |
| 'mrec' | 250 |

### Callbacks

Banner view has explicit callbacks. 

``` javascript
<AppodealBanner
    style = {styles.banner}
    adSize = 'phone'
    usesSmartSizing // (iOS specific) on Android smart banners are enabled by default.
    onAdLoaded = {() => console.log("Banner view did load")}
    onAdExpired = {() => console.log("Banner view expired")}
    onAdClicked = {() => console.log("Banner view is clicked")}
    onAdFailedToLoad = {() => console.log("Banner view is failed to load")}
/>
```

## Changelog

2.8.0

* Update Appodeal to 2.8.0 

2.7.5

* [iOS] Add smart banners to banner view. Change pod dependency to Appodeal to 2.7.4

2.7.4

* [iOS] Update Appodeal to 2.7.4
* [Android] Fixes in banner view

2.7.3-Beta

* Update Appodeal to 2.7.3-Beta


2.7.2-Beta

* Update Appodeal to 2.7.2-Beta
* Add deeper Consent Manager integration

2.6.5

* Update Appodeal to 2.6.5
* Fix iOS banner view

2.6.4

* Update Appodeal to 2.6.4
* Add banner view and MREC support
* Add Consent Manager support

2.6.3

* Update Appodeal to 2.6.3
* Refactor plugin
* Update dependency management

2.1.4 

* release
