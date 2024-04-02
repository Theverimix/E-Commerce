package com.ecommerce.product.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequest(
                @NotBlank @Size(min = 3) String name,
                @NotBlank @Size(min = 3) String description,
                boolean visible) {
}
