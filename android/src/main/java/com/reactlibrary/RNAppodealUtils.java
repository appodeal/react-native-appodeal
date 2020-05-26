package com.reactlibrary;

        import com.appodeal.ads.Appodeal;
        import com.appodeal.ads.UserSettings;
        import com.appodeal.ads.utils.Log;
        import com.explorestack.consent.Consent;


public class RNAppodealUtils {
    public static UserSettings.Gender getGenderFromString(String gender) {
        UserSettings.Gender result = UserSettings.Gender.OTHER;
        if (gender.equals("male")) {
            result = UserSettings.Gender.MALE;
        } else if (gender.equals("female")) {
            result = UserSettings.Gender.FEMALE;
        }
        return result;
    }

    public static Log.LogLevel getLogLevelFromString(String logLevel) {
        Log.LogLevel result = Log.LogLevel.none;
        if (logLevel.equals("debug")) {
            result = Log.LogLevel.debug;
        } else if (logLevel.equals("verbose")) {
            result = Log.LogLevel.verbose;
        }
        return result;
    }

    public static int getAdTypesFormRNTypes(int types) {
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
        if ((types & (1 << 6)) > 0) {
            result |= Appodeal.NON_SKIPPABLE_VIDEO;
        }
        if ((types & (1 << 8)) > 0) {
            result |= Appodeal.MREC;
        }
        return result;
    }

    public static int getConsentStatusIntFromStatus(Consent.Status status) {
        int result = 0;
        switch (status) {
            case UNKNOWN:
                result = 0;
                break;
            case NON_PERSONALIZED:
                result = 1;
                break;
            case PARTLY_PERSONALIZED:
                result = 2;
                break;
            case PERSONALIZED:
                result = 3;
                break;
        }
        return result;
    }

    public static int getConsentRegualationIntFromZone(Consent.Zone zone) {
        int result = 0;
        switch (zone) {
            case UNKNOWN:
                result = 0;
                break;
            case NONE:
                result = 1;
                break;
            case GDPR:
                result = 2;
                break;
            case CCPA:
                result = 3;
                break;
        }
        return result;
    }
}
