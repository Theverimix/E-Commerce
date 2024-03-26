package com.ecommerce.user;

import com.ecommerce.enums.UserState;

public record UserUpdateRequest(
        String name,
        String password,
        String email,
        UserState state
) {}
