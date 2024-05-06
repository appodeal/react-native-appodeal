package com.appodeal.rnappodeal;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.inapp.InAppPurchase;
import com.appodeal.ads.utils.Log;
import com.appodeal.consent.ConsentStatus;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

class RNAppodealUtils {
    static Log.LogLevel getLogLevelFromString(String logLevel) {
        Log.LogLevel result = Log.LogLevel.none;
        if (logLevel.equals("debug")) {
            result = Log.LogLevel.debug;
        } else if (logLevel.equals("verbose")) {
            result = Log.LogLevel.verbose;
        }
        return result;
    }

    static int getAdTypesFormRNTypes(int types) {
        int result = 0;
        if ((types & (1 << 0)) > 0) {
            result |= Appodeal.INTERSTITIAL;
        }
        if ((types & (1 << 2)) > 0) {
            result |= Appodeal.BANNER;
        }
        if ((types & (1 << 3)) > 0) {
            result |= Appodeal.BANNER_BOTTOM;
        }
        if ((types & (1 << 4)) > 0) {
            result |= Appodeal.BANNER_TOP;
        }
        if ((types & (1 << 5)) > 0) {
            result |= Appodeal.REWARDED_VIDEO;
        }
        if ((types & (1 << 8)) > 0) {
            result |= Appodeal.MREC;
        }
        return result;
    }

    static int getRNTypesFromAdType(int types) {
        int result = 0;
        if ((types & Appodeal.INTERSTITIAL) > 0) {
            result |= 1;
        }
        if ((types & Appodeal.BANNER) > 0) {
            result |= (1 << 2);
        }
        if ((types & Appodeal.BANNER_BOTTOM) > 0) {
            result |= (1 << 3);
        }
        if ((types & Appodeal.BANNER_TOP) > 0) {
            result |= (1 << 4);
        }
        if ((types & Appodeal.REWARDED_VIDEO) > 0) {
            result |= (1 << 5);
        }
        if ((types & Appodeal.MREC) > 0) {
            result |= (1 << 8);
        }
        return result;
    }

    static int getRNAppodealConsentStatusFromStatus(ConsentStatus status) {
        switch (status) {
            case Required:
                return 1;
            case NotRequired:
                return 2;
            case Obtained:
                return 3;
            default:
                return 0;
        }
    }

    static InAppPurchase.Type getPurchaseTypeFromRNPurchaseType(int type) {
        if (type == 0) {
            return InAppPurchase.Type.InApp;
        } else {
            return InAppPurchase.Type.Subs;
        }
    }

    static int getRNPurchaseTypeFromType(InAppPurchase.Type type) {
        if (type == InAppPurchase.Type.InApp) {
            return 0;
        }
        return 1;
    }

    static Map<String, String> getMapFromReadableMap(ReadableMap map) {
        Map<String, String> result = new HashMap<>();
        Iterator<Map.Entry<String, Object>> iterator = map.getEntryIterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Object> entry = iterator.next();
            Object value = entry.getValue();
            result.put(entry.getKey(), entry.getValue().toString());
        }
        return result;
    }
}
