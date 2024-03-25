package com.ecommerce.order;

public record OrderDetailsDTO(
        Long productId,
        Long orderId,
        int ammount) {
}