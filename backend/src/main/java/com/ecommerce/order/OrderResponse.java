package com.ecommerce.order;

import com.ecommerce.customer.CustomerResponse;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.order.detail.OrderDetailResponse;

import java.util.Date;
import java.util.Set;

public record OrderResponse(
        Long id,
        CustomerResponse customer,
        String address,
        String status,
        Date date,
        Set<OrderDetailResponse> details
) {}
