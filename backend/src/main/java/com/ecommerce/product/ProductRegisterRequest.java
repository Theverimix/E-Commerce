package com.ecommerce.product;

import com.ecommerce.product.category.Category;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public record ProductRegisterRequest(
                @NotBlank @Min(3) String name,
                @NotBlank @Min(3) String description,
                @NotBlank double price,
                @NotBlank int stock,
                @NotBlank Long idState,
                @NotBlank boolean visible,
                Set<String> images,
                Set<Category> productCategories) {
}
