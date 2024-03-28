package com.ecommerce.sale;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SaleMapper implements Function<Sale, SaleResponse> {

    @Override
    public SaleResponse apply(Sale sale) {
        return new SaleResponse(
                sale.getId(),
                sale.getName(),
                sale.getStartAt(),
                sale.getEndAt(),
                sale.getDiscountType(),
                sale.getDiscountValue()
        );
    }
}
