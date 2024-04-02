package com.ecommerce.exception;

public record ApiResponse(
        boolean success,
        int statusCode,
        String message,
        Object body
) {}
