package com.appodeal.rnappodeal

import android.app.Activity
import android.content.Context
import android.util.Log
import com.appodeal.consent.ConsentForm
import com.appodeal.consent.ConsentInfoUpdateCallback
import com.appodeal.consent.ConsentManager
import com.appodeal.consent.ConsentManagerError
import com.appodeal.consent.ConsentUpdateRequestParameters
import com.appodeal.consent.OnConsentFormDismissedListener
import com.appodeal.consent.OnConsentFormLoadFailureListener
import com.appodeal.consent.OnConsentFormLoadSuccessListener
import com.appodeal.rnappodeal.ext.ConsentStatusExtensions.toRNDouble
import com.appodeal.rnappodeal.ext.ConsentStatusExtensions.toRNValue
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap

/**
 * Internal class for handling Appodeal consent operations.
 * This class encapsulates all consent-related functionality and callback handling.
 */
internal class RNAppodealConsent {

    companion object {
        private const val TAG = "RNAppodealConsent"

        private const val ERROR_CONSENT_INFO_UPDATE = "APD_REQUEST_CONSENT_INFO_UPDATE_ERROR"
        private const val ERROR_CONSENT_FORM_IF_NEEDED = "APD_SHOW_CONSENT_FORM_IF_NEEDED_ERROR"
        private const val ERROR_CONSENT_FORM = "APD_SHOW_CONSENT_FORM_ERROR"
    }

    /**
     * Creates a consent status response map.
     * @return WritableMap with consent status
     */
    private fun createConsentStatusResponse(): WritableMap {
        return Arguments.createMap().apply {
            putInt("status", ConsentManager.status.toRNValue())
        }
    }

    /**
     * Requests consent info update with the provided app key.
     * @param activity The current activity
     * @param appKey The Appodeal app key
     * @param promise The React Native promise to resolve/reject
     */
    fun requestConsentInfoUpdate(activity: Activity, appKey: String, promise: Promise) {
        Log.d(TAG, "Requesting consent info update")

        val parameters = ConsentUpdateRequestParameters(activity, appKey)
        ConsentManager.requestConsentInfoUpdate(
            parameters = parameters,
            callback = object : ConsentInfoUpdateCallback {
                override fun onUpdated() {
                    Log.d(TAG, "Consent info update successful")
                    promise.resolve(createConsentStatusResponse())
                }

                override fun onFailed(error: ConsentManagerError) {
                    Log.e(TAG, "Consent info update failed: ${error.localizedMessage}")
                    promise.reject(ERROR_CONSENT_INFO_UPDATE, error.localizedMessage)
                }
            }
        )
    }

    /**
     * Shows consent form if needed.
     * @param activity The current activity
     * @param promise The React Native promise to resolve/reject
     */
    fun showConsentFormIfNeeded(activity: Activity, promise: Promise) {
        Log.d(TAG, "Showing consent form if needed")

        ConsentManager.loadAndShowConsentFormIfRequired(
            activity = activity,
            dismissedListener = object : OnConsentFormDismissedListener {
                override fun onConsentFormDismissed(error: ConsentManagerError?) {
                    if (error != null) {
                        Log.e(TAG, "Consent form dismissed with error: ${error.localizedMessage}")
                        promise.reject(ERROR_CONSENT_FORM_IF_NEEDED, error.localizedMessage)
                    } else {
                        Log.d(TAG, "Consent form dismissed successfully")
                        promise.resolve(createConsentStatusResponse())
                    }
                }
            }
        )
    }

    /**
     * Shows consent form.
     * @param activity The current activity
     * @param promise The React Native promise to resolve/reject
     */
    fun showConsentForm(activity: Activity, promise: Promise) {
        Log.d(TAG, "Loading and showing consent form")

        ConsentManager.load(
            context = activity,
            successListener = object : OnConsentFormLoadSuccessListener {
                override fun onConsentFormLoadSuccess(consentForm: ConsentForm) {
                    Log.d(TAG, "Consent form loaded successfully")
                    consentForm.show(activity, object : OnConsentFormDismissedListener {
                        override fun onConsentFormDismissed(error: ConsentManagerError?) {
                            if (error != null) {
                                Log.e(
                                    TAG,
                                    "Consent form dismissed with error: ${error.localizedMessage}"
                                )
                                promise.reject(ERROR_CONSENT_FORM, error.localizedMessage)
                            } else {
                                Log.d(TAG, "Consent form dismissed successfully")
                                promise.resolve(createConsentStatusResponse())
                            }
                        }
                    })
                }
            },
            failureListener = object : OnConsentFormLoadFailureListener {
                override fun onConsentFormLoadFailure(error: ConsentManagerError) {
                    Log.e(TAG, "Consent form load failed: ${error.localizedMessage}")
                    promise.reject(ERROR_CONSENT_FORM, error.localizedMessage)
                }
            }
        )
    }

    /**
     * Revokes consent.
     * @param context The context to use for consent revocation
     */
    fun revokeConsent(context: Context) {
        Log.d(TAG, "Revoking consent")
        ConsentManager.revoke(context)
    }

    /**
     * Gets the current consent status.
     * @return Integer representation of consent status
     */
    fun getConsentStatus(): Int {
        return ConsentManager.status.toRNValue()
    }

    /**
     * Gets the current consent status as a double (for React Native compatibility).
     * @return Double representation of consent status
     */
    fun getConsentStatusAsDouble(): Double {
        return ConsentManager.status.toRNDouble()
    }
} 