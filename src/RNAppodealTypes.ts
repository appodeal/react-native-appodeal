'use strict';

export interface AdTypeType {
  readonly NONE: number,
  readonly BANNER: number,
  readonly INTERSTITIAL: number,
  readonly BANNER_BOTTOM: number,
  readonly BANNER_TOP: number,
  readonly REWARDED_VIDEO: number,
  readonly MREC: number
}

type Map = { [key: string]: any };

export const AppodealAdType: AdTypeType = {
  NONE: 0,
  INTERSTITIAL: 1 << 0,
  BANNER: 1 << 2,
  BANNER_BOTTOM: 1 << 3,
  BANNER_TOP: 1 << 4,
  REWARDED_VIDEO: 1 << 5,
  MREC: 1 << 8.
}

export enum AppodealLogLevel {
  NONE = 'none',
  DEBUG = 'debug',
  VERBOSE = 'verbose'
}

export enum AppodealGender {
  OTHER = 0,
  FEMALE = 1,
  MALE = 2,
}

export enum AppodealGDPRConsentStatus {
  UNKNOWN = 0,
  PERSONALIZED = 1,
  NON_PERSONALIZED = 2
}

export enum AppodealCCPAConsentStatus {
  UNKNOWN = 0,
  OPT_IN = 1,
  OPT_OUT = 2,
}

export interface AppodealReward {
  name: string,
  amount: string
}

export interface AppodealIOSPurchase {
  productId: string,
  productType: AppodealIOSPurchaseType,
  price: number,
  currency: string,
  transactionId: string,
  additionalParameters: Map | null
}

export enum AppodealIOSPurchaseType {
  CONSUMABLE = 0,
  NON_CONSUMABLE = 1,
  AUTO_RENEWABLE_SUBSCRIPTION = 2,
  NON_RENEWING_SUBSCRIPTION = 3
}

export interface AppodealAndroidPurchase {
  publicKey: string,
  productType: AppodealAndroidPurchaseType,
  signature: string,
  purchaseData: string,
  purchaseToken: string,
  timestamp: number,
  developerPayload: string,
  price: string,
  currency: string,
  orderId: string,
  sku: string,
  additionalParameters: Map | null
}

export enum AppodealAndroidPurchaseType {
  IN_APP = 0,
  SUBSCRIPTION = 1
}