package com.ecommerce.product;

import com.ecommerce.product.category.Category;

import jakarta.validation.constraints.*;

import java.util.Set;
import java.util.List;

public record ProductRegisterRequest(
                @NotBlank @Size(min = 3) String name,
                @NotBlank @Size(min = 3) String description,
                @PositiveOrZero double price,
                @PositiveOrZero int stock,
                @NotNull Long idState,
                boolean visible,
                Set<String> images,
                List<Category> productCategories
) {}