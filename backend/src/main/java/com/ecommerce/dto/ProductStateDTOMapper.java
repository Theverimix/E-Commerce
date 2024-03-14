package com.ecommerce.dto;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.ecommerce.entities.ProductState;

@Service
public class ProductStateDTOMapper implements Function<ProductState, ProductStateDTO> {
    @Override
    public ProductStateDTO apply(ProductState productState) {
        return new ProductStateDTO(
                productState.getId(),
                productState.getName(),
                productState.isVisible());
    }
}
