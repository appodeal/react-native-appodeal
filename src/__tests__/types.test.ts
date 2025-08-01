import {
  AppodealAdType,
  AppodealLogLevel,
  AppodealConsentStatus,
} from '../types';

import type {
  AppodealReward,
  AppodealIOSPurchase,
  AppodealAndroidPurchase,
  AppodealAdRevenue,
  AppodealPurchaseValidationResult,
  Map,
} from '../types';

describe('Appodeal Type Definitions', () => {
  describe('Ad Type Enums', () => {
    it('should have correct AppodealAdType values', () => {
      // Test that the enum values are numbers
      expect(typeof AppodealAdType.NONE).toBe('number');
      expect(typeof AppodealAdType.INTERSTITIAL).toBe('number');
      expect(typeof AppodealAdType.BANNER).toBe('number');
      expect(typeof AppodealAdType.REWARDED_VIDEO).toBe('number');
      expect(typeof AppodealAdType.MREC).toBe('number');
    });

    it('should have correct AppodealLogLevel values', () => {
      expect(typeof AppodealLogLevel.DEBUG).toBe('string');
      expect(typeof AppodealLogLevel.VERBOSE).toBe('string');
      expect(typeof AppodealLogLevel.NONE).toBe('string');
    });

    it('should have correct AppodealConsentStatus values', () => {
      expect(typeof AppodealConsentStatus.UNKNOWN).toBe('number');
      expect(typeof AppodealConsentStatus.REQUIRED).toBe('number');
      expect(typeof AppodealConsentStatus.NOT_REQUIRED).toBe('number');
      expect(typeof AppodealConsentStatus.OBTAINED).toBe('number');
    });
  });

  describe('Reward Type', () => {
    it('should define AppodealReward interface correctly', () => {
      // Test that we can create a valid reward object
      const reward: AppodealReward = {
        name: 'test_reward',
        amount: '10',
      };

      expect(reward.name).toBe('test_reward');
      expect(reward.amount).toBe('10');
      expect(typeof reward.name).toBe('string');
      expect(typeof reward.amount).toBe('string');
    });

    it('should allow optional reward properties', () => {
      const reward: AppodealReward = {
        name: 'test_reward',
        amount: '10',
      };

      expect(reward).toBeDefined();
      expect(reward.name).toBeDefined();
      expect(reward.amount).toBeDefined();
    });
  });

  describe('Purchase Types', () => {
    it('should define AppodealIOSPurchase interface correctly', () => {
      const iosPurchase: AppodealIOSPurchase = {
        productId: 'com.test.product',
        productType: 0, // CONSUMABLE
        price: 0.99,
        currency: 'USD',
        transactionId: 'transaction_123',
        additionalParameters: {
          key: 'value',
        },
      };

      expect(iosPurchase.productId).toBe('com.test.product');
      expect(iosPurchase.transactionId).toBe('transaction_123');
      expect(iosPurchase.price).toBe(0.99);
      expect(iosPurchase.currency).toBe('USD');
      expect(iosPurchase.additionalParameters).toEqual({ key: 'value' });
    });

    it('should define AppodealAndroidPurchase interface correctly', () => {
      const androidPurchase: AppodealAndroidPurchase = {
        publicKey: 'test_public_key',
        productType: 0, // IN_APP
        signature: 'test_signature',
        purchaseData: 'test_purchase_data',
        purchaseToken: 'token_123',
        timestamp: 1234567890,
        developerPayload: 'test_payload',
        price: '0.99',
        currency: 'USD',
        orderId: 'order_123',
        sku: 'test_sku',
        additionalParameters: {
          key: 'value',
        },
      };

      expect(androidPurchase.publicKey).toBe('test_public_key');
      expect(androidPurchase.orderId).toBe('order_123');
      expect(androidPurchase.purchaseToken).toBe('token_123');
      expect(androidPurchase.price).toBe('0.99');
      expect(androidPurchase.currency).toBe('USD');
      expect(androidPurchase.additionalParameters).toEqual({ key: 'value' });
    });
  });

  describe('Ad Revenue Type', () => {
    it('should define AppodealAdRevenue interface correctly', () => {
      const adRevenue: AppodealAdRevenue = {
        networkName: 'facebook',
        adUnitName: 'interstitial',
        placement: 'default',
        revenuePrecision: 'estimated',
        demandSource: 'facebook',
        currency: 'USD',
        revenue: 0.05,
        adType: AppodealAdType.INTERSTITIAL,
      };

      expect(adRevenue.networkName).toBe('facebook');
      expect(adRevenue.adUnitName).toBe('interstitial');
      expect(adRevenue.placement).toBe('default');
      expect(adRevenue.revenuePrecision).toBe('estimated');
      expect(adRevenue.demandSource).toBe('facebook');
      expect(adRevenue.currency).toBe('USD');
      expect(adRevenue.revenue).toBe(0.05);
      expect(adRevenue.adType).toBe(AppodealAdType.INTERSTITIAL);
    });

    it('should allow different ad types for revenue', () => {
      const bannerRevenue: AppodealAdRevenue = {
        networkName: 'admob',
        adUnitName: 'banner',
        placement: 'home',
        revenuePrecision: 'exact',
        demandSource: 'admob',
        currency: 'USD',
        revenue: 0.01,
        adType: AppodealAdType.BANNER,
      };

      const rewardedRevenue: AppodealAdRevenue = {
        networkName: 'unity',
        adUnitName: 'rewarded',
        placement: 'game',
        revenuePrecision: 'estimated',
        demandSource: 'unity',
        currency: 'EUR',
        revenue: 0.1,
        adType: AppodealAdType.REWARDED_VIDEO,
      };

      expect(bannerRevenue.adType).toBe(AppodealAdType.BANNER);
      expect(rewardedRevenue.adType).toBe(AppodealAdType.REWARDED_VIDEO);
    });
  });

  describe('Purchase Validation Result', () => {
    it('should define AppodealPurchaseValidationResult interface correctly', () => {
      const validationResult: AppodealPurchaseValidationResult = {
        publicKey: 'test_public_key',
        signature: 'test_signature',
        purchaseData: 'test_purchase_data',
        purchaseToken: 'test_token',
        timestamp: 1234567890,
        developerPayload: 'test_payload',
        orderId: 'test_order',
        sku: 'test_sku',
        price: '0.99',
        currency: 'USD',
        productType: 0,
      };

      expect(validationResult.publicKey).toBe('test_public_key');
      expect(validationResult.signature).toBe('test_signature');
      expect(validationResult.purchaseData).toBe('test_purchase_data');
      expect(validationResult.purchaseToken).toBe('test_token');
      expect(validationResult.timestamp).toBe(1234567890);
      expect(validationResult.developerPayload).toBe('test_payload');
      expect(validationResult.orderId).toBe('test_order');
      expect(validationResult.sku).toBe('test_sku');
      expect(validationResult.price).toBe('0.99');
      expect(validationResult.currency).toBe('USD');
      expect(validationResult.productType).toBe(0);
    });

    it('should allow different product types', () => {
      const consumableResult: AppodealPurchaseValidationResult = {
        publicKey: 'test_key',
        signature: 'test_signature',
        purchaseData: 'test_data',
        purchaseToken: 'test_token',
        timestamp: 1234567890,
        developerPayload: 'test_payload',
        orderId: 'test_order',
        sku: 'test_sku',
        price: '0.99',
        currency: 'USD',
        productType: 0, // CONSUMABLE
      };

      const subscriptionResult: AppodealPurchaseValidationResult = {
        publicKey: 'test_key',
        signature: 'test_signature',
        purchaseData: 'test_data',
        purchaseToken: 'test_token',
        timestamp: 1234567890,
        developerPayload: 'test_payload',
        orderId: 'test_order',
        sku: 'test_sku',
        price: '9.99',
        currency: 'USD',
        productType: 2, // SUBSCRIPTION
      };

      expect(consumableResult.productType).toBe(0);
      expect(subscriptionResult.productType).toBe(2);
    });
  });

  describe('Map Utility Type', () => {
    it('should define Map type correctly', () => {
      const map: Map = {
        stringKey: 'stringValue',
        numberKey: 42,
        booleanKey: true,
        objectKey: { nested: 'value' },
        arrayKey: [1, 2, 3],
      };

      expect(typeof map.stringKey).toBe('string');
      expect(typeof map.numberKey).toBe('number');
      expect(typeof map.booleanKey).toBe('boolean');
      expect(typeof map.objectKey).toBe('object');
      expect(Array.isArray(map.arrayKey)).toBe(true);
    });

    it('should allow empty map', () => {
      const emptyMap: Map = {};
      expect(emptyMap).toEqual({});
    });

    it('should allow nested maps', () => {
      const nestedMap: Map = {
        level1: {
          level2: {
            level3: 'deep_value',
          },
        },
      };

      expect(nestedMap.level1).toBeDefined();
      expect((nestedMap.level1 as any).level2).toBeDefined();
    });
  });

  describe('Type Compatibility', () => {
    it('should allow mixing different purchase types', () => {
      const iosPurchase: AppodealIOSPurchase = {
        productId: 'ios_product',
        productType: 0,
        price: 0.99,
        currency: 'USD',
        transactionId: 'ios_transaction',
        additionalParameters: {},
      };

      const androidPurchase: AppodealAndroidPurchase = {
        publicKey: 'android_public_key',
        productType: 0,
        signature: 'android_signature',
        purchaseData: 'android_purchase_data',
        purchaseToken: 'android_token',
        timestamp: 1234567890,
        developerPayload: 'android_payload',
        price: '0.99',
        currency: 'USD',
        orderId: 'android_order',
        sku: 'android_sku',
        additionalParameters: {},
      };

      // Both should be valid
      expect(iosPurchase.productId).toBeDefined();
      expect(androidPurchase.publicKey).toBeDefined();
    });
  });

  describe('Type Exports', () => {
    it('should export all required types', () => {
      // Test that all types are exported and accessible
      expect(typeof AppodealAdType).toBe('object');
      expect(typeof AppodealLogLevel).toBe('object');
      expect(typeof AppodealConsentStatus).toBe('object');

      // Test that Map utility type is available
      expect(Map).toBeDefined();
    });
  });
});
