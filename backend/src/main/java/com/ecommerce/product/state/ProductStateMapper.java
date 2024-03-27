package com.ecommerce.product.state;

import java.util.function.Function;

import org.springframework.stereotype.Service;

@Service
public class ProductStateMapper implements Function<ProductState, ProductStateResponse> {
    @Override
    public ProductStateResponse apply(ProductState productState) {
        return new ProductStateResponse(
                productState.getId(),
                productState.getName(),
                productState.isVisible());
    }
}
