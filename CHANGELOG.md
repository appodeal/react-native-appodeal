# Changelog

## 3.8.1

- **🚀 Turbo Modules Implementation**: Migrated to React Native's Turbo modules architecture for better performance, type safety, and future compatibility
- **New and Old Architecture Support**: Full support for both React Native Old Architecture (0.68+) and New Architecture (0.74+)

### Features

* **💥 Breaking Changes - Major API Update**
    - Updated API methods and event names for better consistency
    - New event system with improved type safety and better error handling
    - Module architecture complete rewrite using TurboModules for optimal performance
    - See [Migration Guide](MIGRATION_GUIDE.md) for detailed upgrade instructions

### Android Features
- Migrated to Kotlin 2.1.0 
- Min sdk api increased to 23
- Updated Appodeal iOS SDK to [3.8.1](https://docs.appodeal.com/ios/get-started)

### iOS Features
- Updated Appodeal Android SDK to [3.8.1](https://docs.appodeal.com/android/get-started)

## 3.5.0

### Updated SDKs

- Updated Appodeal iOS SDK to [3.5.0](https://docs.appodeal.com/ios/get-started)
- Updated Appodeal Android SDK to [3.5.0](https://docs.appodeal.com/android/get-started)

## 3.4.1

### Updated SDKs

- Updated Appodeal iOS SDK to [3.4.1](https://docs.appodeal.com/ios/get-started)
- Updated Appodeal Android SDK to [3.4.1](https://docs.appodeal.com/android/get-started)

## 3.4.0-beta.1

### Updated SDKs

- Updated Appodeal iOS SDK to [3.4.0-beta.2](https://docs.appodeal.com/ios/get-started)
- Updated Appodeal Android SDK to [3.4.0-beta.1](https://docs.appodeal.com/android/get-started)

## 3.3.3

### Updated SDKs

- Updated Appodeal iOS SDK to [3.3.3](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.3.3](https://docs.appodeal.com/android/changelog)
- Support Xcode 16 and iOS 18.0

## 3.3.2

### Updated SDKs

- Updated Appodeal iOS SDK to [3.3.2](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.3.2](https://docs.appodeal.com/android/changelog)

## 3.3.1

### Updated SDKs

- Updated Appodeal iOS SDK to [3.3.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.3.1](https://docs.appodeal.com/android/changelog)

## 3.3.0

### Updated SDKs

- Updated Appodeal iOS SDK to [3.3.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.3.0](https://docs.appodeal.com/android/changelog)

## 3.2.3

### Updated SDKs

- Updated Appodeal iOS SDK to [3.2.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.2.1](https://docs.appodeal.com/android/changelog)

## 3.2.2-beta

### Features

* **💥 Google CMP and TCF v2 Support**
    - Updated Appodeal SDK to [3.2.1-beta.1](https://docs.appodeal.com/android/changelog)
    - Supports TCFv2 and Google UMP
    - Follow this [instruction](https://docs.appodeal.com/advanced/google-cmp-and-tcfv2-support) to configure Google UMP and set up a consent form

### Updated SDKs

- Updated Appodeal iOS SDK to [3.2.1-beta.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.2.1-beta.1](https://docs.appodeal.com/android/changelog)

### Removed

- Removed `updateGDPRConsent` method
- Removed `updateCCPAConsent` method

### Added

- Added `consentStatus` method
- Added `requestConsentInfoUpdate` method
- Added `showConsentFormIfNeeded` method
- Added `showConsentForm` method
- Added `revokeConsent` method

## 3.2.1

### Promoted the beta release to the stable version

### Updated SDKs

- Updated Appodeal iOS SDK to [3.2.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.2.0](https://docs.appodeal.com/android/changelog)

## 3.2.0-beta

### Updated SDKs

- Updated Appodeal iOS SDK to [3.2.0-beta.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.2.0-beta.1](https://docs.appodeal.com/android/changelog)

## 3.1.4

### Promoted the beta release to the stable version

### Updated SDKs

- Updated Appodeal iOS SDK to [3.1.3](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.1.3](https://docs.appodeal.com/android/changelog)

## 3.1.3-beta

### Updated SDKs

- Updated Appodeal iOS SDK to [3.1.3-beta.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.1.3-beta.1](https://docs.appodeal.com/android/changelog)

### Changed

- Updated Banner View for Android
- Split MREC and Banner Views

## 3.0.2

### Updated SDKs

- Updated Appodeal iOS SDK to [3.0.2](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.0.2](https://docs.appodeal.com/android/changelog)

## 3.0.1

### Updated SDKs

- Updated Appodeal iOS SDK to [3.0.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.0.1](https://docs.appodeal.com/android/changelog)

### Added

- Added ad revenue callback

## 3.0.0

### Features

* **Major API changes**
    - Updated Appodeal iOS SDK to [3.0.0](https://docs.appodeal.com/ios/changelog)
    - Updated Appodeal Android SDK to [3.0.0](https://docs.appodeal.com/android/changelog)
    - Started support Monetization + UA + Analytics data services
    - Added new API for in-app purchases and event tracking
    - Internal API improvements
    - Internal View Ad improvements

### Updated SDKs

- Updated Appodeal iOS SDK to [3.0.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [3.0.0](https://docs.appodeal.com/android/changelog)

## 2.11.0

### Updated SDKs

- Updated Appodeal iOS SDK to [2.11.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.11.0](https://docs.appodeal.com/android/changelog)

### Changed

- Bump Android `compileSdkVersion` to **31**
- Bump Android `buildToolsVersion` to **31.0.0**

### Removed

- Removed methods:
  ```javascript
  Appodeal.disableLocationPermissionCheck();
  Appodeal.disableWriteExternalStoragePermissionCheck();
  Appodeal.requestAndroidMPermissions(params => {});
  ```

## 2.10.3

### Updated SDKs

- Updated Appodeal iOS SDK to [2.10.3](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.10.3](https://docs.appodeal.com/android/changelog)

### Improved

- Improvements of AppodealBanner behaviour

## 2.10.2

### Updated SDKs

- Updated Appodeal iOS SDK to [2.10.2](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.10.2](https://docs.appodeal.com/android/changelog)

## 2.10.1

### Updated SDKs

- Updated Appodeal iOS SDK to [2.10.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.10.1](https://docs.appodeal.com/android/changelog)

## 2.10.0-beta

### Updated SDKs

- Updated Appodeal iOS SDK to [2.10.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.10.0](https://docs.appodeal.com/android/changelog)

### Fixed

- [iOS] Fixed `disableNetwork` method

## 2.9.1

### Updated SDKs

- Updated Appodeal iOS SDK to [2.9.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.9.0](https://docs.appodeal.com/android/changelog)

## 2.9.0

### Updated SDKs

- Updated Appodeal iOS SDK to [2.9.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.9.0](https://docs.appodeal.com/android/changelog)

## 2.8.2

### Updated SDKs

- Updated Appodeal iOS SDK to [2.8.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.8.1](https://docs.appodeal.com/android/changelog)

## 2.8.1-beta

### Updated SDKs

- Updated Appodeal iOS SDK to [2.8.1](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.8.1](https://docs.appodeal.com/android/changelog)

### Added

- [Android] Added method `setSharedAdsInstanceAcrossActivities`

## 2.8.0-beta

### Updated SDKs

- Updated Appodeal iOS SDK to [2.8.0](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.8.0](https://docs.appodeal.com/android/changelog)

## 2.7.7

### Fixed

- [iOS] Fixed `setOnLoadedTriggerBoth` method
- [Android] Fixed `requestAndroidMPermissions` method
- Fixed parameters in `AppodealRewardedEvent.CLOSED` callback

## 2.7.6

### Updated SDKs

- [iOS] Updated Appodeal iOS SDK to [2.7.5](https://docs.appodeal.com/ios/changelog)
- [Android] Updated Appodeal Android SDK to [2.7.4](https://docs.appodeal.com/android/changelog)

## 2.7.5

### Updated SDKs

- [iOS] Updated Appodeal iOS SDK to [2.7.4](https://docs.appodeal.com/ios/changelog)

### Added

- [iOS] Added smart banners to banner view

## 2.7.4

### Updated SDKs

- Updated Appodeal iOS SDK to [2.7.4](https://docs.appodeal.com/ios/changelog)

### Fixed

- [Android] Fixed issues in banner view

## 2.7.3-beta

### Updated SDKs

- Updated Appodeal iOS SDK to [2.7.3-beta](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.7.3-beta](https://docs.appodeal.com/android/changelog)

## 2.7.2-beta

### Updated SDKs

- Updated Appodeal iOS SDK to [2.7.2-beta](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.7.2-beta](https://docs.appodeal.com/android/changelog)

### Added

- Added deeper Consent Manager integration

## 2.6.5

### Updated SDKs

- Updated Appodeal iOS SDK to [2.6.5](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.6.5](https://docs.appodeal.com/android/changelog)

### Fixed

- Fixed iOS banner view

## 2.6.4

### Updated SDKs

- Updated Appodeal iOS SDK to [2.6.4](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.6.4](https://docs.appodeal.com/android/changelog)

### Added

- Added banner view and MREC support
- Added Consent Manager support

## 2.6.3

### Updated SDKs

- Updated Appodeal iOS SDK to [2.6.3](https://docs.appodeal.com/ios/changelog)
- Updated Appodeal Android SDK to [2.6.3](https://docs.appodeal.com/android/changelog)

### Changed

- Refactored plugin
- Updated dependency management

## 2.1.4

### Updated SDKs

- Updated Appodeal iOS SDK to stable release
- Updated Appodeal Android SDK to stable release