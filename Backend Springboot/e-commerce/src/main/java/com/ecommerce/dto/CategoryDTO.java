package com.ecommerce.dto;

public record CategoryDTO(
        Long id,
        String name,
        String description,
        boolean visible
) {}
