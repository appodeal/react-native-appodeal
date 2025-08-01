// Mock the Turbo module for testing
jest.mock('../specs/NativeAppodealModule', () => ({
  __esModule: true,
  default: {
    initialize: jest.fn((_appKey, _adTypes, _pluginVersion) => {
      // Mock implementation that accepts the new pluginVersion parameter
    }),
    isInitialized: jest.fn(() => false),
    show: jest.fn(),
    isLoaded: jest.fn(() => false),
    canShow: jest.fn(() => false),
    hide: jest.fn(),
    cache: jest.fn(),
    setAutoCache: jest.fn(),
    isPrecache: jest.fn(() => false),
    setTabletBanners: jest.fn(),
    setSmartBanners: jest.fn(),
    setBannerAnimation: jest.fn(),
    consentStatus: jest.fn(() => 0),
    revokeConsent: jest.fn(),
    requestConsentInfoUpdateWithAppKey: jest.fn(() =>
      Promise.resolve({ status: 0 })
    ),
    showConsentFormIfNeeded: jest.fn(() => Promise.resolve({ status: 0 })),
    showConsentForm: jest.fn(() => Promise.resolve({ status: 0 })),
    setChildDirectedTreatment: jest.fn(),
    setTesting: jest.fn(),
    setLogLevel: jest.fn(),
    setTriggerPrecacheCallbacks: jest.fn(),
    disableNetwork: jest.fn(),
    getPlatformSdkVersion: jest.fn(() => '1.0.0'),
    setUserId: jest.fn(),
    setExtrasValue: jest.fn(),
    setCustomStateValue: jest.fn(),
    getRewardParameters: jest.fn(() => ({ name: 'test', amount: '10' })),
    predictedEcpm: jest.fn(() => 0),
    trackInAppPurchase: jest.fn(),
    validateAndTrackInAppPurchase: jest.fn(),
    trackEvent: jest.fn(),
    setBidonEndpoint: jest.fn(),
    getBidonEndpoint: jest.fn(() => null),
    eventsNotifyReady: jest.fn(),
    eventsAddListener: jest.fn(),
    eventsRemoveListener: jest.fn(),
    eventsRemoveAllListeners: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    removeAllListeners: jest.fn(),
    setExtrasStringValue: jest.fn(),
    setExtrasIntegerValue: jest.fn(),
    setExtrasDoubleValue: jest.fn(),
    setExtrasArrayValue: jest.fn(),
    setExtrasBooleanValue: jest.fn(),
    setExtrasMapValue: jest.fn(),
    setCustomStateStringValue: jest.fn(),
    setCustomStateIntegerValue: jest.fn(),
    setCustomStateDoubleValue: jest.fn(),
    setCustomStateBooleanValue: jest.fn(),
    setCustomStateMapValue: jest.fn(),
  },
}));

// Mock NativeModules for event emitter
jest.mock('react-native', () => ({
  NativeEventEmitter: jest.fn(() => ({
    addListener: jest.fn(() => ({ remove: jest.fn() })),
  })),
  NativeModules: {
    RNAppodeal: {},
  },
  DeviceEventEmitter: {
    addListener: jest.fn(() => ({ remove: jest.fn() })),
  },
  Platform: {
    OS: 'ios',
  },
  requireNativeComponent: jest.fn(() => {
    const React = require('react');
    return (props: any) =>
      React.createElement('View', { ...props, testID: 'MockNativeComponent' });
  }),
}));

import Appodeal, {
  AppodealAdType,
  AppodealLogLevel,
  AppodealSdkEvents,
  AppodealBannerEvents,
  AppodealInterstitialEvents,
  AppodealRewardedEvents,
} from '../index';

describe('Appodeal SDK', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Main Interface', () => {
    it('should export Appodeal as default', () => {
      expect(Appodeal).toBeDefined();
      expect(typeof Appodeal.initialize).toBe('function');
      expect(typeof Appodeal.show).toBe('function');
      expect(typeof Appodeal.isLoaded).toBe('function');
    });

    it('should have all required API methods', () => {
      const requiredMethods = [
        'initialize',
        'isInitialized',
        'show',
        'isLoaded',
        'canShow',
        'hide',
        'cache',
        'setAutoCache',
        'isPrecache',
        'setTabletBanners',
        'setSmartBanners',
        'setBannerAnimation',
        'consentStatus',
        'revokeConsent',
        'requestConsentInfoUpdate',
        'showConsentFormIfNeeded',
        'showConsentForm',
        'setChildDirectedTreatment',
        'setTesting',
        'setLogLevel',
        'setTriggerPrecacheCallbacks',
        'disableNetwork',
        'getVersion',
        'getPlatformSdkVersion',
        'setUserId',
        'setExtrasValue',
        'setCustomStateValue',
        'getRewardParameters',
        'predictedEcpm',
        'trackInAppPurchase',
        'validateAndTrackInAppPurchase',
        'trackEvent',
        'setBidonEndpoint',
        'getBidonEndpoint',
        'addEventListener',
        'removeEventListener',
        'removeAllListeners',
      ];

      requiredMethods.forEach((method) => {
        expect(typeof Appodeal[method as keyof typeof Appodeal]).toBe(
          'function'
        );
      });
    });
  });

  describe('Constants and Types', () => {
    it('should export AppodealAdType constants', () => {
      expect(AppodealAdType.NONE).toBe(0);
      expect(AppodealAdType.INTERSTITIAL).toBe(1);
      expect(AppodealAdType.BANNER).toBe(4);
      expect(AppodealAdType.REWARDED_VIDEO).toBe(32);
      expect(AppodealAdType.MREC).toBe(256);
    });

    it('should export AppodealLogLevel constants', () => {
      expect(AppodealLogLevel.DEBUG).toBeDefined();
      expect(AppodealLogLevel.VERBOSE).toBeDefined();
      expect(AppodealLogLevel.NONE).toBeDefined();
    });

    it('should export all event namespaces', () => {
      expect(AppodealSdkEvents).toBeDefined();
      expect(AppodealBannerEvents).toBeDefined();
      expect(AppodealInterstitialEvents).toBeDefined();
      expect(AppodealRewardedEvents).toBeDefined();
    });

    it('should export correct SDK event constants', () => {
      expect(AppodealSdkEvents.INITIALIZED).toBe('onAppodealInitialized');
      expect(AppodealSdkEvents.AD_REVENUE).toBe('onAppodealDidReceiveRevenue');
    });

    it('should export correct banner event constants', () => {
      expect(AppodealBannerEvents.LOADED).toBe('onBannerLoaded');
      expect(AppodealBannerEvents.FAILED_TO_LOAD).toBe('onBannerFailedToLoad');
      expect(AppodealBannerEvents.EXPIRED).toBe('onBannerExpired');
      expect(AppodealBannerEvents.SHOWN).toBe('onBannerShown');
      expect(AppodealBannerEvents.CLICKED).toBe('onBannerClicked');
    });

    it('should export correct interstitial event constants', () => {
      expect(AppodealInterstitialEvents.LOADED).toBe('onInterstitialLoaded');
      expect(AppodealInterstitialEvents.FAILED_TO_LOAD).toBe(
        'onInterstitialFailedToLoad'
      );
      expect(AppodealInterstitialEvents.EXPIRED).toBe('onInterstitialExpired');
      expect(AppodealInterstitialEvents.SHOWN).toBe('onInterstitialShown');
      expect(AppodealInterstitialEvents.FAILED_TO_SHOW).toBe(
        'onInterstitialFailedToShow'
      );
      expect(AppodealInterstitialEvents.CLICKED).toBe('onInterstitialClicked');
      expect(AppodealInterstitialEvents.CLOSED).toBe('onInterstitialClosed');
    });

    it('should export correct rewarded video event constants', () => {
      expect(AppodealRewardedEvents.LOADED).toBe('onRewardedVideoLoaded');
      expect(AppodealRewardedEvents.FAILED_TO_LOAD).toBe(
        'onRewardedVideoFailedToLoad'
      );
      expect(AppodealRewardedEvents.EXPIRED).toBe('onRewardedVideoExpired');
      expect(AppodealRewardedEvents.SHOWN).toBe('onRewardedVideoShown');
      expect(AppodealRewardedEvents.FAILED_TO_SHOW).toBe(
        'onRewardedVideoFailedToShow'
      );
      expect(AppodealRewardedEvents.CLOSED).toBe('onRewardedVideoClosed');
      expect(AppodealRewardedEvents.REWARD).toBe('onRewardedVideoFinished');
      expect(AppodealRewardedEvents.CLICKED).toBe('onRewardedVideoClicked');
    });
  });

  describe('Native Method Integration', () => {
    it('should call native methods correctly', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.initialize('test-key', AppodealAdType.INTERSTITIAL);
      expect(mockNativeAppodeal.initialize).toHaveBeenCalledWith(
        'test-key',
        AppodealAdType.INTERSTITIAL,
        expect.any(String)
      );

      Appodeal.show(AppodealAdType.INTERSTITIAL, 'test-placement');
      expect(mockNativeAppodeal.show).toHaveBeenCalledWith(
        AppodealAdType.INTERSTITIAL,
        'test-placement'
      );

      Appodeal.getPlatformSdkVersion();
      expect(mockNativeAppodeal.getPlatformSdkVersion).toHaveBeenCalled();
    });

    it('should return correct plugin version', () => {
      expect(Appodeal.getVersion()).toBe('3.8.1');
    });

    it('should handle consent methods correctly', async () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      await Appodeal.requestConsentInfoUpdate('test-key');
      expect(
        mockNativeAppodeal.requestConsentInfoUpdateWithAppKey
      ).toHaveBeenCalledWith('test-key');

      await Appodeal.showConsentFormIfNeeded();
      expect(mockNativeAppodeal.showConsentFormIfNeeded).toHaveBeenCalled();

      await Appodeal.showConsentForm();
      expect(mockNativeAppodeal.showConsentForm).toHaveBeenCalled();
    });

    it('should handle user data methods', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.setUserId('test-user-123');
      expect(mockNativeAppodeal.setUserId).toHaveBeenCalledWith(
        'test-user-123'
      );
    });

    it('should handle analytics methods', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.getRewardParameters('test-placement');
      expect(mockNativeAppodeal.getRewardParameters).toHaveBeenCalledWith(
        'test-placement'
      );

      Appodeal.predictedEcpm(AppodealAdType.INTERSTITIAL);
      expect(mockNativeAppodeal.predictedEcpm).toHaveBeenCalledWith(
        AppodealAdType.INTERSTITIAL
      );

      Appodeal.trackInAppPurchase(9.99, 'USD');
      expect(mockNativeAppodeal.trackInAppPurchase).toHaveBeenCalledWith(
        9.99,
        'USD'
      );

      Appodeal.trackEvent('test-event', { key: 'value' });
      expect(mockNativeAppodeal.trackEvent).toHaveBeenCalledWith('test-event', {
        key: 'value',
      });
    });

    it('should handle bidon methods', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.setBidonEndpoint('https://test.bidon.com');
      expect(mockNativeAppodeal.setBidonEndpoint).toHaveBeenCalledWith(
        'https://test.bidon.com'
      );

      Appodeal.getBidonEndpoint();
      expect(mockNativeAppodeal.getBidonEndpoint).toHaveBeenCalled();
    });
  });

  describe('Event Listener Management', () => {
    it('should have event listener methods', () => {
      expect(typeof Appodeal.addEventListener).toBe('function');
      expect(typeof Appodeal.removeEventListener).toBe('function');
      expect(typeof Appodeal.removeAllListeners).toBe('function');
    });

    it('should handle event listeners without throwing', () => {
      const mockHandler = jest.fn();

      expect(() => {
        Appodeal.addEventListener('test-event', mockHandler);
        Appodeal.removeEventListener('test-event', mockHandler);
        Appodeal.removeAllListeners();
      }).not.toThrow();
    });

    it('should handle different event types', () => {
      const listener = jest.fn();

      // SDK events
      Appodeal.addEventListener(AppodealSdkEvents.INITIALIZED, listener);
      Appodeal.addEventListener(AppodealSdkEvents.AD_REVENUE, listener);

      // Banner events
      Appodeal.addEventListener(AppodealBannerEvents.LOADED, listener);
      Appodeal.addEventListener(AppodealBannerEvents.CLICKED, listener);

      // Interstitial events
      Appodeal.addEventListener(AppodealInterstitialEvents.LOADED, listener);
      Appodeal.addEventListener(AppodealInterstitialEvents.SHOWN, listener);

      // Rewarded video events
      Appodeal.addEventListener(AppodealRewardedEvents.LOADED, listener);
      Appodeal.addEventListener(AppodealRewardedEvents.REWARD, listener);

      expect(Appodeal.addEventListener).toBeDefined();
    });
  });

  describe('Ad Type Operations', () => {
    it('should handle different ad types', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      // Test different ad types
      Appodeal.show(AppodealAdType.INTERSTITIAL);
      Appodeal.show(AppodealAdType.REWARDED_VIDEO);
      Appodeal.show(AppodealAdType.BANNER);
      Appodeal.show(AppodealAdType.MREC);

      expect(mockNativeAppodeal.show).toHaveBeenCalledTimes(4);
    });

    it('should check ad status correctly', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.isLoaded(AppodealAdType.INTERSTITIAL);
      Appodeal.canShow(AppodealAdType.BANNER);
      Appodeal.isInitialized(AppodealAdType.REWARDED_VIDEO);

      expect(mockNativeAppodeal.isLoaded).toHaveBeenCalledWith(
        AppodealAdType.INTERSTITIAL
      );
      expect(mockNativeAppodeal.canShow).toHaveBeenCalledWith(
        AppodealAdType.BANNER,
        'default'
      );
      expect(mockNativeAppodeal.isInitialized).toHaveBeenCalledWith(
        AppodealAdType.REWARDED_VIDEO
      );
    });

    it('should handle show with placement', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.show(AppodealAdType.BANNER, 'main_menu');
      Appodeal.show(AppodealAdType.INTERSTITIAL, 'level_end');

      expect(mockNativeAppodeal.show).toHaveBeenCalledWith(
        AppodealAdType.BANNER,
        'main_menu'
      );
      expect(mockNativeAppodeal.show).toHaveBeenCalledWith(
        AppodealAdType.INTERSTITIAL,
        'level_end'
      );
    });

    it('should handle canShow with placement', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.canShow(AppodealAdType.BANNER, 'home_screen');
      expect(mockNativeAppodeal.canShow).toHaveBeenCalledWith(
        AppodealAdType.BANNER,
        'home_screen'
      );
    });

    it('should handle cache operations', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.cache(AppodealAdType.INTERSTITIAL);
      Appodeal.setAutoCache(AppodealAdType.BANNER, false);
      Appodeal.isPrecache(AppodealAdType.REWARDED_VIDEO);

      expect(mockNativeAppodeal.cache).toHaveBeenCalledWith(
        AppodealAdType.INTERSTITIAL
      );
      expect(mockNativeAppodeal.setAutoCache).toHaveBeenCalledWith(
        AppodealAdType.BANNER,
        false
      );
      expect(mockNativeAppodeal.isPrecache).toHaveBeenCalledWith(
        AppodealAdType.REWARDED_VIDEO
      );
    });

    it('should handle hide operations', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.hide(AppodealAdType.BANNER);
      Appodeal.hide(AppodealAdType.MREC);

      expect(mockNativeAppodeal.hide).toHaveBeenCalledWith(
        AppodealAdType.BANNER
      );
      expect(mockNativeAppodeal.hide).toHaveBeenCalledWith(AppodealAdType.MREC);
    });
  });

  describe('Configuration Methods', () => {
    it('should handle all banner configuration methods', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.setTabletBanners(true);
      Appodeal.setSmartBanners(false);
      Appodeal.setBannerAnimation(true);

      expect(mockNativeAppodeal.setTabletBanners).toHaveBeenCalledWith(true);
      expect(mockNativeAppodeal.setSmartBanners).toHaveBeenCalledWith(false);
      expect(mockNativeAppodeal.setBannerAnimation).toHaveBeenCalledWith(true);
    });

    it('should handle trigger precache callbacks', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.setTriggerPrecacheCallbacks(AppodealAdType.INTERSTITIAL, true);
      expect(
        mockNativeAppodeal.setTriggerPrecacheCallbacks
      ).toHaveBeenCalledWith(AppodealAdType.INTERSTITIAL, true);
    });

    it('should handle testing and log level', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.setTesting(true);
      Appodeal.setLogLevel(AppodealLogLevel.VERBOSE);

      expect(mockNativeAppodeal.setTesting).toHaveBeenCalledWith(true);
      expect(mockNativeAppodeal.setLogLevel).toHaveBeenCalledWith(
        AppodealLogLevel.VERBOSE
      );
    });
  });

  describe('Revenue and Analytics', () => {
    it('should track events with parameters', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;
      const eventParams = { level: 10, score: 1500 };

      Appodeal.trackEvent('level_complete', eventParams);
      expect(mockNativeAppodeal.trackEvent).toHaveBeenCalledWith(
        'level_complete',
        eventParams
      );
    });

    it('should get predicted eCPM', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.predictedEcpm(AppodealAdType.BANNER);
      expect(mockNativeAppodeal.predictedEcpm).toHaveBeenCalledWith(
        AppodealAdType.BANNER
      );
    });

    it('should track in-app purchases', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.trackInAppPurchase(0.99, 'USD');
      expect(mockNativeAppodeal.trackInAppPurchase).toHaveBeenCalledWith(
        0.99,
        'USD'
      );
    });
  });

  describe('Network Management', () => {
    it('should disable network for all ad types', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.disableNetwork('admob');
      expect(mockNativeAppodeal.disableNetwork).toHaveBeenCalledWith(
        'admob',
        AppodealAdType.ALL
      );
    });

    it('should disable network for specific ad type', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.disableNetwork('facebook', AppodealAdType.BANNER);
      expect(mockNativeAppodeal.disableNetwork).toHaveBeenCalledWith(
        'facebook',
        AppodealAdType.BANNER
      );
    });
  });

  describe('Extra Data Methods', () => {
    it('should handle setExtrasValue', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.setExtrasValue('user_name', 'test');
      Appodeal.setExtrasValue('user_age', 123);
      Appodeal.setExtrasValue('session_duration', 45.67);
      Appodeal.setExtrasValue('is_premium', true);

      expect(mockNativeAppodeal.setExtrasStringValue).toHaveBeenCalledWith(
        'user_name',
        'test'
      );
      expect(mockNativeAppodeal.setExtrasIntegerValue).toHaveBeenCalledWith(
        'user_age',
        123
      );
      expect(mockNativeAppodeal.setExtrasDoubleValue).toHaveBeenCalledWith(
        'session_duration',
        45.67
      );
      expect(mockNativeAppodeal.setExtrasBooleanValue).toHaveBeenCalledWith(
        'is_premium',
        true
      );
    });

    it('should handle setCustomStateValue', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;

      Appodeal.setCustomStateValue('user_level', 5);
      Appodeal.setCustomStateValue('is_premium_user', true);

      expect(
        mockNativeAppodeal.setCustomStateIntegerValue
      ).toHaveBeenCalledWith('user_level', 5);
      expect(
        mockNativeAppodeal.setCustomStateBooleanValue
      ).toHaveBeenCalledWith('is_premium_user', true);
    });
  });

  describe('Reward Parameters', () => {
    it('should get reward parameters', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;
      mockNativeAppodeal.getRewardParameters.mockReturnValueOnce({
        name: 'coins',
        amount: '100',
      });

      const reward = Appodeal.getRewardParameters();
      expect(reward).toEqual({ name: 'coins', amount: '100' });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty strings', () => {
      expect(() => Appodeal.initialize('', AppodealAdType.ALL)).not.toThrow();
      expect(() => Appodeal.setUserId('')).not.toThrow();
      expect(() => Appodeal.show(AppodealAdType.BANNER, '')).not.toThrow();
    });

    it('should handle null/undefined values gracefully', () => {
      expect(() =>
        Appodeal.show(AppodealAdType.BANNER, undefined as any)
      ).not.toThrow();
      expect(() => Appodeal.trackEvent('test')).not.toThrow();
    });

    it('should handle combined ad types', () => {
      const mockNativeAppodeal =
        require('../specs/NativeAppodealModule').default;
      const combinedTypes = AppodealAdType.BANNER | AppodealAdType.INTERSTITIAL;

      Appodeal.initialize('test-key', combinedTypes);
      Appodeal.cache(combinedTypes);
      Appodeal.setAutoCache(combinedTypes, true);

      expect(mockNativeAppodeal.initialize).toHaveBeenCalledWith(
        'test-key',
        combinedTypes,
        '3.8.1'
      );
      expect(mockNativeAppodeal.cache).toHaveBeenCalledWith(combinedTypes);
      expect(mockNativeAppodeal.setAutoCache).toHaveBeenCalledWith(
        combinedTypes,
        true
      );
    });
  });
});
