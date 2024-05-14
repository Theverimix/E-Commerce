package com.ecommerce.sale;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
public class SaleMapper implements Function<Sale, SaleResponse> {

    @Override
    public SaleResponse apply(Sale entity) {
        return Optional.ofNullable(entity)
                .map(sale -> new SaleResponse(
                        sale.getId(),
                        sale.getName(),
                        sale.getStartAt(),
                        sale.getEndAt(),
                        sale.getDiscountType(),
                        sale.getDiscountValue()
                ))
                .orElse(null);
    }
}
