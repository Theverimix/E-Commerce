package com.ecommerce.product.state;

public record ProductStateResponse(
        Long id,
        String name,
        boolean visible
) {}