
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class YMASizeConstraint;

/**
 * YMASizeConstraintType should be used to configure image sizes with YMASizeConstraint.
 */
typedef NS_ENUM(NSInteger, YMASizeConstraintType) {
    YMASizeConstraintTypeFixed,
    YMASizeConstraintTypeFixedBannerRatio,
    YMASizeConstraintTypePreferredBannerRatio
};

/**
 * YMALabelAppearance provides interfaces for labels customization.
 * Use YMAMutableLabelAppearance to change appearance values, e.g. @p [appearance mutableCopy].
 */
@interface YMALabelAppearance : NSObject <NSCopying, NSMutableCopying>

/**
 * Label font.
 */
@property (nonatomic, strong, readonly) UIFont *font;

/**
 * Label text color.
 */
@property (nonatomic, strong, readonly) UIColor *textColor;

/**
 * Returns label appearance configured with font and text color.
 *
 * @param font Label font.
 * @param textColor Label text color.
 *
 * @return Label appearance.
 */
+ (instancetype)appearanceWithFont:(UIFont *)font
                         textColor:(UIColor *)textColor;

@end

/**
 * Mutable version of YMALabelAppearance, which allows to change appearance values.
 */
@interface YMAMutableLabelAppearance : YMALabelAppearance

/**
 * Label font.
 */
@property (nonatomic, strong) UIFont *font;

/**
 * Label text color.
 */
@property (nonatomic, strong) UIColor *textColor;

@end

/**
 * YMAButtonAppearance provides interfaces for buttons customization.
 * Use YMAMutableButtonAppearance to change appearance values, e.g. @p [appearance mutableCopy].
 */
@interface YMAButtonAppearance : NSObject <NSCopying, NSMutableCopying>

/**
 * Text label appearance.
 */
@property (nonatomic, copy, readonly) YMALabelAppearance *textAppearance;

/**
 * Button text color for highlighted state.
 */
@property (nonatomic, strong, readonly) UIColor *highlightedTextColor;

/**
 * Button background color for normal state.
 */
@property (nonatomic, strong, readonly) UIColor *normalColor;

/**
 * Button background color for highlighted state.
 */
@property (nonatomic, strong, readonly) UIColor *highlightedColor;

/**
 * Button border color.
 */
@property (nonatomic, strong, readonly) UIColor *borderColor;

/**
 * Button border width.
 */
@property (nonatomic, assign, readonly) CGFloat borderWidth;

/**
 * Returns button appearance configured with title appearance and background colors.
 *
 * @param textAppearance Title label appearance.
 * @param normalColor Background color for normal state.
 * @param highlightedColor Background color for highlighted state.
 * @param borderColor Button border color.
 * @param borderWidth Button border width.
 *
 * @return Button appearance.
 */
+ (instancetype)appearanceWithTextAppearance:(YMALabelAppearance *)textAppearance
                                 normalColor:(UIColor *)normalColor
                            highlightedColor:(UIColor *)highlightedColor
                                 borderColor:(UIColor *)borderColor
                                 borderWidth:(CGFloat)borderWidth;

/**
 * Returns button appearance configured with title appearance, highlighted text color, border and background colors.
 *
 * @param textAppearance Title label appearance.
 * @param highlightedTextColor Text color for highlighted state.
 * @param normalColor Background color for normal state.
 * @param highlightedColor Background color for highlighted state.
 * @param borderColor Button border color.
 * @param borderWidth Button border width.
 *
 * @return Button appearance.
 */
+ (instancetype)appearanceWithTextAppearance:(YMALabelAppearance *)textAppearance
                        highlightedTextColor:(UIColor *)highlightedTextColor
                                 normalColor:(UIColor *)normalColor
                            highlightedColor:(UIColor *)highlightedColor
                                 borderColor:(UIColor *)borderColor
                                 borderWidth:(CGFloat)borderWidth;

@end

/**
 * Mutable version of YMAButtonAppearance, which allows to change appearance values.
 */
@interface YMAMutableButtonAppearance : YMAButtonAppearance

/**
 * Text label appearance.
 */
@property (nonatomic, copy) YMALabelAppearance *textAppearance;

/**
 * Button text color for highlighted state.
 */
@property (nonatomic, strong) UIColor *highlightedTextColor;

/**
 * Button background color for normal state.
 */
@property (nonatomic, strong) UIColor *normalColor;

/**
 * Button background color for highlighted state.
 */
@property (nonatomic, strong) UIColor *highlightedColor;

/**
 * Button border color.
 */
@property (nonatomic, strong) UIColor *borderColor;

/**
 * Button border width.
 */
@property (nonatomic, assign) CGFloat borderWidth;

@end

/**
 * YMARatingAppearance provides interfaces for star rating view customization.
 * Use YMAMutableRatingAppearance to change appearance values, e.g. @p [appearance mutableCopy].
 */
@interface YMARatingAppearance : NSObject <NSCopying, NSMutableCopying>

/**
 * Color for empty star.
 */
@property (nonatomic, strong, readonly) UIColor *emptyStarColor;

/**
 * Color for filled star.
 */
@property (nonatomic, strong, readonly) UIColor *filledStarColor;

/**
 * Preferred size of one star. If value of size is larger than size that fits designated space,
 * then size is reduced to fit this space.
 */
@property (nonatomic, assign, readonly) CGFloat preferredStarSize;

/**
 * Returns star rating appearance configured with star colors and preferred size.
 *
 * @param emptyStarColor Color for empty star.
 * @param filledStarColor Color for filled star.
 * @param starSize Preferred star size.
 *
 * @return Star rating appearance.
 */
+ (instancetype)appearanceWithEmptyStarColor:(UIColor *)emptyStarColor
                             filledStarColor:(UIColor *)filledStarColor
                                    starSize:(CGFloat)starSize;

@end

/**
 * Mutable version of YMARatingAppearance, which allows to change appearance values.
 */
@interface YMAMutableRatingAppearance : YMARatingAppearance

/**
 * Color for empty star.
 */
@property (nonatomic, strong) UIColor *emptyStarColor;

/**
 * Color for filled star.
 */
@property (nonatomic, strong) UIColor *filledStarColor;

/**
 * Preferred size of one star. If value of size is larger than size that fits designated space,
 * then size is reduced to fit this space.
 */
@property (nonatomic, assign) CGFloat preferredStarSize;

@end

/**
 * YMAImageAppearance provides interfaces for images customization.
 * Use YMAMutableImageAppearance to change appearance values, e.g. @p [appearance mutableCopy].
 */
@interface YMAImageAppearance : NSObject <NSCopying, NSMutableCopying>

/**
 * Size constraint.
 */
@property (nonatomic, strong, readonly) YMASizeConstraint *widthConstraint;

/**
 * Returns image appearance configured with width constraint.
 *
 * @param widthConstraint Constraint which defines the way image width should be calculated.
 *
 * @return Image appearance.
 */
+ (instancetype)appearanceWithWidthConstraint:(YMASizeConstraint *)widthConstraint;

@end

/**
 * Mutable version of YMAImageAppearance, which allows to change appearance values.
 */
@interface YMAMutableImageAppearance : YMAImageAppearance

/**
 * Size constraint.
 */
@property (nonatomic, strong) YMASizeConstraint *widthConstraint;

@end

/**
 * YMASizeConstraint defines the way size is calculated based on banner size.
 * Use YMAMutableSizeConstraint to change appearance values, e.g. @p [appearance mutableCopy].
 */
@interface YMASizeConstraint : NSObject <NSCopying, NSMutableCopying>

/**
 * Constraint type.
 *
 * YMASizeConstraintTypeFixed defines fixed size which never changes.
 * YMASizeConstraintTypeFixedBannerRatio defines fixed asset size to banner size ratio which never changes.
 * YMASizeConstraintTypePreferredBannerRatio defines asset size to banner size ratio
 * which may change to fit real image size.
 */
@property (nonatomic, assign, readonly) YMASizeConstraintType type;

/**
 * Constraint value.
 *
 * Fixed value in points for YMASizeConstraintTypeFixed, e.g. 140.
 * Ratio value for YMASizeConstraintTypeFixedBannerRatio between 0 and 1,
 * e.g. 0.5 value means size of 100 points for 200 banner size.
 * Ratio value for YMASizeConstraintTypePreferredBannerRatio between 0 and 1.
 */
@property (nonatomic, assign, readonly) CGFloat value;

/**
 * Returns size constraint configured with size type and value.
 *
 * @param type Constraint size type. @see YMASizeConstraintType.
 * @param value Constraint value. Value meaning differs depending on size type.
 *
 * @return Size constraint.
 */
+ (instancetype)constraintWithType:(YMASizeConstraintType)type value:(CGFloat)value;

@end

/**
 * Mutable version of YMASizeConstraint, which allows to change constraint values.
 */
@interface YMAMutableSizeConstraint : YMASizeConstraint

/**
 * Constraint type.
 *
 * YMASizeConstraintTypeFixed defines fixed size which never changes.
 * YMASizeConstraintTypeFixedBannerRatio defines fixed asset size to banner size ratio which never changes.
 * YMASizeConstraintTypePreferredBannerRatio defines asset size to banner size ratio
 * which may change to fit real image size.
 */
@property (nonatomic, assign) YMASizeConstraintType type;

/**
 * Constraint value.
 *
 * Fixed value in points for YMASizeConstraintTypeFixed, e.g. 140.
 * Ratio value for YMASizeConstraintTypeFixedBannerRatio between 0 and 1,
 * e.g. 0.5 value means size of 100 points for 200 banner size.
 * Ratio value for YMASizeConstraintTypePreferredBannerRatio between 0 and 1.
 */
@property (nonatomic, assign) CGFloat value;

@end

NS_ASSUME_NONNULL_END
