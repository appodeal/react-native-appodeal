/* eslint-disable no-bitwise */
import {Platform} from 'react-native';
import {
  AppodealAdType,
  AppodealGender,
  AppodealLogLevel,
} from 'react-native-appodeal';

interface User {
  age: number;
  gender: AppodealGender;
  id: string;
}

interface Constants {
  appKey: string;
  adTypes: number;
  logLevel: AppodealLogLevel;
  user: User;
}

export const constants: Constants = {
  appKey:
    Platform.OS === 'ios'
      ? 'dee74c5129f53fc629a44a690a02296694e3eef99f2d3a5f'
      : 'fee50c333ff3825fd6ad6d38cff78154de3025546d47a84f',
  adTypes:
    AppodealAdType.INTERSTITIAL |
    AppodealAdType.REWARDED_VIDEO |
    AppodealAdType.BANNER |
    AppodealAdType.MREC,
  logLevel: __DEV__ ? AppodealLogLevel.VERBOSE : AppodealLogLevel.NONE,
  user: {
    age: 23,
    gender: AppodealGender.MALE,
    id: 'some attribution id',
  },
};
