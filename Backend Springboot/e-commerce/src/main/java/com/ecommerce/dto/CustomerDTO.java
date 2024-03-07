package com.ecommerce.dto;

import com.ecommerce.entities.Order;
import com.ecommerce.enums.UserRole;
import com.ecommerce.enums.UserState;

import java.util.Date;
import java.util.List;

public record CustomerDTO(
        Long id,
        String name,
        String password,
        String email,
        UserState state,
        UserRole role,
        String address,
        Date registerDate,
        String country,
        String phone,
        List<Order> orders
) {}
