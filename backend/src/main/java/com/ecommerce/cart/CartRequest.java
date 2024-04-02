package com.ecommerce.cart;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record CartRequest(
                @NotNull @PositiveOrZero Long productId,
                @NotNull @PositiveOrZero int amount) {
}