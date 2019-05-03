//
//  APDUserInfoProtocol.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <Appodeal/APDDefines.h>

@protocol APDUserInfo <NSObject>

@property (copy, nonatomic, readonly) NSString *email;
@property (copy, nonatomic, readonly) NSArray *interests;
@property (copy, nonatomic, readonly) NSString * userId;
@property (copy, nonatomic, readonly) NSDictionary *ext;

@property (strong, nonatomic, readonly) NSDate *birthday;
@property (strong, nonatomic, readonly) NSString *birthdayString;
@property (assign, nonatomic, readonly) NSUInteger age;
@property (assign, nonatomic, readonly) APDUserGender gender;
@property (assign, nonatomic, readonly) APDUserOccupation occupation;
@property (assign, nonatomic, readonly) APDUserRelationship relationship;
@property (assign, nonatomic, readonly) APDUserSmokingAttitude smokingAttitude;
@property (assign, nonatomic, readonly) APDUserAlcoholAttitude alcoholAttitude;

@end
