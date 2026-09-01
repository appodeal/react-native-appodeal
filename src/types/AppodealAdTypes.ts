/**
 * Appodeal Ad Types
 *
 * Contains all ad-related type definitions including ad types, revenue tracking,
 * and ad unit information.
 */

/**
 * Ad type bit flags for combining multiple ad types
 * Use bitwise OR (|) to combine multiple ad types
 */
export enum AppodealAdType {
  NONE = 0,
  INTERSTITIAL = 1 << 0, // 1
  BANNER = 1 << 2, // 4
  BANNER_BOTTOM = 1 << 3, // 8
  BANNER_TOP = 1 << 4, // 16
  REWARDED_VIDEO = 1 << 5, // 32
  NATIVE = 1 << 7, // 128
  MREC = 1 << 8, // 256
  ALL = INTERSTITIAL |
    BANNER |
    BANNER_BOTTOM |
    BANNER_TOP |
    REWARDED_VIDEO |
    NATIVE |
    MREC,
}

/**
 * Preferred media content type for native ads
 */
export type AppodealNativeContentType = 'auto' | 'noVideo' | 'video';

/**
 * Native ad template used by AppodealNative view (stock SDK templates).
 * Custom layouts use AppodealNativeAdView + asset children instead.
 */
export type AppodealNativeTemplate = 'newsFeed' | 'appWall' | 'contentStream';

/**
 * Metadata for a cached native ad pulled from the SDK
 */
export interface AppodealNativeAdInfo {
  id: string;
  title: string;
  description: string;
  callToAction: string;
  rating: number;
  containsVideo: boolean;
  predictedEcpm: number;
}

/**
 * Ad revenue information for analytics
 */
export interface AppodealAdRevenue {
  networkName: string;
  adUnitName: string;
  placement: string;
  revenuePrecision: string;
  demandSource: string;
  currency: string;
  revenue: number;
  adType: AppodealAdType;
}
