package com.ecommerce.sale;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

public record SaleRequest(
                @NotBlank @Size(min = 3) String name,
                @NotNull Date startAt,
                @NotNull Date endAt,
                @NotNull DiscountsTypes discountType,
                int discountValue
) {}
