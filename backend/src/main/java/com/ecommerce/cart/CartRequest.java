package com.ecommerce.cart;

public record CartRequest(
        Long productId,
        int amount
) {}