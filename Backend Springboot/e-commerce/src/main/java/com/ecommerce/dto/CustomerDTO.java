package com.ecommerce.dto;

import com.ecommerce.entities.Order;
import com.ecommerce.enums.UsersRoles;
import com.ecommerce.enums.UsersStates;

import java.util.Date;
import java.util.List;

public record CustomerDTO(
        Long id,
        String name,
        String password,
        String email,
        UsersStates state,
        UsersRoles role,
        String address,
        Date registerDate,
        String country,
        String phone,
        List<Order> orders
) {}
