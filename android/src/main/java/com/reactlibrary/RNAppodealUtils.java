package com.reactlibrary;

import com.appodeal.ads.UserSettings;
import com.appodeal.ads.utils.Log;

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
}
