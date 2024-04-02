package com.ecommerce.product.state;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductStateRequest(
                @NotBlank @Size(min = 3) String name,
                boolean visible) {
}
