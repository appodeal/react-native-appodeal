package com.appodeal.rnappodeal;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.UserSettings;
import com.appodeal.ads.inapp.InAppPurchase;
import com.appodeal.ads.regulator.CCPAUserConsent;
import com.appodeal.ads.regulator.GDPRUserConsent;
import com.appodeal.ads.utils.Log;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;


class RNAppodealUtils {
    public static UserSettings.Gender getGenderFromString(String gender) {
        UserSettings.Gender result = UserSettings.Gender.OTHER;
        if (gender.equals("male")) {
            result = UserSettings.Gender.MALE;
        } else if (gender.equals("female")) {
            result = UserSettings.Gender.FEMALE;
        }
        return result;
    }

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

    static CCPAUserConsent getCCPAUserConsentFromRNCCPAUserConsent(int consent) {
        CCPAUserConsent status = CCPAUserConsent.Unknown;
        if (consent == 1) {
            status = CCPAUserConsent.OptIn;
        } else if (consent == 2) {
            status = CCPAUserConsent.OptOut;
        }
        return status;
    }

    static GDPRUserConsent getGDPRUserConsentFromRNGDPRUserConsent(int consent) {
        GDPRUserConsent status = GDPRUserConsent.Unknown;
        if (consent == 1) {
            status = GDPRUserConsent.Personalized;
        } else if (consent == 2) {
            status = GDPRUserConsent.NonPersonalized;
        }
        return status;
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
