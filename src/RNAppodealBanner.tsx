/**
 * Appodeal Banner Ad Component
 *
 * A React Native component for displaying banner ads using the Appodeal SDK.
 * Banner ads are typically 320x50 pixels for phones and 728x90 for tablets.
 */
import AppodealBannerView, {
  type NativeProps,
} from './specs/AppodealBannerViewNativeComponent';

/**
 * Supported ad sizes for banner ads
 */
type AdSize = 'phone' | 'tablet';

/**
 * Appodeal Banner Ad Component
 *
 * Renders a banner ad with automatic height adjustment based on device type.
 * Supports both phone and tablet layouts with appropriate sizing.
 *
 * @param props - Component props including adSize, style, and event handlers
 * @returns React component for banner ads
 */
const AppodealBanner = ({ adSize = 'phone', style, ...rest }: NativeProps) => {
  // Height mapping for different device types
  const heightMap: Record<AdSize, number> = { phone: 50, tablet: 90 };

  return (
    <AppodealBannerView
      adSize={adSize}
      style={[style, { height: heightMap[adSize as AdSize] }]}
      {...rest}
    />
  );
};

export default AppodealBanner;
