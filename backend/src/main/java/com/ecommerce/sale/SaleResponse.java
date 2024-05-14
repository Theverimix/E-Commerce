package com.ecommerce.sale;

import java.util.Date;

public record SaleResponse(
        Long id,
        String name,
        Date startAt,
        Date endAt,
        DiscountsTypes discountType,
        int discountValue
) {}