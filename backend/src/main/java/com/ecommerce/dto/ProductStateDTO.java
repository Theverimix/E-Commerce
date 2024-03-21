package com.ecommerce.dto;

public record ProductStateDTO(
        Long id,
        String name,
        boolean visible
) {}