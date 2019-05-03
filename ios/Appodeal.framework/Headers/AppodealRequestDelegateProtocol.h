//
//  AppodealRequestDelegateProtocol.h
//  Appodeal
//
//  Created by Stas Kochkin on 05/07/2017.
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Appodeal/APDDefines.h>

@class APDBannerView;
@class APDInterstitialAd;
@class APDRewardedVideo;

@protocol AppodealRequestDelegate <NSObject>

- (void)mediationDidStartForAdType:(AppodealAdType)adType;
- (void)willStartAdRequestForAdNetwork:(NSString *)adNetwork adType:(AppodealAdType)adType;
- (void)didReceiveAdResponseFromAdNetwork:(NSString *)adNetwork adType:(AppodealAdType)adType wasFilled:(BOOL)filled;
- (void)didFinishMediationForAdType:(AppodealAdType)adType hasFilledAd:(BOOL)filled;
- (void)didDetectImpressionForAdNetwork:(NSString *)adNetwork adType:(AppodealAdType)adType;
- (void)didDetectClickForAdNetwork:(NSString *)adNetwork adType:(AppodealAdType)adType;

@end


@protocol APDBannerViewRequestDelegate <NSObject>

@optional

- (void)bannerViewDidStartMediation:(APDBannerView *)bannerView;
- (void)bannerView:(APDBannerView *)bannerView willSendRequestToAdNetwork:(NSString *)adNetwork;
- (void)bannerView:(APDBannerView *)bannerView didRecieveResponseFromAdNetwork:(NSString *)adNetwork wasFilled:(BOOL)filled;
- (void)bannerView:(APDBannerView *)bannerView didFinishMediationAdWasFilled:(BOOL)filled;
- (void)bannerView:(APDBannerView *)bannerView logImpressionForAdNetwork:(NSString *)adNetwork;
- (void)bannerView:(APDBannerView *)bannerView logClickForAdNetwork:(NSString *)adNetwork;

@end


@protocol APDInterstitalAdRequestDelegate <NSObject>

@optional

- (void)interstitialDidStartMediation:(APDInterstitialAd *)interstitial;
- (void)interstitial:(APDInterstitialAd *)interstitial willSendRequestToAdNetwork:(NSString *)adNetwork;
- (void)interstitial:(APDInterstitialAd *)interstitial didRecieveResponseFromAdNetwork:(NSString *)adNetwork wasFilled:(BOOL)filled;
- (void)interstitial:(APDInterstitialAd *)interstitial didFinishMediationAdWasFilled:(BOOL)filled;
- (void)interstitial:(APDInterstitialAd *)interstitial logImpressionForAdNetwork:(NSString *)adNetwork;
- (void)interstitial:(APDInterstitialAd *)interstitial logClickForAdNetwork:(NSString *)adNetwork;

@end


@protocol APDRewardedVideoRequestDelegate <NSObject>

@optional

- (void)rewardedVideoDidStartMediation:(APDRewardedVideo *)rewardedVideo;
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo willSendRequestToAdNetwork:(NSString *)adNetwork;
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo didRecieveResponseFromAdNetwork:(NSString *)adNetwork wasFilled:(BOOL)filled;
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo didFinishMediationAdWasFilled:(BOOL)filled;
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo logImpressionForAdNetwork:(NSString *)adNetwork;
- (void)rewardedVideo:(APDRewardedVideo *)rewardedVideo logClickForAdNetwork:(NSString *)adNetwork;

@end
