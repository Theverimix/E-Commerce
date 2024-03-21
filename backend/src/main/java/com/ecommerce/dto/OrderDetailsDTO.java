package com.ecommerce.dto;

public record OrderDetailsDTO(
        Long productId,
        Long orderId,
        int ammount) {
}