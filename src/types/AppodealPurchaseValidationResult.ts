/**
 * Result of in-app purchase validation
 *
 * This interface represents the result returned after validating an in-app purchase
 * with the Appodeal SDK. Contains all the validated purchase information.
 */
export interface AppodealPurchaseValidationResult {
  /** Public key used for validation */
  publicKey: string;
  /** Purchase signature for verification */
  signature: string;
  /** Purchase data in JSON format */
  purchaseData: string;
  /** Purchase token for tracking */
  purchaseToken: string;
  /** Purchase timestamp in milliseconds */
  timestamp: number;
  /** Developer payload for additional data */
  developerPayload: string;
  /** Order ID for the purchase */
  orderId: string;
  /** Product SKU identifier */
  sku: string;
  /** Purchase price as string */
  price: string;
  /** Currency code (e.g., USD, EUR) */
  currency: string;
  /** Product type (consumable, non-consumable, subscription) */
  productType: number;
}
