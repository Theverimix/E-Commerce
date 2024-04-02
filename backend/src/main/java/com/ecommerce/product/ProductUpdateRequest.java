package com.ecommerce.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ProductUpdateRequest(
                @NotBlank @Size(min = 3) String name,
                @NotBlank @Size(min = 3) String description,
                @PositiveOrZero double price,
                @PositiveOrZero int stock,
                boolean visible) {
}