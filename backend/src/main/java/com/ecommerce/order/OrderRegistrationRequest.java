package com.ecommerce.order;

import java.util.List;

import com.ecommerce.order.detail.OrderDetailRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record OrderRegistrationRequest(
                @NotNull @PositiveOrZero Long customerId,
                @NotBlank @Size(min = 3) String address,
                String addressDetail,
                @NotBlank String fullname,
                @NotBlank String addressState,
                @NotBlank String addressCity,
                @NotNull @PositiveOrZero Integer zipCode,
                String optionalComment,
                List<OrderDetailRequest> details
) {}
