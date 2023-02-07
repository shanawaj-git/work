package com.albatha.nexthealth.pharmacies.util;

import java.util.regex.Pattern;

public final class StringUtils {

    public static Boolean caseInsensitiveContains(String string, String subString) {
        return string.toLowerCase().contains(subString.toLowerCase());
    }

    public static Boolean containsWord(String string, String subString) {
        Pattern pattern = Pattern.compile("\\b" + subString + "\\b", Pattern.CASE_INSENSITIVE);
        return pattern.matcher(string).find();
    }
}
