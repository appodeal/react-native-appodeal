//
//  APDMediaView.h
//  Appodeal
//
//  AppodealSDK version 2.1.4-Release
//
//  Copyright © 2017 Appodeal, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@class APDNativeAd;

/*!
 *  Media view types
 */
typedef NS_ENUM(NSInteger, APDMediaViewType) {
    /*!
     *  Placeholder is main image. When the video loads on media view,
     *  the play button appears. When the play button is tapped, the video starts to play with media view size on
     *  if media view is tapped
     */
    APDMediaViewTypeMainImage = 0,
    /*!
     *  Placeholder is icon image. When autostart is ignored on media view,
     *  the play button appears. When play button is tapped, video starts to play on full screen.
     *  Tap on video in fullscreen mode to return video to media view size.
     */
    APDMediaViewTypeIcon
};

@class APDMediaView;

/*!
 *  Declaration of media view delegate
 */
@protocol APDMediaViewDelegate <NSObject>

@optional

/*!
 *  Method called when media view starts playing
 *
 *  @param mediaView Current media view
 */
- (void)mediaViewStartPlaying:(APDMediaView *)mediaView;

/*!
 *  Method called when media view finishes playing
 *
 *  @param mediaView  Current media view
 *  @param wasSkipped If user skips video from media view return YES else return NO
 */
- (void)mediaViewFinishPlaying:(APDMediaView *)mediaView videoWasSkipped:(BOOL)wasSkipped;

/*!
 *  Method called when media view presents fullscreen
 *  If type APDMediaViewTypeIcon -mediaViewStartPlaying: call firstly!
 *  When this method is called, media view has fullscreen size
 *
 *  @param mediaView     Current media view
 *  @param presentedView At this view you can place custom controls elements: for example, a mute button
 */
- (void)mediaView:(APDMediaView *)mediaView didPresentFullScreenView:(UIView *)presentedView;

/*!
 *  Method called when media view dismisses fullscreen
 *  When this method is called, media view has original size;
 *
 *  @param mediaView Current media view
 */
- (void)mediaViewDidDismissFullScreen:(APDMediaView *)mediaView;

@end

/*!
 *  Instance of this class provides video player for instances of APDNativeAd.
 *  Placeholder image depends on media view type and can be mainImage or iconImage from native ad.
 *  If native ad doesn't contain video, only placeholder be displayed.
 *  If the video is played and visibility of the media view changes to less than 80%, the video will stop.
 *  Autoplay parameter tuned on in Appodeal Dashboard.
 *  Example:
 * @code
 - (void)addMediaViewToView:(UIView *)view fromViewController:(UIViewController<APDMediaViewDelegate> *)controller nativeAd:(APDNativeAd:)nativeAd {
    _mediaView = [[APDMediaView alloc] initWithFrame:CGRectMake(0, 0, 300, 120)];
    _mediaView.type = APDMediaViewTypeMainImage;
    [_mediaView setNativeAd:self.nativeAd rootViewController:controller];
    _mediaView.delegate = controller;
    _mediaView.muted = YES;
    [view addSubview:_mediaView];
 }
 *
 */
@interface APDMediaView : UIView


/*!
 *  Set delegate to media view
 */
@property (nonatomic, weak) id<APDMediaViewDelegate> delegate;

/*!
 *  Current media view type. Default set to APDMediaViewTypeMainImage.
 *  @warning Set type before calling - setNativeAd:rootViewController:
 */
@property (nonatomic, assign) APDMediaViewType type __attribute__((deprecated("Media View has APDMediaViewTypeMainImage type only!")));

/*!
 *  If set to YES, 5 seconds after the video starts playing, the skip button will appear.
 * Tapping on the skip button will close the video
 * -mediaViewFinishPlaying:videoWasSkipped: return wasSkipped = YES.
 * Set to YES by default
 */
@property (nonatomic, assign) BOOL skippable __attribute__((deprecated("All native videos can be skipped by user")));


/*!
 *  Video sound control
 *  Call this for example in - mediaViewStartPlaying:
 *  Set to NO by default
 */
@property (nonatomic, assign) BOOL muted __attribute__((deprecated("Contolled by user")));

/*!
 *  Video sound control
 *  Call this for example in - mediaViewStartPlaying:
 *  Default set to YES
 */
@property (nonatomic, assign) BOOL useDefaultMuteButton __attribute__((deprecated("Always YES")));

/*!
 *  Set native ad to media view. If native ad contains video it starts to cache the video and presents it when it becomes visible and the video is ready
 *
 *  @param nativeAd  Nonnul native ad
 *  @param controller Nonnul controller
 */
- (void)setNativeAd:(APDNativeAd *)nativeAd rootViewController:(UIViewController *)controller;

/*!
 *  If you use media view in custom table/collection view without helper and want to reuse
 *  media view any time, call with method before reuse
 */
- (void)clearView;

@end
