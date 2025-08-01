#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>

// Forward declare priority enum
typedef NS_ENUM(NSInteger, RNAEventPriority) {
    RNAEventPriorityLow = 0,
    RNAEventPriorityNormal = 5,
    RNAEventPriorityHigh = 10,
    RNAEventPriorityCritical = 15
};

NS_ASSUME_NONNULL_BEGIN

/**
 * RNAEventDispatcher - Advanced Appodeal event management system
 * 
 * Features:
 * - Smart event queuing with priority handling
 * - Ad-type-aware event filtering  
 * - Automatic lifecycle management
 * - Performance monitoring and debugging
 * - Memory-efficient event batching
 */
@interface RNAEventDispatcher : NSObject

/**
 * React Native bridge instance
 */
@property(nonatomic, weak, nullable) RCTBridge *bridge;

/**
 * Shared singleton instance
 */
+ (instancetype)sharedDispatcher;

/**
 * Initialize the event system and mark JS as ready
 */
- (void)initializeWithReadyState:(BOOL)ready;

/**
 * Register an event listener for specific event type
 * @param eventName The event type to listen for
 */
- (void)registerListener:(NSString *)eventName;

/**
 * Unregister event listeners
 * @param eventName The event type to stop listening for
 * @param removeAll Whether to remove all listeners for this event
 */
- (void)unregisterListener:(NSString *)eventName removeAll:(BOOL)removeAll;

/**
 * Dispatch an Appodeal event with optional priority
 * @param eventName The event type
 * @param payload Event data payload
 * @param priority Higher values = higher priority (default: 0)
 */
- (void)dispatchEvent:(NSString *)eventName 
              payload:(nullable id)payload 
             priority:(NSInteger)priority;

/**
 * Convenience method for standard priority events
 */
- (void)dispatchEvent:(NSString *)eventName payload:(nullable id)payload;

/**
 * Get diagnostic information about the event system
 */
- (NSDictionary<NSString *, id> *)diagnostics;

/**
 * Reset and invalidate the event system
 */
- (void)reset;

@end

NS_ASSUME_NONNULL_END 