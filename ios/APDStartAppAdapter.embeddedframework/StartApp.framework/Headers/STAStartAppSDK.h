//
//  StartAppSDK.h
//  StartAppAdSDK
//
//  Created by StartApp on 3/13/14.
//  Copyright (c) 2014 StartApp. All rights reserved.
//  SDK version 3.4.3

#import <Foundation/Foundation.h>
#import "STAStartAppAd.h"
#import "STASplashPreferences.h"


typedef enum {
    STAGender_Undefined = 0,
    STAGender_Female = 1,
    STAGender_Male=2
} STAGender;

// STAAdPreferences holds params specific to an ad
@interface STASDKPreferences : NSObject
@property (nonatomic,assign) NSUInteger age;
@property (nonatomic,strong) NSString* ageStr;

@property (nonatomic, assign) STAGender gender;

+ (instancetype)prefrencesWithAge:(NSUInteger)age andGender:(STAGender)gender;
+ (instancetype)prefrencesWithAgeStr:(NSString *)ageStr andGender:(STAGender)gender;

@end



@interface STAStartAppSDK : NSObject

+ (STAStartAppSDK*) sharedInstance;
- (void) SDKInitialize:(NSString*)devID andAppID:(NSString*) appID;

@property (nonatomic, strong) NSString* appID;
@property (nonatomic, strong) NSString* devID;
@property (nonatomic, strong) NSString* accountID;
@property (nonatomic, strong) STASDKPreferences* preferences;

// Disable Return Ad
- (void)disableReturnAd;

// Initialize Splash Ad
- (void)showSplashAd;
- (void)showSplashAdWithDelegate:(id<STADelegateProtocol>)delegate;
- (void)showSplashAdWithPreferences:(STASplashPreferences *)splashPreferences;
- (void)showSplashAdWithDelegate:(id<STADelegateProtocol>)delegate withPreferences:(STASplashPreferences *)splashPreferences;
- (void)showSplashAdWithDelegate:(id<STADelegateProtocol>)delegate withAdPreferences:(STAAdPreferences*) adPrefs withPreferences:(STASplashPreferences *)splashPreferences;
- (void)showSplashAdWithDelegate:(id<STADelegateProtocol>)delegate withAdPreferences:(STAAdPreferences*) adPrefs withPreferences:(STASplashPreferences *)splashPreferences withAdTag:(NSString*)adTag;

-(void)inAppPurchaseMade;
-(void)inAppPurchaseMadeWithAmount:(float)amount;
-(void)startNewSession;


//Unity methods
- (void)unitySDKInitialize;
- (void)unityAppWillEnterForeground;
- (void)unityAppDidEnterBackground;
- (void)setUnitySupportedOrientations:(int)supportedOrientations;
- (void)setUnityAutoRotation:(int)autoRotation;
- (void)setUnityVersion:(NSString *)unityVersion;


@property (readonly)  NSString* version;
@property (readonly)  long buildNumber;


@property (nonatomic)BOOL isUnityEnvironment;
@property (nonatomic)BOOL isCoronaEnvironment;
@property (nonatomic)BOOL isCocos2DXEnvironment;
@property (nonatomic)BOOL isAdMobMediationEnvironment;
@property (nonatomic)BOOL isMoPubMediationEnvironment;
@property (nonatomic)BOOL isSwiftEnvironment;


@end
