package com.ecommerce.order;

import java.util.Date;
import java.util.Set;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.customer.CustomerDTO;

public record OrderDTO(
        Long id,
        CustomerDTO customer,
        String address,
        OrderStatus status,
        Date date,
        Set<OrderDetails> details
) {}
