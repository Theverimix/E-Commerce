package com.ecommerce.exception;

import java.util.Date;

public record ApiResponseSerializable(
        boolean success,
        int statusCode,
        String message,
        Date timestamp,
        Object data) {

}
