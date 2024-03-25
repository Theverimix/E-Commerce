package com.ecommerce.product.state;

public record ProductStateDTO(
        Long id,
        String name,
        boolean visible
) {}