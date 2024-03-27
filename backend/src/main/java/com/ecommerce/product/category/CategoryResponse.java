package com.ecommerce.product.category;

public record CategoryResponse(
        Long id,
        String name,
        String description,
        boolean visible
) {}
