package com.appodeal.rnappodeal.ext

import com.appodeal.consent.ConsentStatus
import com.appodeal.consent.PrivacyOptionsRequirementStatus

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

    /**
     * Converts PrivacyOptionsRequirementStatus to React Native integer representation.
     * Mirrors the JS `AppodealPrivacyOptionsStatus` enum.
     */
    internal fun PrivacyOptionsRequirementStatus.toRNValue(): Int = when (this) {
        PrivacyOptionsRequirementStatus.Required -> PRIVACY_OPTIONS_STATUS_REQUIRED
        PrivacyOptionsRequirementStatus.NotRequired -> PRIVACY_OPTIONS_STATUS_NOT_REQUIRED
        else -> PRIVACY_OPTIONS_STATUS_UNKNOWN
    }

    /**
     * Converts PrivacyOptionsRequirementStatus to React Native double representation.
     */
    internal fun PrivacyOptionsRequirementStatus.toRNDouble(): Double = toRNValue().toDouble()

    // MARK: - Private Constants

    private const val CONSENT_STATUS_REQUIRED = 1
    private const val CONSENT_STATUS_NOT_REQUIRED = 2
    private const val CONSENT_STATUS_OBTAINED = 3
    private const val CONSENT_STATUS_UNKNOWN = 0

    private const val PRIVACY_OPTIONS_STATUS_UNKNOWN = 0
    private const val PRIVACY_OPTIONS_STATUS_REQUIRED = 1
    private const val PRIVACY_OPTIONS_STATUS_NOT_REQUIRED = 2
} 