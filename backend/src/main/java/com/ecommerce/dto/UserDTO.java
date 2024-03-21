package com.ecommerce.dto;

import com.ecommerce.enums.UserRole;
import com.ecommerce.enums.UserState;

public record UserDTO(
                Long id,
                String name,
                String password,
                String email,
                UserState state,
                UserRole role) {
}