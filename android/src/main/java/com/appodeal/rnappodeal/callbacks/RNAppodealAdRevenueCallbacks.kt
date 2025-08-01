package com.appodeal.rnappodeal.callbacks

import com.appodeal.ads.revenue.AdRevenueCallbacks
import com.appodeal.ads.revenue.RevenueInfo
import com.appodeal.rnappodeal.RNAEventDispatcher
import com.appodeal.rnappodeal.ext.AdTypeExtensions.toRNTypes

import com.facebook.react.bridge.Arguments

/**
 * Callback handler for Appodeal ad revenue events.
 *
 * This class implements the AdRevenueCallbacks interface and forwards revenue events
 * to React Native through the event dispatcher. It handles revenue tracking for all ad types
 * and provides detailed revenue information including network, placement, and currency data.
 *
 * @param eventDispatcher The RNAEventDispatcher instance used for advanced event management
 */
internal class RNAppodealAdRevenueCallbacks(
    private val eventDispatcher: RNAEventDispatcher
) : AdRevenueCallbacks {

    /**
     * Called when ad revenue is received from any ad type.
     *
     * This method is triggered whenever an ad generates revenue, providing detailed
     * information about the revenue event including network, placement, currency, and amount.
     * The revenue data is converted to React Native format and emitted as an event.
     *
     * @param revenueInfo The RevenueInfo object containing detailed revenue data
     */
    override fun onAdRevenueReceive(revenueInfo: RevenueInfo) {
        val params = Arguments.createMap().apply {
            putString("networkName", revenueInfo.networkName)
            putString("adUnitName", revenueInfo.adUnitName)
            putString("placement", revenueInfo.placement)
            putString("revenuePrecision", revenueInfo.revenuePrecision)
            putString("demandSource", revenueInfo.demandSource)
            putString("currency", revenueInfo.currency)
            putDouble("revenue", revenueInfo.revenue)
            putDouble("adType", revenueInfo.adType.toRNTypes().toDouble())
        }
        eventDispatcher.dispatchEvent("onAppodealDidReceiveRevenue", params)
    }
} 