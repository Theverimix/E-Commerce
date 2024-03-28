package com.ecommerce.sale;

import com.ecommerce.enums.DiscountsTypes;

import java.util.Date;

public record SaleRequest(
        String name,
        Date startAt,
        Date endAt,
        DiscountsTypes discountType,
        int discountValue
) {
}
