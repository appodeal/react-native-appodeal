package com.appodeal.rnappodeal.ext

import com.appodeal.ads.inapp.InAppPurchase

/**
 * Extension functions for Appodeal purchase type conversions.
 * These extensions provide convenient conversions between React Native integers and InAppPurchase.Type.
 */
internal object PurchaseTypeExtensions {

    /**
     * Converts React Native purchase type integer to Appodeal InAppPurchase.Type.
     * @param type Integer representing purchase type (0 = InApp, 1 = Subs)
     * @return Appodeal InAppPurchase.Type enum
     */
    internal fun Int.toPurchaseType(): InAppPurchase.Type = when (this) {
        PURCHASE_TYPE_IN_APP -> InAppPurchase.Type.InApp
        PURCHASE_TYPE_SUBS -> InAppPurchase.Type.Subs
        else -> InAppPurchase.Type.InApp // Default to InApp for unknown types
    }

    /**
     * Converts Appodeal InAppPurchase.Type to React Native purchase type integer.
     * @param type Appodeal InAppPurchase.Type enum
     * @return Integer representation of purchase type
     */
    internal fun InAppPurchase.Type.toRNValue(): Int = when (this) {
        InAppPurchase.Type.InApp -> PURCHASE_TYPE_IN_APP
        InAppPurchase.Type.Subs -> PURCHASE_TYPE_SUBS
    }

    // MARK: - Private Constants

    private const val PURCHASE_TYPE_IN_APP = 0
    private const val PURCHASE_TYPE_SUBS = 1
} 