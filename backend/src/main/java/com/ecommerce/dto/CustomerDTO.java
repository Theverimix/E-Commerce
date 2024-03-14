package com.ecommerce.dto;

import com.ecommerce.enums.UserRole;
import com.ecommerce.enums.UserState;

import java.util.Date;

public record CustomerDTO(
        Long id,
        String name,
        String email,
        UserState state,
        UserRole role,
        String address,
        Date registerDate,
        String country,
        String phone
) {}
