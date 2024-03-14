package com.ecommerce.dto;

public record CustomerRegistrationDTO(
        String name,
        String password,
        String email,
        String address,
        String phone,
        String country
) {}
