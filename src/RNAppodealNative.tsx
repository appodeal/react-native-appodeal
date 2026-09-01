/**
 * Appodeal Native Ad Component — stock templates only.
 *
 * Templates: newsFeed / appWall / contentStream.
 * For custom JSX layouts use AppodealNativeAdView + asset views.
 */
import AppodealNativeView, {
  type NativeProps,
} from './specs/AppodealNativeViewNativeComponent';

const AppodealNative = ({
  adTemplate = 'contentStream',
  placement = 'default',
  style,
  ...rest
}: NativeProps) => {
  return (
    <AppodealNativeView
      adTemplate={adTemplate}
      placement={placement}
      style={style}
      {...rest}
    />
  );
};

export default AppodealNative;
