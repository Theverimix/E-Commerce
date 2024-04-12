package com.ecommerce.user;

import com.ecommerce.enums.UserRole;
import com.ecommerce.enums.UserState;

public record UserResponse(
        Long id,
        String firstname,
        String lastname,
        String email,
        UserState state,
        UserRole role
) {}
