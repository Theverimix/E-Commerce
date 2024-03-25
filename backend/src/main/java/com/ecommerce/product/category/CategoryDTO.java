package com.ecommerce.product.category;

public record CategoryDTO(
        Long id,
        String name,
        String description,
        boolean visible
) {}
