package com.ecommerce.dto;

public record CustomerRegistrationDTO(
        String name,
        String password,
        String email,
        String adress,
        String phone,
        String country
) {}
