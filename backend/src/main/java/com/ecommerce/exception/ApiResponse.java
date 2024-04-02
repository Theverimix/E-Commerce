package com.ecommerce.exception;

public class ApiResponse {

    protected boolean success;
    protected int statusCode;
    protected String message;
    protected Object body;

    public ApiResponse(boolean success, int statusCode, String message) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
    }

    public ApiResponse(boolean success, int statusCode, String message, Object body) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.body = body;
    }
}
