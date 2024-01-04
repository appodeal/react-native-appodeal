/* eslint-disable no-bitwise */
import {
  Appodeal,
  AppodealAdType,
  AppodealInterstitialEvent,
  AppodealRewardedEvent,
  AppodealBannerEvent,
  AppodealSdkEvent,
  AppodealAdRevenue,
} from 'react-native-appodeal';
import {constants} from './constants';

export enum SDKState {
  PENDING = 0,
  INITIALIZING = 1,
  INITIALIZED = 2,
}

export const initialize = (testing: boolean) => {
  Appodeal.setLogLevel(constants.logLevel);
  // Setup callbacks
  registerListeners();

  // Set user settings
  Appodeal.setUserId(constants.user.id);
  Appodeal.setCustomStateValue(constants.user.age, 'appodeal_user_age');
  Appodeal.setCustomStateValue(constants.user.gender, 'appodeal_user_gender');

  // Set extras
  Appodeal.setExtrasValue('app_specific_value', 'app_specific_key');

  // Global settings
  // Appodeal.setSharedAdsInstanceAcrossActivities(true);
  Appodeal.setTriggerPrecacheCallbacks(constants.adTypes, false);
  Appodeal.setLogLevel(constants.logLevel);
  Appodeal.setTesting(testing);
  Appodeal.setTabletBanners(false);

  // Disable network
  Appodeal.disableNetwork(
    'some_network_id',
    AppodealAdType.BANNER | AppodealAdType.INTERSTITIAL,
  );

  // Initialize
  Appodeal.initialize(constants.appKey, constants.adTypes);
};

export const isInitialized = () => {
  return Appodeal.isInitialized(constants.adTypes);
};

export enum BannerShowStyle {
  BOTTOM = 'Bottom',
  TOP = 'Top',
  VIEW = 'View',
}

export const isViewBannerStyle = (style: BannerShowStyle) =>
  style === BannerShowStyle.VIEW;

export const bannerAdType = (style: BannerShowStyle) => {
  switch (style) {
    case BannerShowStyle.BOTTOM:
      return AppodealAdType.BANNER_BOTTOM;
    case BannerShowStyle.TOP:
      return AppodealAdType.BANNER_TOP;
    default:
      return AppodealAdType.BANNER;
  }
};

let levelsPlayed = 0;

const registerListeners = () => {
  // SDK callbacks
  Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () =>
    console.log('Appodeal SDK initialized'),
  );
  Appodeal.addEventListener(
    AppodealSdkEvent.AD_REVENUE,
    (revenue: AppodealAdRevenue) => {
      console.log('Appodeal SDK did receive ad revenue: ', revenue);
    },
  );
  // Interstitial callbacks
  Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, (event: any) =>
    console.log('Interstitial loaded. Precache: ', event.isPrecache),
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => {
    console.log('Interstitial shown');
    levelsPlayed += 1;
    Appodeal.setCustomStateValue(levelsPlayed, 'levels_played');
    Appodeal.setCustomStateValue('gold', 'player_rank');
  });
  Appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () =>
    console.log('Interstitial expired'),
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
    console.log('Interstitial clicked'),
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () =>
    console.log('Interstitial closed'),
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
    console.log('Interstitial failed to load'),
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
    console.log('Interstitial failed to show'),
  );
  // Banner callbacks
  Appodeal.addEventListener(AppodealBannerEvent.LOADED, (event: any) =>
    console.log(
      'Banner loaded. Height: ',
      event.height + ', precache: ' + event.isPrecache,
    ),
  );
  Appodeal.addEventListener(AppodealBannerEvent.SHOWN, () =>
    console.log('Banner shown'),
  );
  Appodeal.addEventListener(AppodealBannerEvent.EXPIRED, () =>
    console.log('Banner expired'),
  );
  Appodeal.addEventListener(AppodealBannerEvent.CLICKED, () =>
    console.log('Banner clicked'),
  );
  Appodeal.addEventListener(AppodealBannerEvent.FAILED_TO_LOAD, () =>
    console.log('Banner failed to load'),
  );

  // Rewarded video callbacks
  Appodeal.addEventListener(AppodealRewardedEvent.LOADED, (event: any) =>
    console.log('Rewarded video loaded. Precache: ', event.isPrecache),
  );
  Appodeal.addEventListener(AppodealRewardedEvent.SHOWN, () =>
    console.log('Rewarded video shown'),
  );
  Appodeal.addEventListener(AppodealRewardedEvent.EXPIRED, () =>
    console.log('Rewarded video expired'),
  );
  Appodeal.addEventListener(AppodealRewardedEvent.REWARD, (event: any) =>
    console.log(
      'Rewarded video finished. Amount: ',
      event.amount + ', currency: ' + event.currency,
    ),
  );
  Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, (event: any) =>
    console.log('Rewarded video closed, is finished: ', event.isFinished),
  );
  Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_LOAD, () =>
    console.log('Rewarded video failed to load'),
  );
  Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_SHOW, () =>
    console.log('Rewarded video failed to show'),
  );
};
