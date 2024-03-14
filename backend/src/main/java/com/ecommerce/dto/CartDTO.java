package com.ecommerce.dto;

public record CartDTO(
                Long productId,
                Long customerId,
                int ammount) {
}