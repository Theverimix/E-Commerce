package com.ecommerce.product;

import jakarta.validation.constraints.*;

import java.util.Set;
import java.util.List;

public record ProductRegisterRequest(
            @NotBlank @Size(min = 3) String name,
            @NotBlank @Size(min = 3) String description,
            @PositiveOrZero double price,
            @PositiveOrZero int stock,
            @NotNull Long state,
            boolean visible,
            Set<String> images,
            List<Long> categories
) {}