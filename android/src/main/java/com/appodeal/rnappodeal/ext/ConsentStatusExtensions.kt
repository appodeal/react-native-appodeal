package com.appodeal.rnappodeal.ext

import com.appodeal.consent.ConsentStatus

/**
 * Extension functions for Appodeal ConsentStatus.
 * These extensions provide convenient conversions between ConsentStatus and React Native types.
 */
internal object ConsentStatusExtensions {

    /**
     * Converts ConsentStatus to React Native integer representation.
     * @param com.appodeal.consent.ConsentManager.status The ConsentStatus to convert
     * @return Integer representation for React Native
     */
    internal fun ConsentStatus.toRNValue(): Int = when (this) {
        ConsentStatus.Required -> CONSENT_STATUS_REQUIRED
        ConsentStatus.NotRequired -> CONSENT_STATUS_NOT_REQUIRED
        ConsentStatus.Obtained -> CONSENT_STATUS_OBTAINED
        else -> CONSENT_STATUS_UNKNOWN
    }

    /**
     * Converts ConsentStatus to React Native double representation.
     * @param com.appodeal.consent.ConsentManager.status The ConsentStatus to convert
     * @return Double representation for React Native compatibility
     */
    internal fun ConsentStatus.toRNDouble(): Double = toRNValue().toDouble()

    // MARK: - Private Constants

    private const val CONSENT_STATUS_REQUIRED = 1
    private const val CONSENT_STATUS_NOT_REQUIRED = 2
    private const val CONSENT_STATUS_OBTAINED = 3
    private const val CONSENT_STATUS_UNKNOWN = 0
} 