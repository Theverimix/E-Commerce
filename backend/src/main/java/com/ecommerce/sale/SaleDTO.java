package com.ecommerce.sale;

import java.util.Date;
import java.util.Set;

import com.ecommerce.product.Product;
import com.ecommerce.enums.DiscountsTypes;

public record SaleDTO(
        Long id,
        String name,
        Date startAt,
        Date endAt,
        DiscountsTypes discountType,
        int discountValue,
        Set<Product> products
) {}