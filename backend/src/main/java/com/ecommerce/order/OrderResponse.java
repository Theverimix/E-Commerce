package com.ecommerce.order;

import com.ecommerce.customer.CustomerResponse;
import com.ecommerce.order.detail.OrderDetailResponse;

import java.time.LocalDateTime;
import java.util.Set;

public record OrderResponse(
        Long id,
        String fullname,
        CustomerResponse customer,
        String address,
        String addressDetail,
        String addressState,
        String addressCity,
        int zipCode,
        String optionalComment,
        String status,
        LocalDateTime createdAt,
        Set<OrderDetailResponse> details
) {}
