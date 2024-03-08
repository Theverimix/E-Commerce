package com.ecommerce.dto;

import com.ecommerce.entities.Sale;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SaleDTOMapper implements Function<Sale, SaleDTO> {

    @Override
    public SaleDTO apply(Sale sale) {
        return new SaleDTO(
                sale.getId(),
                sale.getName(),
                sale.getStartAt(),
                sale.getEndAt(),
                sale.getDiscountType(),
                sale.getDiscountValue(),
                sale.getProducts()
        );
    }
}
