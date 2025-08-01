/**
 * Appodeal Utility Types
 *
 * Contains utility type definitions used throughout the SDK
 * including logging levels, rewards, and common interfaces.
 */

/**
 * Logging levels for SDK debugging
 */
export enum AppodealLogLevel {
  NONE = 'none',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

/**
 * Reward information for rewarded video ads
 */
export interface AppodealReward {
  name: string;
  amount: string;
}
