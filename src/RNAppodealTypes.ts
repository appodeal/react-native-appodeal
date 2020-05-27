'use strict';

export interface AdTypeType {
  readonly NONE: number,
  readonly BANNER: number,
  readonly INTERSTITIAL: number,
  readonly BANNER_BOTTOM: number,
  readonly BANNER_TOP: number,
  readonly REWARDED_VIDEO: number,
  readonly NON_SKIPPABLE_VIDEO: number
  readonly MREC: number
}

export const AppodealAdType: AdTypeType = {
  NONE: 0,
  INTERSTITIAL: 1 << 0,
  BANNER: 1 << 2,
  BANNER_BOTTOM: 1 << 3,
  BANNER_TOP: 1 << 4,
  REWARDED_VIDEO: 1 << 5,
  NON_SKIPPABLE_VIDEO: 1 << 6,
  MREC: 1 << 8.
}

export enum AppodealLogLevel {
  NONE = 'none',
  DEBUG = 'debug',
  VERBOSE = 'verbose'
}

export enum AppodealGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum AppodealConsentStatus {
  UNKNOWN = 0,
  NON_PERSONALIZED = 1,
  PARTLY_PERSONALIZED = 2,
  PERSONALIZED = 3
}

export enum AppodealConsentRegulation {
  UNKNOWN = 0,
  NONE = 1,
  GDPR = 2,
  CCPA = 3
}