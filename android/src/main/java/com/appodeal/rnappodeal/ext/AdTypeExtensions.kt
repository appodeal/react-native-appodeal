package com.appodeal.rnappodeal.ext

import com.appodeal.ads.Appodeal

/**
 * Extension functions for Appodeal ad type conversions.
 * These extensions provide convenient conversions between React Native and Appodeal ad types.
 */
internal object AdTypeExtensions {

    /**
     * Converts React Native ad type flags to Appodeal ad type flags.
     * @param types Bit flags representing React Native ad types
     * @return Appodeal ad type flags
     */
    internal fun Double.toAppodealTypes(): Int {
        val types = this.toInt()
        var result = 0

        // Use bitwise operations with constants for better readability
        if (types.hasFlag(INTERSTITIAL_FLAG)) result = result or Appodeal.INTERSTITIAL
        if (types.hasFlag(BANNER_FLAG)) result = result or Appodeal.BANNER
        if (types.hasFlag(BANNER_BOTTOM_FLAG)) result = result or Appodeal.BANNER_BOTTOM
        if (types.hasFlag(BANNER_TOP_FLAG)) result = result or Appodeal.BANNER_TOP
        if (types.hasFlag(REWARDED_VIDEO_FLAG)) result = result or Appodeal.REWARDED_VIDEO
        if (types.hasFlag(MREC_FLAG)) result = result or Appodeal.MREC

        return result
    }

    /**
     * Converts Appodeal ad type flags to React Native ad type flags.
     * @param types Appodeal ad type flags
     * @return React Native ad type flags
     */
    internal fun Int.toRNTypes(): Int {
        var result = 0

        if (this.hasFlag(Appodeal.INTERSTITIAL)) result = result or INTERSTITIAL_FLAG
        if (this.hasFlag(Appodeal.BANNER)) result = result or BANNER_FLAG
        if (this.hasFlag(Appodeal.BANNER_BOTTOM)) result = result or BANNER_BOTTOM_FLAG
        if (this.hasFlag(Appodeal.BANNER_TOP)) result = result or BANNER_TOP_FLAG
        if (this.hasFlag(Appodeal.REWARDED_VIDEO)) result = result or REWARDED_VIDEO_FLAG
        if (this.hasFlag(Appodeal.MREC)) result = result or MREC_FLAG

        return result
    }

    /**
     * Extension function to check if a bit flag is set.
     * @param flag The flag to check
     * @return true if the flag is set, false otherwise
     */
    private fun Int.hasFlag(flag: Int): Boolean = (this and flag) > 0

    // MARK: - Private Constants

    private const val INTERSTITIAL_FLAG = 1 shl 0
    private const val BANNER_FLAG = 1 shl 2
    private const val BANNER_BOTTOM_FLAG = 1 shl 3
    private const val BANNER_TOP_FLAG = 1 shl 4
    private const val REWARDED_VIDEO_FLAG = 1 shl 5
    private const val MREC_FLAG = 1 shl 8
} 