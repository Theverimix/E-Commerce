package com.ecommerce.user;

public record UserResponse(
        Long id,
        String firstname,
        String lastname,
        String email,
        UserState state,
        UserRole role
) {}
