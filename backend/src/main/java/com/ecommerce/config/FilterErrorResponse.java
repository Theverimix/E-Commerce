package com.ecommerce.config;

import io.jsonwebtoken.JwtException;

public class FilterErrorResponse {
    private String errorMessage;

    public FilterErrorResponse(JwtException e) {
        this.errorMessage = e.getMessage();
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
