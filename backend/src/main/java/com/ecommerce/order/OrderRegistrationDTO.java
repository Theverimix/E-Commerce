package com.ecommerce.order;

import java.util.Set;

import org.hibernate.validator.constraints.NotBlank;

public record OrderRegistrationDTO(
        Long customerId,
        @NotBlank String address,
        Set<OrderDetails> details) {
}
