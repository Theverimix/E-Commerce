package com.ecommerce.order;

import java.util.Set;

import com.ecommerce.order.detail.OrderDetail;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record OrderRegistrationRequest(
                @NotNull @PositiveOrZero Long customerId,
                @NotBlank @Size(min = 3) String address,
                Set<OrderDetail> details) {
}
