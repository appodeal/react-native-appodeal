package com.appodeal.rnappodeal.ext

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType

// MARK: - Conversion Extension Functions

/**
 * Extension function to convert ReadableMap to Map
 */
internal fun ReadableMap.toMap(): Map<String, Any?> {
    val resultMap = mutableMapOf<String, Any?>()
    val iterator = this.keySetIterator()
    while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        when (this.getType(key)) {
            ReadableType.Null -> resultMap[key] = null
            ReadableType.Boolean -> resultMap[key] = this.getBoolean(key)
            ReadableType.Number -> resultMap[key] = this.getDouble(key)
            ReadableType.String -> resultMap[key] = this.getString(key)
            ReadableType.Map -> resultMap[key] = this.getMap(key)?.toMap() ?: emptyMap<String, Any?>()
            ReadableType.Array -> resultMap[key] = this.getArray(key)?.let { array ->
                val list = mutableListOf<Any?>()
                for (i in 0 until array.size()) {
                    when (array.getType(i)) {
                        ReadableType.Null -> list.add(null)
                        ReadableType.Boolean -> list.add(array.getBoolean(i))
                        ReadableType.Number -> list.add(array.getDouble(i))
                        ReadableType.String -> list.add(array.getString(i))
                        ReadableType.Map -> list.add(array.getMap(i)?.toMap() ?: emptyMap<String, Any?>())
                        ReadableType.Array -> list.add(array.getArray(i)?.let { nestedArray ->
                            val nestedList = mutableListOf<Any?>()
                            for (j in 0 until nestedArray.size()) {
                                when (nestedArray.getType(j)) {
                                    ReadableType.Null -> nestedList.add(null)
                                    ReadableType.Boolean -> nestedList.add(nestedArray.getBoolean(j))
                                    ReadableType.Number -> nestedList.add(nestedArray.getDouble(j))
                                    ReadableType.String -> nestedList.add(nestedArray.getString(j))
                                    ReadableType.Map -> nestedList.add(nestedArray.getMap(j)?.toMap() ?: emptyMap<String, Any?>())
                                    ReadableType.Array -> nestedList.add(null) // Avoid infinite recursion
                                }
                            }
                            nestedList
                        } ?: emptyList<Any?>())
                    }
                }
                list
            } ?: emptyList<Any?>()
        }
    }
    return resultMap
}

/**
 * Extension function to convert ReadableMap to Map<String, String>
 */
fun ReadableMap.toStringMap(): Map<String, String> {
    return buildMap {
        val iterator = this@toStringMap.entryIterator
        while (iterator.hasNext()) {
            val entry = iterator.next()
            put(entry.key, entry.value.toString())
        }
    }
}



// MARK: - Null-Safe Extraction Extension Functions

/**
 * Null-safe string extraction with fallback
 */
internal fun ReadableMap.getStringOrNull(key: String): String? {
    return if (this.hasKey(key) && !this.isNull(key)) {
        this.getString(key)
    } else {
        null
    }
}



/**
 * Null-safe integer extraction with fallback
 */
internal fun ReadableMap.getIntOrNull(key: String): Int? {
    return if (this.hasKey(key) && !this.isNull(key)) {
        this.getInt(key)
    } else {
        null
    }
}



/**
 * Null-safe long extraction with fallback
 */
internal fun ReadableMap.getLongOrNull(key: String): Long? {
    return this.getIntOrNull(key)?.toLong()
}



/**
 * Null-safe double extraction with fallback
 */
internal fun ReadableMap.getDoubleOrNull(key: String): Double? {
    return if (this.hasKey(key) && !this.isNull(key)) {
        this.getDouble(key)
    } else {
        null
    }
}



/**
 * Null-safe boolean extraction with fallback
 */
internal fun ReadableMap.getBooleanOrNull(key: String): Boolean? {
    return if (this.hasKey(key) && !this.isNull(key)) {
        this.getBoolean(key)
    } else {
        null
    }
}



/**
 * Null-safe ReadableMap extraction with fallback
 */
internal fun ReadableMap.getMapOrNull(key: String): ReadableMap? {
    return if (this.hasKey(key) && !this.isNull(key)) {
        this.getMap(key)
    } else {
        null
    }
}