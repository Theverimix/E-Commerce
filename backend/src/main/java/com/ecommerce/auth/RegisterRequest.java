package com.ecommerce.auth;

public record RegisterRequest(
        String name,
        String password,
        String email
) {}
