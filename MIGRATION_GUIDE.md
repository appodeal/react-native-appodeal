# React Native Appodeal SDK - Publisher Migration Guide

## Quick Overview

This guide shows you exactly what code changes you need to make when updating to the new React Native Appodeal SDK version.

## 🏗️ Architecture Support

This SDK version supports **both React Native architectures**:

- ✅ **Old Architecture (Paper)** - Fully supported
- ✅ **New Architecture (Fabric/TurboModules)** - Fully supported

**No configuration changes needed** - the SDK automatically detects and works with your React Native architecture.

### Migration Benefits

✅ **Zero Configuration**: Auto-detects architecture  
✅ **Better Performance**: Fabric's synchronous rendering  
✅ **Type Safety**: Full TypeScript support  
✅ **Future Proof**: Ready for React Native's evolution  
✅ **Backward Compatible**: Works with existing Paper apps

## 🔄 Required Code Changes

### 1. Import Changes

**Before:**
```typescript
import Appodeal, { AppodealAdType } from 'react-native-appodeal';
```

**After:**
```typescript
import Appodeal, { 
  AppodealAdType, 
  AppodealBanner,
  AppodealMrec,
  AppodealBannerEvents, 
  AppodealInterstitialEvents,
  AppodealRewardedEvents,
  AppodealIOSPurchaseType,
  AppodealAndroidPurchaseType
} from 'react-native-appodeal';

// For TypeScript types, use type imports
import type {
  AppodealReward,
  AppodealIOSPurchase,
  AppodealAndroidPurchase,
  AppodealPurchaseValidationResult
} from 'react-native-appodeal';
```

### 2. Component Changes

**Before (src-old):**
```typescript
// Old implementation with basic prop types
<AppodealBanner
  adSize="phone"
  placement="default"
  usesSmartSizing={true}
  onAdLoaded={() => console.log('loaded')}
  onAdFailedToLoad={() => console.log('failed')}
/>
```

**After (current):**
```typescript
// New implementation with enhanced TypeScript support
<AppodealBanner
  adSize="phone"
  placement="default"
  usesSmartSizing={true} // Still supported!
  onAdLoaded={(event) => console.log('loaded', event.nativeEvent)}
  onAdFailedToLoad={(event) => console.log('failed', event.nativeEvent)}
  onAdClicked={(event) => console.log('clicked', event.nativeEvent)}
  onAdExpired={(event) => console.log('expired', event.nativeEvent)}
/>
```

**Key Component Improvements:**
- 🎯 **Better TypeScript support** with proper event typing  
- 🎪 **Enhanced event handling** with `NativeSyntheticEvent` types
- 🏗️ **Fabric Architecture support** with codegen-generated components
- ✅ **Same Props**: All existing props (`usesSmartSizing`, `placement`, etc.) still work
- 📐 **Height auto-calculated** in both versions - no manual styling needed

### 3. Parameter Order Changes (CRITICAL)

The most important change - you must reverse the parameter order for these methods:

**Before:**
```typescript
Appodeal.setExtrasValue("someValue", "key");
Appodeal.setCustomStateValue("someValue", "key");
```

**After:**
```typescript
Appodeal.setExtrasValue("key", "someValue");
Appodeal.setCustomStateValue("key", "someValue");
```

### 4. Purchase Validation Changes

**Before:**
```typescript
Appodeal.validateAndTrackInAppPurchase(purchase, (result) => {
  console.log(result);
});
```

**After:**
```typescript
// Import purchase type enums
import { AppodealIOSPurchaseType, AppodealAndroidPurchaseType } from 'react-native-appodeal';
import type { AppodealIOSPurchase, AppodealPurchaseValidationResult } from 'react-native-appodeal';

// iOS Purchase example
const iosPurchase: AppodealIOSPurchase = {
  productId: 'com.example.product',
  productType: AppodealIOSPurchaseType.CONSUMABLE, // Use enum instead of number
  price: 9.99, // number type
  currency: 'USD',
  transactionId: 'transaction_12345',
  additionalParameters: {} // empty object instead of null
};

// Use async/await instead of callback
const result: AppodealPurchaseValidationResult = await Appodeal.validateAndTrackInAppPurchase(iosPurchase);
console.log('Validation result:', result.orderId, result.price, result.currency);
```

### 5. Removed Methods

These methods no longer exist - remove them from your code:

```typescript
// ❌ Remove these - they no longer work
Appodeal.getExtras();
Appodeal.getCustomState();
```

### 6. New Methods Available

You can now use this new method:

```typescript
// Get the native SDK version (new method)
const sdkVersion = Appodeal.getPlatformSdkVersion();
```

## 📝 Complete Code Examples

### Basic Setup

**Before:**
```typescript
import Appodeal, { AppodealAdType } from 'react-native-appodeal';

Appodeal.initialize("your-app-key", AppodealAdType.INTERSTITIAL);
Appodeal.setExtrasValue("user_id", "12345");
```

**After:**
```typescript
import Appodeal, { AppodealAdType } from 'react-native-appodeal';

Appodeal.initialize("your-app-key", AppodealAdType.INTERSTITIAL);
Appodeal.setExtrasValue("user_id", "12345"); // Same as before
```

### Purchase Validation

**Before:**
```typescript
Appodeal.validateAndTrackInAppPurchase(purchase, (result) => {
  if (result.success) {
    console.log("Purchase validated");
  }
});
```

**After:**
```typescript
try {
  const result = await Appodeal.validateAndTrackInAppPurchase(purchase);
  if (result.success) {
    console.log("Purchase validated");
  }
} catch (error) {
  console.error("Purchase validation failed:", error);
}
```

### Event Handling

**Before:**
```typescript
import { AppodealBannerEvent, AppodealInterstitialEvent } from 'react-native-appodeal';

Appodeal.addEventListener(AppodealBannerEvent.LOADED, () => {
  console.log('Banner loaded');
});

Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, () => {
  console.log('Interstitial loaded');
});
```

**After:**
```typescript
import { AppodealBannerEvents, AppodealInterstitialEvents } from 'react-native-appodeal';

Appodeal.addEventListener(AppodealBannerEvents.LOADED, () => {
  console.log('Banner loaded');
});

Appodeal.addEventListener(AppodealInterstitialEvents.LOADED, () => {
  console.log('Interstitial loaded');
});
```

**Note:** Event names are identical, just renamed from `AppodealBannerEvent` to `AppodealBannerEvents` (added 's').

## ❌ What to Remove

Remove any usage of:
- `AppodealGender` enum (no longer supported)
- `getExtras()` method
- `getCustomState()` method

## ✅ What Stays the Same

These methods work exactly the same:
- `Appodeal.initialize()`
- `Appodeal.show()`
- `Appodeal.isLoaded()`
- `Appodeal.canShow()`
- `Appodeal.hide()`
- `Appodeal.cache()`
- `Appodeal.setAutoCache()`
- `Appodeal.setTesting()`
- `Appodeal.setLogLevel()`
- `Appodeal.setUserId()`
- `Appodeal.trackInAppPurchase()`
- `Appodeal.trackEvent()`
- `Appodeal.setBidonEndpoint()` (was already available)
- `Appodeal.getBidonEndpoint()` (was already available)
- `Appodeal.getVersion()` (was already available)

## 🆕 What's New

Only one new method was added:
- `Appodeal.getPlatformSdkVersion()` - Returns the native SDK version

## 🚨 Common Errors to Fix

### Error: "setExtrasValue is not a function"
**Fix:** Change parameter order from `(value, key)` to `(key, value)`

### Error: "validateAndTrackInAppPurchase callback is not a function"
**Fix:** Remove the callback parameter and use `await` instead

### Error: "Cannot find module 'react-native-appodeal/types'"
**Fix:** Use the main package import instead: `import { AppodealAdType } from 'react-native-appodeal'`

### Error: "getExtras is not a function"
**Fix:** Remove this method call - it no longer exists

## 🔍 Quick Checklist

- [ ] Update imports to use main package (no need for separate types import)
- [ ] Change `setExtrasValue` parameter order to `(key, value)`
- [ ] Change `setCustomStateValue` parameter order to `(key, value)`
- [ ] Replace `validateAndTrackInAppPurchase` callbacks with `await`
- [ ] Remove any `getExtras()` or `getCustomState()` calls
- [ ] Remove any `AppodealGender` usage
- [ ] Update event imports: `AppodealBannerEvent` → `AppodealBannerEvents`
