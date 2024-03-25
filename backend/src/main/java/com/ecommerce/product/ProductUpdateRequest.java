package com.ecommerce.product;

public record ProductUpdateRequest(
        String name,
        String description,
        double price,
        int stock,
        boolean visible
) {}