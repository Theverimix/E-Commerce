package com.ecommerce.dto;

import java.util.Date;
import java.util.Set;

import com.ecommerce.entities.Customer;
import com.ecommerce.entities.OrderDetails;
import com.ecommerce.enums.OrderStatus;

public record OrderDTO(
        Long id,
        Customer customer,
        String address,
        OrderStatus status,
        Date date,
        Set<OrderDetails> details) {
}
