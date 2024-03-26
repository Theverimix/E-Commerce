package com.ecommerce.order;

import java.util.Set;

import com.ecommerce.order.detail.OrderDetail;
import org.hibernate.validator.constraints.NotBlank;

public record OrderRegistrationDTO(
        Long customerId,
        @NotBlank String address,
        Set<OrderDetail> details) {
}
