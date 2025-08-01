/**
 * Appodeal Purchase Types
 *
 * Contains all in-app purchase related type definitions for iOS and Android
 * purchase validation and tracking.
 */

/**
 * Generic map type for additional parameters
 */
export type Map = { [key: string]: any };

/**
 * iOS purchase types for validation
 */
export enum AppodealIOSPurchaseType {
  CONSUMABLE = 0,
  NON_CONSUMABLE = 1,
  AUTO_RENEWABLE_SUBSCRIPTION = 2,
  NON_RENEWING_SUBSCRIPTION = 3,
}

/**
 * iOS in-app purchase validation parameters
 */
export interface AppodealIOSPurchase {
  productId: string;
  productType: AppodealIOSPurchaseType;
  price: number;
  currency: string;
  transactionId: string;
  additionalParameters: Map | null;
}

/**
 * Android purchase types for validation
 */
export enum AppodealAndroidPurchaseType {
  IN_APP = 0,
  SUBSCRIPTION = 1,
}

/**
 * Android in-app purchase validation parameters
 */
export interface AppodealAndroidPurchase {
  publicKey: string;
  productType: AppodealAndroidPurchaseType;
  signature: string;
  purchaseData: string;
  purchaseToken: string;
  timestamp: number;
  developerPayload: string;
  price: string;
  currency: string;
  orderId: string;
  sku: string;
  additionalParameters: Map | null;
}
