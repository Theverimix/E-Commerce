package com.ecommerce.dto;

import com.ecommerce.entities.OrderDetails;

import java.util.Set;

public record OrderRegistrationDTO(
                Long customerId,
                @NotBlank String address,
                Set<OrderDetails> details) {
}
