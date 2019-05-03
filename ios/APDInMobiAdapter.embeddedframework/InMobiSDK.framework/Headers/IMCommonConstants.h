//
//  IMCommonConstants.h
//  iOS-SDK
//  Copyright (c) 2015 InMobi. All rights reserved.
//

#ifndef APIs_CommonConstants_h
#define APIs_CommonConstants_h

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, IMSDKIdType) {
    kIMSDKIdTypeSession,
    kIMSDKIdTypeLogin
};


typedef NS_ENUM(NSInteger, IMSDKLogLevel) {
    kIMSDKLogLevelNone,
    kIMSDKLogLevelError,
    kIMSDKLogLevelDebug
};

/**
 * User Gender
 */
typedef NS_ENUM (NSInteger, IMSDKGender) {
    kIMSDKGenderMale = 1,
    kIMSDKGenderFemale
};

/**
 * User Education
 */
typedef NS_ENUM (NSInteger, IMSDKEducation) {
    kIMSDKEducationHighSchoolOrLess = 1,
    kIMSDKEducationCollegeOrGraduate,
    kIMSDKEducationPostGraduateOrAbove
};

/**
 * User Ethnicity
 */
typedef NS_ENUM (NSInteger, IMSDKEthnicity) {
    kIMSDKEthnicityHispanic = 1,
    kIMSDKEthnicityCaucasian,
    kIMSDKEthnicityAsian,
    kIMSDKEthnicityAfricanAmerican,
    kIMSDKEthnicityOther
};

typedef NS_ENUM(NSInteger, IMSDKHouseholdIncome) {
    kIMSDKHouseholdIncomeBelow5kUSD = 1,
    kIMSDKHouseholdIncomeBetween5kAnd10kUSD,
    kIMSDKHouseholdIncomeBetween10kAnd15kUSD,
    kIMSDKHouseholdIncomeBetween15kAnd20kUSD,
    kIMSDKHouseholdIncomeBetween20kAnd25kUSD,
    kIMSDKHouseholdIncomeBetween25kAnd50kUSD,
    kIMSDKHouseholdIncomeBetween50kAnd75kUSD,
    kIMSDKHouseholdIncomeBetween75kAnd100kUSD,
    kIMSDKHouseholdIncomeBetween100kAnd150kUSD,
    kIMSDKHouseholdIncomeAbove150kUSD
};
typedef NS_ENUM(NSInteger, IMSDKAgeGroup) {
    kIMSDKAgeGroupBelow18 = 1,
    kIMSDKAgeGroupBetween18And20,
    kIMSDKAgeGroupBetween21And24,
    kIMSDKAgeGroupBetween25And34,
    kIMSDKAgeGroupBetween35And54,
    kIMSDKAgeGroupAbove55
};

#endif
