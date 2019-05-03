//
//  StartAppBannerView.h
//  StartAppAdSDK
//
//  Created by StartApp on 11/13/13.
//  Copyright (c) 2013 StartApp. All rights reserved.
//  SDK version 3.4.3

#import <UIKit/UIKit.h>
#import "STABannerSize.h"

@class STABannerView;   // Forward decleration
@protocol STABannerDelegateProtocol <NSObject>
@optional
- (void) didDisplayBannerAd:(STABannerView*)banner;
- (void) failedLoadBannerAd:(STABannerView*)banner withError:(NSError *)error;
- (void) didClickBannerAd:(STABannerView*)banner;
- (void) didCloseBannerInAppStore:(STABannerView*)banner;

@end

typedef enum {
	STAAdOrigin_Top = 1,
    STAAdOrigin_Bottom = 2,
} STAAdOrigin;

@interface STABannerView : UIView <UIWebViewDelegate>

- (id) initWithSize:(STABannerSize) size origin:(CGPoint) origin withView: (UIView*) view withDelegate:(id <STABannerDelegateProtocol> ) bannerDelegate;
- (id) initWithSize:(STABannerSize) size autoOrigin:(STAAdOrigin) origin withView: (UIView*) view withDelegate:(id <STABannerDelegateProtocol> ) bannerDelegate;

- (id) initWithSize:(STABannerSize) size origin:(CGPoint) origin withView: (UIView*) view withDelegate:(id <STABannerDelegateProtocol> ) bannerDelegate withAdTag:(NSString*)adTag;
- (id) initWithSize:(STABannerSize) size autoOrigin:(STAAdOrigin) origin withView: (UIView*) view withDelegate:(id <STABannerDelegateProtocol> ) bannerDelegate withAdTag:(NSString*)adTag;

- (void)setSTABannerAdTag:(NSString *) adTag;

- (void)setSTABannerSize:(STABannerSize) size;
- (void)setOrigin:(CGPoint) origin;
- (void)setSTAAutoOrigin:(STAAdOrigin)origin;

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation;
- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator;

- (void)hideBanner;
- (void)showBanner;
- (BOOL)isVisible;

-(void)addSTABannerToCell:(UITableViewCell *)cell withIndexPath:(NSIndexPath *)indexPath atIntexPathSection:(int)section repeatEach:(int)each;
-(void)addSTABannerToCell:(UITableViewCell *)cell withIndexPath:(NSIndexPath *)indexPath atIntexPathSection:(int)section;

-(void)addSTABannerToCell:(UITableViewCell *)cell withIndexPath:(NSIndexPath *)indexPath atIntexPathRow:(int)row repeatEach:(int)each;
-(void)addSTABannerToCell:(UITableViewCell *)cell withIndexPath:(NSIndexPath *)indexPath atIntexPathRow:(int)row;

@end
