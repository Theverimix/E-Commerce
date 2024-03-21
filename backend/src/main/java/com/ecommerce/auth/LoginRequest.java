package com.ecommerce.auth;

public record LoginRequest(
        String email,
        String password
) {}
