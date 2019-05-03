/*
 *  YMMYandexMetrica.h
 *
 * This file is a part of the AppMetrica
 *
 * Version for iOS © 2016 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://legal.yandex.com/metrica_termsofuse/
 */

#import <Foundation/Foundation.h>

@class CLLocation;
@class YMMYandexMetricaConfiguration;

NS_ASSUME_NONNULL_BEGIN

extern NSString *const kYMMYandexMetricaErrorDomain;

typedef NS_ENUM(NSInteger, YMMYandexMetricaEventErrorCode) {
    YMMYandexMetricaEventErrorCodeInitializationError = 1000,
    YMMYandexMetricaEventErrorCodeInvalidName = 1001,
    YMMYandexMetricaEventErrorCodeJsonSerializationError = 1002,
};

@interface YMMYandexMetrica : NSObject

/** Starting the statistics collection process.

 @param apiKey Application key that is issued during application registration in AppMetrica.
 Application key must be a hexadecimal string in format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
 The key can be requested or checked at https://appmetrica.yandex.com
 */
+ (void)activateWithApiKey:(NSString *)apiKey;

/** Starting the statistics collection process.

 @param configuration Configuration combines all AppMetrica settings in one place.
 Configuration initialized with unique application key that is issued during application registration in AppMetrica.
 Application key must be a hexadecimal string in format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
 The key can be requested or checked at https://appmetrica.yandex.com
 */
+ (void)activateWithConfiguration:(YMMYandexMetricaConfiguration *)configuration;

/** Reporting custom event.

 @param message Short name or description of the event.
 @param onFailure Block to be executed if an error occurres while reporting, the error is passed as block argument.
 */
+ (void)reportEvent:(NSString *)message
          onFailure:(nullable void (^)(NSError *error))onFailure;

/** Reporting custom event with additional parameters.

 @param message Short name or description of the event.
 @param params Dictionary of name/value pairs that should be sent to the server.
 @param onFailure Block to be executed if an error occurres while reporting, the error is passed as block argument.
 */
+ (void)reportEvent:(NSString *)message
         parameters:(nullable NSDictionary *)params
          onFailure:(nullable void (^)(NSError *error))onFailure;

/** Reporting custom error messages.

 @param message Short name or description of the error
 @param exception Exception contains an NSException object that must be passed to the server. It can take the nil value.
 @param onFailure Block to be executed if an error occurres while reporting, the error is passed as block argument.
 */
+ (void)reportError:(NSString *)message
          exception:(nullable NSException *)exception
          onFailure:(nullable void (^)(NSError *error))onFailure;

/** Enable/disable location reporting to AppMetrica.
 If enabled and location set via setLocation: method - that location would be used.
 If enabled and location is not set via setLocation,
 but application has appropriate permission - CLLocationManager would be used to acquire location data.
 
 @param enabled Flag indicating if reporting location to AppMetrica enabled
 Enabled by default.
 */
+ (void)setTrackLocationEnabled:(BOOL)enabled;

/** Set location to AppMetrica
 To enable AppMetrica to use this location trackLocationEnabled should be 'YES'
 
 @param location Custom device location to be reported.
 */
+ (void)setLocation:(nullable CLLocation *)location;

/** Setting session timeout (in seconds).

 @param sessionTimeoutSeconds Time limit before the application is considered inactive.
 By default, the session times out if the application is in background for 10 seconds.
 Minimum accepted value is 10 seconds. All passed values below 10 seconds automatically become 10 seconds.
 */
+ (void)setSessionTimeout:(NSUInteger)sessionTimeoutSeconds;

/** Tracking app crashes.

 @param enabled Boolean value to enable or disable collecting and sending crash reports.
 By default, reports on application crashes are sent, meaning enabled=true.
 To disable crash tracking, set the parameter value to enabled=false.
 */
+ (void)setReportCrashesEnabled:(BOOL)enabled;

/** Setting the arbitrary application version.

 @param appVersion Application version to be reported.
 By default, the application version is set in the app configuration file Info.plist (CFBundleShortVersionString).
 */
+ (void)setCustomAppVersion:(NSString *)appVersion;

/** Enable or disable logging.

 @param isEnabled Boolean value to enable or disable logging. By default logging is disabled.
 */
+ (void)setLoggingEnabled:(BOOL)isEnabled;

/** Setting key - value data to be used as additional information, associated with future unhandled exception.
 If value is nil, previously set key-value is removed. Does nothing if key hasn't been added.

 @param value The error environment value.
 @param key The error environment key.
 */
+ (void)setEnvironmentValue:(nullable NSString *)value forKey:(NSString *)key;

/** Retrieves current version of library.
 */
+ (NSString *)libraryVersion;

/** Enables AppMetrica's tracking mechanism by providing application's url scheme.

 @param urlScheme Application's deep link scheme. Scheme should be registered in CFBundleURLTypes Info.plist section.
 */
+ (BOOL)enableTrackingWithURLScheme:(NSURL *)urlScheme NS_EXTENSION_UNAVAILABLE_IOS("") NS_AVAILABLE_IOS(9_0);

/** Handles the URL that has opened the application.
 Reports the URL for deep links tracking.
 URL scheme should be registered beforehand via `enableTrackingWithUrlScheme:` method for tracking to work correctly.

 @param url URL that has opened the application.
 */
+ (BOOL)handleOpenURL:(NSURL *)url;

@end

@interface YMMYandexMetrica (YMMYandexMetricaDeprecatedOrUnavailable)

+ (void)startWithAPIKey:(NSString *)apiKey
    __attribute__((unavailable("WARNING: apiKey used in startWithAPIKey isn't compatible with activateWithApiKey:. "
                               "Use activateWithApiKey: with updated key. More info in activateWithApiKey:'s description")));

@end

NS_ASSUME_NONNULL_END
