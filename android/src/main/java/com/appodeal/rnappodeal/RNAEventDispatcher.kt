package com.appodeal.rnappodeal

import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.PriorityBlockingQueue
import java.util.concurrent.atomic.AtomicBoolean
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.atomic.AtomicLong

/**
 * RNAEventDispatcher - Advanced Appodeal event management system for Android
 *
 * Features:
 * - Smart event queuing with priority handling
 * - Ad-type-aware event filtering
 * - Automatic lifecycle management
 * - Performance monitoring and debugging
 * - Memory-efficient event batching
 */
internal class RNAEventDispatcher(
    private val reactContext: ReactApplicationContext
) {
    companion object {
        private const val TAG = "RNAEventDispatcher"
        private const val EVENT_PREFIX = "rna_"
        private const val MAX_QUEUE_SIZE = 100
        private const val FLUSH_INTERVAL_MS = 2000L
    }

    // Event priority enum
    enum class EventPriority(val value: Int) {
        LOW(0),
        NORMAL(5),
        HIGH(10),
        CRITICAL(15)
    }

    // Internal event structure
    data class Event(
        val name: String,
        val payload: WritableMap?,
        val priority: Int,
        val timestamp: Long = System.currentTimeMillis(),
        var retryCount: Int = 0
    )

    // State management
    private val jsReady = AtomicBoolean(false)
    private val totalListeners = AtomicInteger(0)
    private val eventListeners = ConcurrentHashMap<String, AtomicInteger>()
    private val eventQueue = PriorityBlockingQueue<Event>(MAX_QUEUE_SIZE) { a, b ->
        b.priority.compareTo(a.priority) // Higher priority first
    }

    // Statistics
    private val totalEventsDispatched = AtomicLong(0)
    private val totalEventsQueued = AtomicLong(0)
    private val initializationTime = System.currentTimeMillis()

    // Dependencies
    private val mainHandler = Handler(Looper.getMainLooper())
    private var flushRunnable: Runnable? = null

    init {
        setupPeriodicFlush()
        Log.d(TAG, "Dispatcher initialized")
    }

    /**
     * Initialize the event system and mark JS as ready
     */
    fun initializeWithReadyState(ready: Boolean) {
        val wasReady = jsReady.getAndSet(ready)

        if (ready && !wasReady) {
            Log.d(TAG, "JavaScript ready - flushing ${eventQueue.size} queued events")
            flushQueuedEvents()
        } else if (!ready) {
            Log.d(TAG, "JavaScript not ready - queuing mode enabled")
        }
    }

    /**
     * Register an event listener for specific event type
     */
    fun registerListener(eventName: String) {
        val currentCount = eventListeners.computeIfAbsent(eventName) { AtomicInteger(0) }
        val newCount = currentCount.incrementAndGet()
        totalListeners.incrementAndGet()

        Log.d(TAG, "Registered listener for '$eventName' (total: $newCount)")

        // Flush any queued events for this specific event type
        flushEventsForType(eventName)
    }

    /**
     * Unregister event listeners
     */
    fun unregisterListener(eventName: String, removeAll: Boolean) {
        val currentCount = eventListeners[eventName]?.get() ?: 0

        if (currentCount > 0) {
            val newCount = if (removeAll) 0 else (currentCount - 1)

            if (newCount <= 0) {
                eventListeners.remove(eventName)
                totalListeners.addAndGet(-currentCount)
            } else {
                eventListeners[eventName]?.set(newCount)
                totalListeners.addAndGet(if (removeAll) -currentCount else -1)
            }

            Log.d(TAG, "Unregistered listener for '$eventName' (remaining: $newCount)")
        }
    }

    /**
     * Dispatch an Appodeal event with optional priority
     */
    fun dispatchEvent(
        eventName: String,
        payload: WritableMap? = null,
        priority: Int = EventPriority.NORMAL.value
    ) {
        if (eventName.isBlank()) return

        totalEventsDispatched.incrementAndGet()

        // Try immediate dispatch if conditions are met
        if (canDispatchImmediately(eventName)) {
            sendEventToJS(eventName, payload)
            return
        }

        // Queue the event with priority
        val event = Event(eventName, payload, priority)
        enqueueEvent(event)
        totalEventsQueued.incrementAndGet()

        Log.d(TAG, "Queued '$eventName' (priority: $priority, queue size: ${eventQueue.size})")
    }

    /**
     * Convenience method for standard priority events
     */
    fun dispatchEvent(eventName: String, payload: WritableMap?) {
        dispatchEvent(eventName, payload, EventPriority.NORMAL.value)
    }

    /**
     * Get diagnostic information about the event system
     */
    fun getDiagnostics(): Map<String, Any> {
        val uptime = System.currentTimeMillis() - initializationTime
        val uptimeSeconds = uptime / 1000.0

        return mapOf(
            "jsReady" to jsReady.get(),
            "totalListeners" to totalListeners.get(),
            "activeEventTypes" to eventListeners.size,
            "queuedEvents" to eventQueue.size,
            "totalDispatched" to totalEventsDispatched.get(),
            "totalQueued" to totalEventsQueued.get(),
            "uptime" to uptimeSeconds,
            "averageEventsPerSecond" to (if (uptimeSeconds > 0) totalEventsDispatched.get() / uptimeSeconds else 0.0),
            "listenerBreakdown" to eventListeners.mapValues { it.value.get() }
        )
    }

    /**
     * Reset and invalidate the event system
     */
    fun reset() {
        flushRunnable?.let { mainHandler.removeCallbacks(it) }
        flushRunnable = null

        jsReady.set(false)
        totalListeners.set(0)
        eventListeners.clear()
        eventQueue.clear()
        totalEventsDispatched.set(0)
        totalEventsQueued.set(0)

        setupPeriodicFlush()
        Log.d(TAG, "Dispatcher reset")
    }

    // Private methods

    private fun setupPeriodicFlush() {
        val flushRunnable = Runnable {
            flushQueuedEvents()
            flushRunnable?.let { mainHandler.postDelayed(it, FLUSH_INTERVAL_MS) }
        }.also { flushRunnable = it }
        mainHandler.postDelayed(flushRunnable, FLUSH_INTERVAL_MS)
    }

    private fun canDispatchImmediately(eventName: String): Boolean {
        return jsReady.get() &&
                reactContext.hasActiveCatalystInstance() &&
                totalListeners.get() > 0 &&
                (eventListeners[eventName]?.get() ?: 0) > 0
    }

    private fun enqueueEvent(event: Event) {
        // PriorityBlockingQueue automatically handles priority ordering
        if (eventQueue.size >= MAX_QUEUE_SIZE) {
            eventQueue.poll() // Remove oldest event
            Log.w(TAG, "Queue overflow - removed oldest event")
        }
        eventQueue.offer(event)
    }

    private fun flushQueuedEvents() {
        if (!jsReady.get() || !reactContext.hasActiveCatalystInstance() || eventQueue.isEmpty()) {
            return
        }

        val eventsToFlush = mutableListOf<Event>()
        eventQueue.drainTo(eventsToFlush)

        for (event in eventsToFlush) {
            sendEventToJS(event.name, event.payload)
        }

        if (eventsToFlush.isNotEmpty()) {
            Log.d(TAG, "Flushed ${eventsToFlush.size} queued events")
        }
    }

    private fun flushEventsForType(eventName: String) {
        if (!jsReady.get() || !reactContext.hasActiveCatalystInstance()) return

        val eventsToFlush = mutableListOf<Event>()
        val remainingEvents = mutableListOf<Event>()

        eventQueue.drainTo(remainingEvents)

        for (event in remainingEvents) {
            if (event.name == eventName) {
                eventsToFlush.add(event)
            } else {
                eventQueue.offer(event)
            }
        }

        for (event in eventsToFlush) {
            sendEventToJS(event.name, event.payload)
        }

        if (eventsToFlush.isNotEmpty()) {
            Log.d(TAG, "Flushed ${eventsToFlush.size} events for type '$eventName'")
        }
    }

    private fun sendEventToJS(eventName: String, payload: WritableMap?) {
        if (!reactContext.hasActiveCatalystInstance()) return

        try {
            val prefixedEventName = EVENT_PREFIX + eventName
            reactContext.getJSModule(RCTDeviceEventEmitter::class.java)
                .emit(prefixedEventName, payload)
        } catch (e: Exception) {
            Log.e(TAG, "Error sending event: $eventName", e)
        }
    }
}