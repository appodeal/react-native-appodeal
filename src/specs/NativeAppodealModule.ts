import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { UnsafeObject } from 'react-native/Libraries/Types/CodegenTypes';
import type { AppodealPurchaseValidationResult } from '../types/AppodealPurchaseValidationResult';

export interface Spec extends TurboModule {
  // Basic initialization
  initialize(appKey: string, adTypes: number, pluginVersion: string): void;
  isInitialized(adTypes: number): boolean;

  // Ad display and management
  show(adTypes: number, placement: string): void;
  isLoaded(adTypes: number): boolean;
  canShow(adTypes: number, placement: string): boolean;
  hide(adTypes: number): void;

  // Caching
  cache(adTypes: number): void;
  setAutoCache(adTypes: number, value: boolean): void;
  isPrecache(adTypes: number): boolean;

  // Banner settings
  setTabletBanners(value: boolean): void;
  setSmartBanners(value: boolean): void;
  setBannerAnimation(value: boolean): void;

  // Consent management
  consentStatus(): number;
  revokeConsent(): void;
  requestConsentInfoUpdateWithAppKey(
    appKey: string
  ): Promise<{ status: number }>;
  showConsentFormIfNeeded(): Promise<{ status: number }>;
  showConsentForm(): Promise<{ status: number }>;

  // Configuration
  setChildDirectedTreatment(value: boolean): void;
  setTesting(value: boolean): void;
  setLogLevel(value: string): void;
  setTriggerPrecacheCallbacks(adTypes: number, value: boolean): void;
  disableNetwork(network: string, adTypes: number): void;

  // SDK info
  getPlatformSdkVersion(): string;

  // User management
  setUserId(id: string): void;

  // Extras and custom state
  setExtrasStringValue(key: string, value: string): void;
  setExtrasIntegerValue(key: string, value: number): void;
  setExtrasDoubleValue(key: string, value: number): void;
  setExtrasBooleanValue(key: string, value: boolean): void;
  setExtrasMapValue(key: string, value: UnsafeObject): void;
  removeExtrasValue(key: string): void;

  setCustomStateStringValue(key: string, value: string): void;
  setCustomStateIntegerValue(key: string, value: number): void;
  setCustomStateDoubleValue(key: string, value: number): void;
  setCustomStateBooleanValue(key: string, value: boolean): void;
  setCustomStateMapValue(key: string, value: UnsafeObject): void;
  removeCustomStateValue(key: string): void;

  // Rewards
  getRewardParameters(placement: string): { name: string; amount: string };

  // Analytics
  predictedEcpm(adType: number): number;
  trackInAppPurchase(amount: number, currency: string): void;
  validateAndTrackInAppPurchase(
    purchase: UnsafeObject
  ): Promise<AppodealPurchaseValidationResult>;
  trackEvent(name: string, parameters: UnsafeObject): void;

  // Bidon
  setBidonEndpoint(endpoint: string): void;
  getBidonEndpoint(): string | null;

  // Event management
  eventsNotifyReady(ready: boolean): void;
  eventsAddListener(eventName: string): void;
  eventsRemoveListener(eventName: string, all: boolean): void;
  eventsGetListeners(): Promise<UnsafeObject>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNAppodeal');
