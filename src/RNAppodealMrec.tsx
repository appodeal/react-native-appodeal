/**
 * Appodeal MREC Ad Component
 *
 * A React Native component for displaying MREC (Medium Rectangle) ads using the Appodeal SDK.
 * MREC ads are typically 300x250 pixels and provide more engaging ad experiences.
 * These ads are larger than banners and offer better user engagement.
 */
import AppodealMrecView, {
  type NativeProps,
} from './specs/AppodealMrecViewNativeComponent';

/**
 * Appodeal MREC Ad Component
 *
 * Renders a MREC (Medium Rectangle) ad with fixed 300x250 dimensions.
 * MREC ads provide more space for creative content and better user engagement
 * compared to standard banner ads.
 *
 * @param props - Component props including placement, style, and event handlers
 * @returns React component for MREC ads
 */
const AppodealMrec = ({ style, ...rest }: NativeProps) => {
  return <AppodealMrecView style={[style, { height: 250 }]} {...rest} />;
};

export default AppodealMrec;
