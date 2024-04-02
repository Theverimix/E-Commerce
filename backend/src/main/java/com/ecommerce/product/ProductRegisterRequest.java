package com.ecommerce.product;

import com.ecommerce.product.category.Category;

import jakarta.validation.constraints.*;

import java.util.Set;

public record ProductRegisterRequest(
        @NotBlank @Size(min = 3) String name,
        @NotBlank @Size(min = 3) String description,
        @PositiveOrZero double price,
        @PositiveOrZero int stock,
        @NotNull Long idState,
        boolean visible,
        Set<String> images,
        Set<Category> productCategories) {

}