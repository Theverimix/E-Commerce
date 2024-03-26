package com.ecommerce.order.detail;

public record OrderDetailRequest(
        Long productId,
        int amount
) {}
