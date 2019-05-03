//
//  STASplashPreferences.h
//  StartApp
//
//  Created by StartApp on 6/25/14.
//  Copyright (c) 2014 StartApp. All rights reserved.
//  SDK version 3.4.3

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef enum {
	STASplashModeUserDefined = 1,
    STASplashModeTemplate = 2
} STASplashMode;

typedef enum {
    STASplashMinTimeShort = 2,
    STASplashMinTimeRegular = 3,
    STASplashMinTimeLong = 5,
} STASplashMinTime;

typedef enum {
    STASplashAdDisplayTimeShort = 5,
    STASplashAdDisplayTimeLong = 10,
    STASplashAdDisplayTimeForEver = 86400
} STASplashAdDisplayTime;

typedef enum {
    STASplashTemplateThemeDeepBlue = 0,
    STASplashTemplateThemeSky,
    STASplashTemplateThemeAshenSky,
    STASplashTemplateThemeBlaze,
    STASplashTemplateThemeGloomy,
    STASplashTemplateThemeOcean
} STASplashTemplateTheme;

typedef enum {
    STASplashLoadingIndicatorTypeIOS = 0,
    STASplashLoadingIndicatorTypeDots
} STASplashLoadingIndicatorType;

@interface STASplashPreferences : NSObject

// Splash Type
@property (nonatomic) STASplashMode splashMode;

// User Defined splash prefreneces
@property (nonatomic, strong) NSString *splashUserDefinedImageName;

// Template splash prefreneces
@property (nonatomic) STASplashTemplateTheme splashTemplateTheme;
@property (nonatomic, strong) NSString *splashTemplateIconImageName;
@property (nonatomic, strong) NSString *splashTemplateAppName;

// Loading Indicator
@property (nonatomic) BOOL isSplashLoadingIndicatorEnabled;
@property (nonatomic) STASplashLoadingIndicatorType splashLoadingIndicatorType;
@property (nonatomic) CGPoint splashLoadingIndicatorCenterPoint;

// Splash Orientation
@property (nonatomic) BOOL isLandscape;

// Other Preferences
@property (nonatomic) STASplashMinTime splashMinTime;
@property (nonatomic) STASplashAdDisplayTime splashAdDisplayTime;

@end
