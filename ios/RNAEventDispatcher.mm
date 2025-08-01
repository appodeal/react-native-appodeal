#import "RNAEventDispatcher.h"
#import "RNADefines.h"

// Internal event structure
@interface RNAEvent : NSObject
@property(nonatomic, strong) NSString *name;
@property(nonatomic, strong) id payload;
@property(nonatomic, assign) NSInteger priority;
@property(nonatomic, strong) NSDate *timestamp;
@property(nonatomic, assign) NSUInteger retryCount;
@end

@implementation RNAEvent
@end

// Main dispatcher implementation
@interface RNAEventDispatcher ()
@property(atomic, assign) BOOL jsReady;
@property(atomic, assign) NSInteger totalListeners;
@property(nonatomic, strong) NSMutableDictionary<NSString *, NSNumber *> *eventListeners;
@property(nonatomic, strong) NSMutableArray<RNAEvent *> *eventQueue;
@property(nonatomic, strong) NSTimer *flushTimer;
@property(nonatomic, assign) NSUInteger totalEventsDispatched;
@property(nonatomic, assign) NSUInteger totalEventsQueued;
@property(nonatomic, strong) NSDate *initializationTime;
@end

@implementation RNAEventDispatcher

#pragma mark - Lifecycle

+ (instancetype)sharedDispatcher {
    static RNAEventDispatcher *shared = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        shared = [[self alloc] init];
    });
    return shared;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _jsReady = NO;
        _totalListeners = 0;
        _eventListeners = [NSMutableDictionary dictionary];
        _eventQueue = [NSMutableArray array];
        _totalEventsDispatched = 0;
        _totalEventsQueued = 0;
        _initializationTime = [NSDate date];
        
        [self setupPeriodicFlush];
        
        NSLog(@"[RNA Events] Dispatcher initialized");
    }
    return self;
}

- (void)setupPeriodicFlush {
    // Flush queued events every 2 seconds if JS is ready
    _flushTimer = [NSTimer scheduledTimerWithTimeInterval:2.0
                                                  repeats:YES
                                                    block:^(NSTimer * _Nonnull timer) {
        [self flushQueuedEvents];
    }];
}

#pragma mark - Public API

- (void)initializeWithReadyState:(BOOL)ready {
    @synchronized(self) {
        BOOL wasReady = _jsReady;
        _jsReady = ready;
        
        if (ready && !wasReady) {
            NSLog(@"[RNA Events] JavaScript ready - flushing %lu queued events", 
                  (unsigned long)_eventQueue.count);
            [self flushQueuedEvents];
        } else if (!ready) {
            NSLog(@"[RNA Events] JavaScript not ready - queuing mode enabled");
        }
    }
}

- (void)registerListener:(NSString *)eventName {
    @synchronized(self) {
        NSInteger currentCount = [_eventListeners[eventName] integerValue];
        _eventListeners[eventName] = @(currentCount + 1);
        _totalListeners++;
        
        NSLog(@"[RNA Events] Registered listener for '%@' (total: %ld)", 
              eventName, (long)currentCount + 1);
        
        // Flush any queued events for this specific event type
        [self flushEventsForType:eventName];
    }
}

- (void)unregisterListener:(NSString *)eventName removeAll:(BOOL)removeAll {
    @synchronized(self) {
        NSInteger currentCount = [_eventListeners[eventName] integerValue];
        
        if (currentCount > 0) {
            NSInteger newCount = removeAll ? 0 : (currentCount - 1);
            
            if (newCount <= 0) {
                [_eventListeners removeObjectForKey:eventName];
                _totalListeners -= currentCount;
            } else {
                _eventListeners[eventName] = @(newCount);
                _totalListeners -= (removeAll ? currentCount : 1);
            }
            
            NSLog(@"[RNA Events] Unregistered listener for '%@' (remaining: %ld)", 
                  eventName, (long)newCount);
        }
    }
}

- (void)dispatchEvent:(NSString *)eventName payload:(nullable id)payload priority:(NSInteger)priority {
    if (!eventName) return;
    
    @synchronized(self) {
        _totalEventsDispatched++;
        
        // Try immediate dispatch if conditions are met
        if ([self canDispatchImmediately:eventName]) {
            [self sendEventToJS:eventName payload:payload];
            return;
        }
        
        // Queue the event with priority
        RNAEvent *event = [[RNAEvent alloc] init];
        event.name = eventName;
        event.payload = payload;
        event.priority = priority;
        event.timestamp = [NSDate date];
        event.retryCount = 0;
        
        [self enqueueEvent:event];
        _totalEventsQueued++;
        
        NSLog(@"[RNA Events] Queued '%@' (priority: %ld, queue size: %lu)", 
              eventName, (long)priority, (unsigned long)_eventQueue.count);
    }
}

- (void)dispatchEvent:(NSString *)eventName payload:(nullable id)payload {
    [self dispatchEvent:eventName payload:payload priority:RNAEventPriorityNormal];
}

- (NSDictionary<NSString *, id> *)diagnostics {
    @synchronized(self) {
        NSTimeInterval uptime = [[NSDate date] timeIntervalSinceDate:_initializationTime];
        
        return @{
            @"jsReady": @(_jsReady),
            @"totalListeners": @(_totalListeners),
            @"activeEventTypes": @(_eventListeners.count),
            @"queuedEvents": @(_eventQueue.count),
            @"totalDispatched": @(_totalEventsDispatched),
            @"totalQueued": @(_totalEventsQueued),
            @"uptime": @(uptime),
            @"averageEventsPerSecond": @(uptime > 0 ? _totalEventsDispatched / uptime : 0),
            @"listenerBreakdown": [_eventListeners copy]
        };
    }
}

- (void)reset {
    @synchronized(self) {
        [_flushTimer invalidate];
        _flushTimer = nil;
        
        _jsReady = NO;
        _totalListeners = 0;
        [_eventListeners removeAllObjects];
        [_eventQueue removeAllObjects];
        _totalEventsDispatched = 0;
        _totalEventsQueued = 0;
        _initializationTime = [NSDate date];
        
        [self setupPeriodicFlush];
        
        NSLog(@"[RNA Events] Dispatcher reset");
    }
}

#pragma mark - Private Methods

- (BOOL)canDispatchImmediately:(NSString *)eventName {
    return _jsReady && 
           _bridge && 
           _totalListeners > 0 && 
           [_eventListeners[eventName] integerValue] > 0;
}

- (void)enqueueEvent:(RNAEvent *)event {
    // Insert event maintaining priority order (higher priority first)
    NSUInteger insertIndex = 0;
    for (NSUInteger i = 0; i < _eventQueue.count; i++) {
        if (_eventQueue[i].priority < event.priority) {
            insertIndex = i;
            break;
        }
        insertIndex = i + 1;
    }
    
    [_eventQueue insertObject:event atIndex:insertIndex];
    
    // Limit queue size to prevent memory issues
    if (_eventQueue.count > 100) {
        [_eventQueue removeLastObject];
        NSLog(@"[RNA Events] Queue overflow - removed oldest event");
    }
}

- (void)flushQueuedEvents {
    if (!_jsReady || !_bridge || _eventQueue.count == 0) {
        return;
    }
    
    @synchronized(self) {
        NSArray<RNAEvent *> *eventsToFlush = [_eventQueue copy];
        [_eventQueue removeAllObjects];
        
        for (RNAEvent *event in eventsToFlush) {
            [self sendEventToJS:event.name payload:event.payload];
        }
        
        if (eventsToFlush.count > 0) {
            NSLog(@"[RNA Events] Flushed %lu queued events", (unsigned long)eventsToFlush.count);
        }
    }
}

- (void)flushEventsForType:(NSString *)eventName {
    if (!_jsReady || !_bridge) return;
    
    @synchronized(self) {
        NSMutableArray<RNAEvent *> *eventsToFlush = [NSMutableArray array];
        NSMutableArray<RNAEvent *> *remainingEvents = [NSMutableArray array];
        
        for (RNAEvent *event in _eventQueue) {
            if ([event.name isEqualToString:eventName]) {
                [eventsToFlush addObject:event];
            } else {
                [remainingEvents addObject:event];
            }
        }
        
        _eventQueue = remainingEvents;
        
        for (RNAEvent *event in eventsToFlush) {
            [self sendEventToJS:event.name payload:event.payload];
        }
        
        if (eventsToFlush.count > 0) {
            NSLog(@"[RNA Events] Flushed %lu events for type '%@'", 
                  (unsigned long)eventsToFlush.count, eventName);
        }
    }
}

- (void)sendEventToJS:(NSString *)eventName payload:(nullable id)payload {
    if (!_bridge) return;
    
    NSString *prefixedEventName = [kRNAEventPrefix stringByAppendingString:eventName];
    NSArray *args = payload ? @[prefixedEventName, payload] : @[prefixedEventName];
    
    [_bridge enqueueJSCall:@"RCTDeviceEventEmitter"
                    method:@"emit"
                      args:args
                completion:^{
        // Event successfully sent
    }];
}

- (void)dealloc {
    [_flushTimer invalidate];
}

@end 