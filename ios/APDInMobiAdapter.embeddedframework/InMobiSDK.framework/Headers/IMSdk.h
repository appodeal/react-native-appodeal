//
//  IMSdk.h
//  APIs
//  Copyright (c) 2015 InMobi. All rights reserved.
//
/**
 * Use this class to set the user specific demographic info.
 */

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#include "IMCommonConstants.h"

@interface IMSdk : NSObject

/**
 *  Initialize the sdk. This must be called before any other API for the SDK is used.
 * @param accountID account id obtained from the InMobi portal.
 */
+(void)initWithAccountID:(NSString *)accountID;

/**
 * Use this to get the version of the SDK.
 * @return The version of the SDK.
 */
+(NSString *)getVersion;

/**
 * Set the log level for SDK's logs
 * @param desiredLogLevel The desired level of logs.
 */
+(void)setLogLevel:(IMSDKLogLevel)desiredLogLevel;
/**
 * Register a user specific id with the SDK
 * @param identifier The user Id.
 * @param type The user Id type.
 */
+(void)addId:(NSString*)identifier forType:(IMSDKIdType)type;
/**
 * Deregister a particular set of Ids
 * @param type The user Id type.
 */
+(void)removeIdType:(IMSDKIdType)type;
/**
 * Provide the user's age to the SDK for targetting purposes.
 * @param age The user's age.
 */
+(void)setAge:(unsigned short)age;
/**
 * Provide the user's area code to the SDK for targetting purposes.
 * @param areaCode The user's area code.
 */
+(void)setAreaCode:(NSString*)areaCode;
/**
 * Provide the user's age group to the SDK for targetting purposes.
 * @param ageGroup The user's age group.
 */
+(void)setAgeGroup:(IMSDKAgeGroup)ageGroup;
/**
 * Provide a user's date of birth to the SDK for targetting purposes.
 * @param yearOfBirth The user's date of birth.
 */
+(void)setYearOfBirth:(NSInteger)yearOfBirth;
/**
 * Provide the user's education status to the SDK for targetting purposes.
 * @param education The user's education status.
 */
+(void)setEducation:(IMSDKEducation)education;
/**
 * Provide the user's ethnicity to the SDK for targetting purposes.
 * @param ethnicity The user's ethnicity.
 */
+(void)setEthnicity:(IMSDKEthnicity)ethnicity;
/**
 * Provide the user's gender to the SDK for targetting purposes.
 * @param gender The user's gender.
 */
+(void)setGender:(IMSDKGender)gender;
/**
 * Provide the user's household income to the SDK for targetting purposes.
 * @param income The user's household income.
 */
+(void)setHouseholdIncome:(IMSDKHouseholdIncome)income;
/**
 * Provide the user's income to the SDK for targetting purposes.
 * @param income The user's income.
 */
+(void)setIncome:(unsigned int)income;
/**
 * Provide the user's interests to the SDK for targetting purposes.
 * @param interests The user's interests.
 */
+(void)setInterests:(NSString*)interests;
/**
 * Provide the user's preferred language to the SDK for targetting purposes.
 * @param language The user's language.
 */
+(void)setLanguage:(NSString*)language;
/**
 * Provide the user's location to the SDK for targetting purposes.
 * @param city The user's city.
 * @param state The user's state.
 * @param country The user's country.
 */
+(void)setLocationWithCity:(NSString*)city state:(NSString*)state country:(NSString*)country;

/**
 * Provide the user's location to the SDK for targetting purposes.
 * @param location The location of the user
 */
+(void)setLocation:(CLLocation*)location;
/**
 * Provide the user's nationality to the SDK for targetting purposes.
 * @param nationality The user's nationality.
 */
+(void)setNationality:(NSString*)nationality;
/**
 * Provide the user's postal code to the SDK for targetting purposes.
 * @param postalcode The user's postalcode.
 */
+(void)setPostalCode:(NSString*)postalcode;


@end
