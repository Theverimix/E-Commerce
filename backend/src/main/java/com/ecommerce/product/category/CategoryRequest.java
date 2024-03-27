package com.ecommerce.product.category;

public record CategoryRequest(
        String name,
        String description,
        boolean visible
) {}
