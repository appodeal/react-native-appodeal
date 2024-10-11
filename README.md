# react-native-appodeal

React Native package that adds Appodeal SDK support to your react-native application.

## Table of Contents

- [react-native-appodeal](#react-native-appodeal)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
      - [iOS](#ios)
      - [Android](#android)
  - [Usage](#usage)
    - [Initialisation](#initialisation)
    - [Callbacks](#callbacks)
    - [Presentation](#presentation)
  - [GDPR/CCPA](#gdprccpa)
  - [Measurment](#measurment)
    - [Ad Revenue](#ad-revenue)
    - [Event Tracking](#event-tracking)
    - [In-App Purchase validation](#in-app-purchase-validation)
  - [Banner View](#banner-view)
    - [Styling](#styling)
    - [Callbacks](#callbacks-1)
  - [MREC View](#mrec-view)
    - [Callbacks](#callbacks-2)
  - [Changelog](#changelog)

## Installation

Run following commands in project root directory

`$ npm install react-native-appodeal --save` 

> There are beta versions of Appodeal SDK available on the React Native. To 
> install beta version of the plugin please add a tag `@beta` to the installation command:
> 
> ```$ npm install react-native-appodeal@beta --save```

If you are using React Native version **lower than 0.60** run following command:

`$ react-native link react-native-appodeal` 

#### iOS

1. Go to `ios/` folder and open *Podfile*
2. Add Appodeal adapters. Add pods into `./ios/Podfile`:

```ruby
target 'App' do
    config = use_native_modules!

    use_react_native!(
        :path => config[:reactNativePath],
        :hermes_enabled => false
    )

    pod 'Appodeal', '3.3.2'
    pod 'APDAdjustAdapter', '3.3.2.0'
    pod 'APDAmazonAdapter', '3.3.2.0'
    pod 'APDAppLovinAdapter', '3.3.2.0'
    pod 'APDAppLovinMAXAdapter', '3.3.2.0'
    pod 'APDAppsFlyerAdapter', '3.3.2.0'
    pod 'APDBidMachineAdapter', '3.3.2.0'
    pod 'APDBidonAdapter', '3.3.2.0'
    pod 'APDBigoAdsAdapter', '3.3.2.0'
    pod 'APDDTExchangeAdapter', '3.3.2.0'
    pod 'APDFacebookAdapter', '3.3.2.0'
    pod 'APDFirebaseAdapter', '3.3.2.0'
    pod 'APDGoogleAdMobAdapter', '3.3.2.0'
    pod 'APDIABAdapter', '3.3.2.0'
    pod 'APDInMobiAdapter', '3.3.2.0'
    pod 'APDIronSourceAdapter', '3.3.2.0'
    pod 'APDMetaAudienceNetworkAdapter', '3.3.2.0'
    pod 'APDMintegralAdapter', '3.3.2.0'
    pod 'APDMyTargetAdapter', '3.3.2.0'
    pod 'APDPangleAdapter', '3.3.2.0'
    pod 'APDSentryAdapter', '3.3.2.0'
    pod 'APDUnityAdapter', '3.3.2.0'
    pod 'APDVungleAdapter', '3.3.2.0'
    pod 'APDYandexAdapter', '3.3.2.0'
    pod 'AmazonPublisherServicesSDK', '4.9.2'
    pod 'AppLovinMediationAmazonAdMarketplaceAdapter', '4.9.2.0'
    pod 'AppLovinMediationBidMachineAdapter', '2.6.0.0'
    pod 'AppLovinMediationFacebookAdapter', '6.15.0.0'
    pod 'AppLovinMediationFyberAdapter', '8.3.1.0'
    pod 'AppLovinMediationGoogleAdManagerAdapter', '11.5.0.0'
    pod 'AppLovinMediationGoogleAdapter', '11.5.0.0'
    pod 'AppLovinMediationInMobiAdapter', '10.7.2.0'
    pod 'AppLovinMediationIronSourceAdapter', '8.1.0.0.1'
    pod 'AppLovinMediationMintegralAdapter', '7.6.1.0.0'
    pod 'AppLovinMediationMyTargetAdapter', '5.20.1.1'
    pod 'AppLovinMediationUnityAdsAdapter', '4.11.3.2'
    pod 'AppLovinMediationVungleAdapter', '7.3.0.0'
    pod 'AppLovinMediationYandexAdapter', '5.2.1.0'
    pod 'BidMachineAmazonAdapter', '2.6.0.1'
    pod 'BidMachineMetaAudienceAdapter', '2.6.0.0'
    pod 'BidMachineMintegralAdapter', '2.6.0.0'
    pod 'BidMachineMyTargetAdapter', '2.6.0.0'
    pod 'BidMachinePangleAdapter', '2.6.0.0'
    pod 'BidMachineVungleAdapter', '2.6.0.0'
    pod 'BidonAdapterAmazon', '0.6.0.0'
    pod 'BidonAdapterAppLovin', '0.6.0.0'
    pod 'BidonAdapterBidMachine', '0.6.0.0'
    pod 'BidonAdapterBigoAds', '0.6.0.0'
    pod 'BidonAdapterDTExchange', '0.6.0.0'
    pod 'BidonAdapterGoogleAdManager', '0.6.0.0'
    pod 'BidonAdapterGoogleMobileAds', '0.6.0.0'
    pod 'BidonAdapterInMobi', '0.6.0.0'
    pod 'BidonAdapterMetaAudienceNetwork', '0.6.0.0'
    pod 'BidonAdapterMintegral', '0.6.0.0'
    pod 'BidonAdapterUnityAds', '0.6.0.0'
    pod 'BidonAdapterVungle', '0.6.0.0'
    pod 'bigo-ads-max-adapter', '4.3.0.0'
    pod 'myTrackerSDK', '3.1.7'

    target 'AppTests' do
        inherit! :complete
    end

    use_native_modules!
    use_frameworks!
end
```

You can change following implementation to use custom mediation setup. See [docs](https://docs.appodeal.com/ios/get-started#iOSSDK.GetStarted-Step1.ImportSDK).

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

Add *GADApplicationIdentifier* key (if you use Admob adapter).

``` xml
<key>GADApplicationIdentifier</key>
<string>YOUR_ADMOB_APP_ID</string>
```

For more information about Admob sync check out our [FAQ](https://faq.appodeal.com/articles/4185565-how-do-i-link-my-admob-account).

Add `FacebookAppID`, `FacebookClientToken` and other parameters according to [doc](https://developers.facebook.com/docs/ios/getting-started/#configure-your-project) (if you use Meta Analytics adapter)

``` xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
  <key>CFBundleURLSchemes</key>
  <array>
    <string>fbAPP-ID</string>
  </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>APP-ID</string>
<key>FacebookClientToken</key>
<string>CLIENT-TOKEN</string>
<key>FacebookDisplayName</key>
<string>APP-NAME</string>
```

Add `GoogleService-Info.plist` according to [doc](https://firebase.google.com/docs/ios/setup#add-config-file) (if you use Firebase  adapter)

1. Run your project ( `Cmd+R` )

#### Android

1. Add Appodeal adapters. 

Add dependencies into `build.gradle` (module: app)

``` groovy
dependencies {
    ...
    implementation 'com.appodeal.ads:sdk:3.3.2.+'
    ...
}
```

Add repository into `build.gradle` (module: project)

``` groovy
allprojects {
    repositories {
        ...
        jcenter()
        maven { url "https://artifactory.appodeal.com/appodeal" }
        maven { url "https://artifactory.appodeal.com/appodeal-beta-public" }
        ...
    }
}
```

> Note. You can change following implementation to use custom mediation setup. See [Docs](https://docs.appodeal.com/android/get-started)

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

3. Set all required permissions in *AndroidManifest.xml*. See [Docs](https://docs.appodeal.com/android/get-started)

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

For more information about Admob sync check out our [FAQ](https://faq.appodeal.com/en/articles/4185565-how-do-i-link-my-admob-account).

6. Meta configuration (if you use Meta Analytics adapter)

``` xml
<manifest>
    <application>
       <meta-data
            android:name="com.facebook.sdk.ApplicationId"
            android:value="[META_APP_ID]" />
        <meta-data
            android:name="com.facebook.sdk.ClientToken"
            android:value="META_CLIENT_TOKEN" />
    </application>
</manifest>
```

7. Add `google-services.json` according to [doc](https://firebase.google.com/docs/android/setup#add-config-file) (if you use Firebase  adapter)

## Usage

Please, read iOS and Android [docs](https://docs.appodeal.com/) to get deeper understanding how 
Appodeal SDK works.

### Initialisation

1. Initialise Appodeal at the application launch.

``` javascript
import {
    Appodeal,
    AppodealAdType
} from 'react-native-appodeal';

const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER;
Appodeal.initialize('Your app key', adTypes)
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
// Disable network for specific ad type:
// Call this method before initilisation
Appodeal.disableNetwork("some_network ", AppodealAdType.INTERSTITIAL);
// Enable or disable triggering show for precache ads
// Call this method before or after initilisation
Appodeal.setTriggerPrecacheCallbacks(true, AppodealAdType.BANNER);
```

* Segments and targeting. 

``` javascript
import {
    Appodeal,
    AppodealGender
} from 'react-native-appodeal';
// Set specific user id from attribution system
// Call this method before initilisation
Appodeal.setUserId('some user ud')
// Set user age
// Call this method before or after initilisation
Appodeal.setCustomStateValue(25, 'appodeal_user_age');
// Set user gender
// Supported values are male | female
// Call this method before of after initilisation
Appodeal.setCustomStateValue(AppodealGender.FEMALE, 'appodeal_user_gender');

// Set segment filter
// Call this method before of after initilisation
Appodeal.setCustomStateValue(levelsPlayed, 'levels_played');
Appodeal.setCustomStateValue(10, 'user_rank');
Appodeal.setCustomStateValue(false, 'paid');
// Set extras
Appodeal.setExtrasValue("some value", 'attribuition_id');
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
```

### Callbacks

Set callbacks listener to get track of ad lifecycle events. 

1. SDK

Initialization callback. Fired when SDK is fully initialized

``` javascript
import {
    Appodeal,
    AppodealSdkEvent
} from 'react-native-appodeal';

Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () =>
    console.log("Appodeal SDK did initialize");
);
```

Ad revenue callback. Fired when SDK is shown ad impression and register revenue

```javascript
Appodeal.addEventListener(
    AppodealSdkEvent.AD_REVENUE,
    (revenue: AppodealAdRevenue) => {
        console.log('Appodeal SDK did receive ad revenue: ', revenue);
    },
);
```

where ad revenue is object that contains:

| Property         | Type           | Desctiption                                                                                        |
|------------------|----------------|----------------------------------------------------------------------------------------------------|
| networkName      | string         | Name of Ad Network                                                                                 |
| adUnitName       | string         | Name of Appodeal Ad Unit                                                                           |
| placement        | string         | Name of impression placement                                                                       |
| revenuePrecision | string         | Revenue precision                                                                                  |
| demandSource     | string         | Demand Source name. Bidder name in case of impression from real time bidding or name of ad network |
| currency         | string         | Revenue currency. USD                                                                              |
| revenue          | number         | Revenue amount                                                                                     |
| adType           | AppodealAdType | Impression ad type                                                                                 |

2. Banner

``` javascript
import {
    Appodeal,
    AppodealBannerEvent
} from 'react-native-appodeal';

Appodeal.addEventListener(AppodealBannerEvent.LOADED, (event: any) =>
    console.log("Banner loaded. Height: ", event.height + ", precache: " + event.isPrecache)
);
Appodeal.addEventListener(AppodealBannerEvent.SHOWN, () =>
    console.log("Banner shown")
);
Appodeal.addEventListener(AppodealBannerEvent.EXPIRED, () =>
    console.log("Banner expired")
);
Appodeal.addEventListener(AppodealBannerEvent.CLICKED, () =>
    console.log("Banner was clicked")
);
Appodeal.addEventListener(AppodealBannerEvent.FAILED_TO_LOAD, () =>
    console.log("Banner failed to load")
);
```

3. Interstitial

``` javascript
import {
    Appodeal,
    AppodealInterstitialEvent
} from 'react-native-appodeal';

Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, (event: any) =>
    console.log("Interstitial loaded. Precache: ", event.isPrecache)
);
Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => 
    console.log("Interstitial shown")
);
Appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () =>
    console.log("Interstitial expired")
);
Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
    console.log("Interstitial was clicked")
);
Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
    console.log("Interstitial closed")
);
Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
    console.log("Interstitial failed to load")
);
Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
    console.log("Interstitial failed to show")
);
```

4. Rewarded video

``` javascript
import {
    Appodeal,
    AppodealRewardedEvent
} from 'react-native-appodeal';

Appodeal.addEventListener(AppodealRewardedEvent.LOADED, (event: any) =>
    console.log("Rewarded video loaded. Precache: ", event.isPrecache)
);
Appodeal.addEventListener(AppodealRewardedEvent.SHOWN, () =>
    console.log("Rewarded video shown")
);
Appodeal.addEventListener(AppodealRewardedEvent.EXPIRED, () =>
    console.log("Rewarded video expired")
);
Appodeal.addEventListener(AppodealRewardedEvent.CLICKED, () => 
    console.log("Rewarded video was clicked")
);
Appodeal.addEventListener(AppodealRewardedEvent.REWARD, (event: any) =>
    console.log("Rewarded video finished. Amount: ", event.amount + ", currency: " + event.currency)
);
Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, (event: any) =>
    console.log("Rewarded video closed, is finished: ", event.isFinished)
);
Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_LOAD, () =>
    console.log("Rewarded video failed to load")
);
Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_SHOW, () =>
    console.log("Rewarded video failed to show")
);
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
const canShow = Appodeal.canShow(AppodealAdType.INTERSTITIAL, 'your_placement');
console.log("Interstitial ", canShow ? "can be shown" : "can not be shown");
// Check that banner is loaded 
const isLoaded = Appodeal.isLoaded(AppodealAdType.BANNER);
console.log("Banner ", isLoaded ? "is loaded" : "is not loaded");
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

## GDPR/CCPA

Appodeal since 3.0.0 is supports GDPR and CCPA regulations by default. It will automatically detect 
regulation zone and show all required consent dialog at the very first initialization moment if it is needed. 

> Since **v3.2.2** plugin fully supports TCFv2 and Google UMP. To properly set UMP messages 
> please read [the following guide](https://docs.appodeal.com/advanced/google-cmp-and-tcfv2-support).

If you need more control of user consent in your app you can manually request consent information update,
show form or revokes previously obtained user consent

``` javascript

import {
    Appodeal,
    AppodealConsentStatus
} from 'react-native-appodeal';

// Get current consent status
switch (Appodeal.consentStatus()) {
    case AppodealConsentStatus.UNKNOWN: 
        // The SDK did not request consent info update yet
    case AppodealConsentStatus.REQUIRED:
        // A user is under regulations and should provides a consent
    case AppodealConsentStatus.NOT_REQUIRED:
        // A user is not under regulations
    case AppodealConsentStatus.OBTAINED:
        // A user is under regulations and and already provides a consent
}

// Request consent info update promise that returns updated status
Appodeal.requestConsentInfoUpdate('Your app key')
    .then((status) => console.log(status))
    .catch((error) => console.log(error))

// Load and show consent form only if consent status is REQUIRED
Appodeal.showConsentFormIfNeeded()
    .then((status) => console.log(status))
    .catch((error) => console.log(error))

// Force load and show consent form 
Appodeal.showConsentForm()
    .then((status) => console.log(status))
    .catch((error) => console.log(error))

// Removes previously obtained consent
Appodeal.revokeConsent();

```

## Measurment

### Ad Revenue

Ad revenue tracking is available by default for Firebase, AppsFlyer and Adjust. To use it you will need to add Appodeal's Firebase, AppsFlyer or Adjust adapters accordingly.

### Event Tracking

Event tracking is available for Firebase, AppsFlyer, Adjust and Meta. Add this adapters in your App and call following method:

``` javascript
import {
    Appodeal
} from 'react-native-appodeal';

Appodeal.trackEvent('app_event');
Appodeal.trackEvent('app_event', { 'some_key', 'some_value' });
```

### In-App Purchase validation

In-App Purchase validation is available by AppsFlyer or Adjust MMPs. After validation purchase will track automatically. To use this you will need to one of Adjust or AppsFlyer adapters into the App, enable validation on MMP's side and call following method:

``` javascript
import {
    Appodeal,
    AppodealIOSPurchaseType,
    AppodealAndroidPurchaseType
} from 'react-native-appodeal';

if (Platform.OS === 'ios') {
    Appodeal.validateAndTrackInAppPurchase({
        productId: "Product ID",
        productType: AppodealIOSPurchaseType.AUTO_RENEWABLE_SUBSCRIPTION,
        price: 9.99,
        currency: "USD",
        transactionId: "Transaction ID"
    }, (result, error) => 
        console.log("Purchase validation ", result ? "successed" : "failed");
    );
} else if (Platform.OS === 'android') {
    if (Platform.OS === 'ios') {
    Appodeal.validateAndTrackInAppPurchase({
        publicKey: "Public Key",
        productType: AppodealAndroidPurchaseType.SUBSCRIPTION,
        signature: "Signature",
        purchaseData: "Purchase data",
        purchaseToken: "Token",
        timestamp: 12345678,
        developerPayload: "payload",
        price: "9.99",
        currency: "USD",
        orderId: "Order",
        sku: "SKU"
    }, (result, error) => 
        console.log("Purchase validation ", result ? "successed" : "failed");
    );
}
```

## Banner View

AppodealBanner is a component that allows you to display ads in a banner format (know as _AppodealBannerView_).

Banners are available in 3 sizes:

* `phone` (320x50)
* `tablet` (728x90)

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

| adSize   | height |
|----------|--------|
| 'phone'  | 50     |
| 'tablet' | 90     |

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

## MREC View

AppodealMrec is a component that allows you to display ads in a MREC (banner with size of 300x250) format (know as _AppodealMrecView_).

Appodeal MREC View can be used only *after* Appodeal SDK was initialized. You can show only *one* MREC on the screen.

``` javascript
import {
    AppodealMrec
} from 'react-native-appodeal';

<AppodealMrec
    style = {{
        backgroundColor: 'hsl(0, 0%, 97%)',
        alignContent: 'stretch',
    }}
/>
```

When banner is added on screen it starts to load ad automatically event if autocache is disabled.

### Callbacks

MREC view has explicit callbacks. 

``` javascript
<AppodealMrec
    style = {styles.mrec}
    onAdLoaded = {() => console.log("MREC view did load")}
    onAdExpired = {() => console.log("MREC view expired")}
    onAdClicked = {() => console.log("MREC view is clicked")}
    onAdFailedToLoad = {() => console.log("MREC view is failed to load")}
/>
```

## Changelog

3.3.2

* Update Appodeal to 3.3.2 (stable)

3.3.1

* Update Appodeal to 3.3.1 (stable)

3.3.0

* Update Appodeal to 3.3.0 (stable)

3.2.3

* Update Appodeal to 3.2.1 (stable)
  
3.2.2-Beta 

* Update Appodeal 3.2.1-beta.1
* Supports TCFv2 and Google UMP
* Removes `updateGDPRConsent`
* Removes `updateCCPAConsent`
* Adds `consentStatus`
* Adds `requestConsentInfoUpdate`
* Adds `showConsentFormIfNeeded`
* Adds `showConsentForm`
* Adds `revokeConsent`


3.2.1

* Update Appodeal to 3.2.0 (stable)


3.2.0-Beta

* Update Appodeal to 3.2.0-beta.1


3.1.4

* Switch to stable release


3.1.3-Beta

* Update Appodeal to 3.1.3-beta.1
* Update Banner View for Android
* Split Mrec and Banner Views


3.0.2

* Update Appodeal to 3.0.2


3.0.1

* Update Appodeal to 3.0.1 
* Add ad revenue callback


3.0.0 

* Update Appodeal to 3.0.0 
* Refactor plugin API. See doc above


2.11.0

* Update Appodeal to 2.11.0 (Stable)
* Bump Android `compileSdkVersion` to **31**.
* Bump Android `buildToolsVersion` to **31.0.0**
* Remove methods:

``` javascript
Appodeal.disableLocationPermissionCheck();
Appodeal.disableWriteExternalStoragePermissionCheck();
Appodeal.requestAndroidMPermissions(params => {});
```
 

2.10.3

* Update Appodeal to 2.10.3 (Stable)
* Improvements of AppodealBanner behaviour


2.10.2

* Update Appodeal to 2.10.2 (Stable)


2.10.1 

* Update Appodeal to 2.10.1 (Stable)


2.10.0-Beta

* Update Appodeal to 2.10.0 (Beta)
* [iOS] Fix `disableNetwork` method


2.9.1

* Update Appodeal to 2.9.0 (Stable)


2.9.0

* Update Appodeal to 2.9.0 (Beta)


2.8.2

* Update Appodeal to 2.8.1 (Stable)


2.8.1-Beta

* Update Appodeal to 2.8.1 (Beta)
* [Android] Add method `setSharedAdsInstanceAcrossActivities`


2.7.7

* [iOS] Fix `setOnLoadedTriggerBoth` method
* [Android] Fix `requestAndroidMPermissions` method
* Fix paramaters in `AppodealRewardedEvent.CLOSED` callback


2.7.6

* [iOS] Update Appodeal to 2.7.5
* [Android] Update Appodeal to 2.7.4


2.8.0-Beta

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
