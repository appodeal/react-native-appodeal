package com.appodeal.rnappodeal

import com.appodeal.ads.NativeAd
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

internal object RNAppodealNativeAdStore {

    private val ads = ConcurrentHashMap<String, NativeAd>()

    fun putAds(ads: List<NativeAd>): List<WritableMap> {
        return ads.map { ad ->
            val id = UUID.randomUUID().toString()
            this.ads[id] = ad
            ad.toWritableMap(id)
        }
    }

    fun get(id: String): NativeAd? = ads[id]

    fun remove(id: String) {
        ads.remove(id)
    }

    private fun NativeAd.toWritableMap(id: String): WritableMap {
        return Arguments.createMap().apply {
            putString("id", id)
            putString("title", title.orEmpty())
            putString("description", description.orEmpty())
            putString("callToAction", callToAction.orEmpty())
            putDouble("rating", rating.toDouble())
            putBoolean("containsVideo", containsVideo())
            putDouble("predictedEcpm", predictedEcpm)
        }
    }
}
