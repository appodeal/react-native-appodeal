package com.appodeal.rnappodeal.ext

import com.appodeal.ads.utils.Log

/**
 * Extension functions for Appodeal log level conversions.
 * These extensions provide convenient conversions between string and Log.LogLevel.
 */
internal object LogLevelExtensions {

    /**
     * Converts a string log level to Appodeal Log.LogLevel enum.
     * @param logLevel The log level string ("debug", "verbose", or any other value)
     * @return The corresponding Log.LogLevel enum value
     */
    internal fun String.toLogLevel(): Log.LogLevel = when (this.lowercase()) {
        "debug" -> Log.LogLevel.debug
        "verbose" -> Log.LogLevel.verbose
        else -> Log.LogLevel.none
    }


} 