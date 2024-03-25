package com.ecommerce.cart;

public record CartDTO(
        Long productId,
        Long customerId,
        int ammount) {
}