package com.ecommerce.order;

import com.ecommerce.customer.CustomerDTO;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.order.detail.OrderDetailResponse;

import java.util.Date;
import java.util.Set;

public record OrderResponse(
        Long id,
        CustomerDTO customer,
        String address,
        OrderStatus status,
        Date date,
        Set<OrderDetailResponse> details
) {}
