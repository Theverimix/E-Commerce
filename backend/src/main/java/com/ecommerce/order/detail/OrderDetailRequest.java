package com.ecommerce.order.detail;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record OrderDetailRequest(
                @NotNull @PositiveOrZero Long productId,
                @NotNull @PositiveOrZero int amount,
                @NotNull @PositiveOrZero double price
) { }
