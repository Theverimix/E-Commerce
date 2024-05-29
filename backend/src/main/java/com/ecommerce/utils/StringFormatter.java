package com.ecommerce.utils;

public class StringFormatter {

    public static String format(String input) {
        String trimmed = input.trim();
        return trimmed.substring(0, 1).toUpperCase() + trimmed.substring(1);
    }
}
