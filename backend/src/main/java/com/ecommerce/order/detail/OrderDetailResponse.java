package com.ecommerce.order.detail;

import com.ecommerce.product.ProductResponse;

public record OrderDetailResponse(
        Long orderId,
        ProductResponse product,
        int amount

) {}
