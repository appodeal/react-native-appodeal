//
//  AppLovinSdk.h
//
//  Created by Basil Shikin on 2/1/12.
//  Copyright (c) 2013, AppLovin Corporation. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "ALSdkSettings.h"
#import "ALAdService.h"
#import "ALNativeAdService.h"
#import "ALPostbackService.h"
#import "ALEventService.h"

#import "ALAnnotations.h"
#import "ALErrorCodes.h"

AL_ASSUME_NONNULL_BEGIN

/**
 * This is a base class for the AppLovin iOS SDK.
 *
 */
@interface ALSdk : NSObject

/**
 * @name SDK Configuration
 */

/**
 * This SDK's key.
 */
@property (strong, nonatomic, readonly) NSString *sdkKey;

/**
 * This SDK's settings.
 */
@property (strong, nonatomic, readonly) ALSdkSettings *settings;

/**
 * Set Plugin version.
 *
 * This is mainly used internally, however if you've written a mediation adaptor or plugin,
 * you can set this. Common examples include things like "Bob's Cocos2D Plugin v1.0".
 *
 * @param version Some descriptive string which identifies the plugin.
 */
- (void)setPluginVersion:(NSString *)version;

/**
 * @name SDK Information
 */

/**
 * Get the current version of the SDK.
 *
 * @return The current SDK version.
 */
+ (NSString *)version;

/**
 * @name SDK Services
 */

/**
 * Get an instance of AppLovin Ad service. This service is
 * used to fetch and display ads from AppLovin servers.
 *
 * @return Ad service. Guaranteed not to be null.
 */
@property (strong, nonatomic, readonly) ALAdService *adService;

/**
 * Get an instance of AppLovin Native Ad service. This service is
 * used to fetch and display native ads from AppLovin servers.
 *
 * @return Native ad service. Guaranteed not to be null.
 */
@property (strong, nonatomic, readonly) ALNativeAdService *nativeAdService;

/**
 * Get an instance of the AppLovin postback service. This service is used to dispatch HTTP GET postbacks to arbitrary URLs.
 *
 * @return Postback service. Guaranteed not to be null.
 */
@property (strong, nonatomic, readonly) ALPostbackService *postbackService;

/**
 * Get an instance of the AppLovin event service. This service is used to track post-install user events.
 *
 * @return Event service. Guaranteed not to be null.
 */
@property (strong, nonatomic, readonly) ALEventService *eventService;

/**
 * Set a string which identifies the current user, which will be passed through to your server via our optional S2S postbacks.
 *
 * If you're using reward validation, you can optionally set a user identifier to be included with
 * currency validation postbacks. For example, a user name. We'll include this in the postback when we
 * ping your currency endpoint from our server.
 */
@property (copy, nonatomic, alnullable) NSString *userIdentifier;

/**
 * @name SDK Initialization
 */

/**
 * Initialize current version of the SDK.
 *
 */
- (void)initializeSdk;

/**
 * Initialize the default instance of AppLovin SDK.
 *
 * Please make sure that application's
 * <code>Info.plist</code> includes a property 'AppLovinSdkKey' that is set to provided SDK key.
 */
+ (void)initializeSdk;

/**
 * @name Getting SDK Instances
 */

/**
 * Get a shared instance of AppLovin SDK.
 *
 * Please make sure that application's
 * <code>Info.plist</code> includes a property 'AppLovinSdkKey' that is set to provided SDK key.
 *
 * @return An instance of AppLovinSDK
 */
+ (alnullable ALSdk *)shared;

/**
 * Get an instance of AppLovin SDK using default SDK settings.
 *
 * @param sdkKey         SDK key to use. Must not be nil.
 *
 * @return An instance of AppLovinSDK
 */
+ (alnullable ALSdk *)sharedWithKey:(NSString *)sdkKey;

/**
 * Get an instance of AppLovin SDK.
 * 
 * @param sdkKey         SDK key to use. Must not be nil.
 * @param settings       User-provided settings. Must not be nil, but can be an empty <code>[[ALSdkSettings alloc] init]</code> object.
 * 
 * @return An instance of AppLovinSDK
 */
+ (alnullable ALSdk *)sharedWithKey:(NSString *)sdkKey settings:(ALSdkSettings *)settings;

- (id)init __attribute__((unavailable("Use [ALSdk shared] instead of alloc-init pattern.")));

@end

AL_ASSUME_NONNULL_END
