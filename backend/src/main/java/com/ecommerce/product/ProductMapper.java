package com.ecommerce.product;

import com.ecommerce.product.category.CategoryDTOMapper;
import com.ecommerce.product.state.ProductStateDTOMapper;
import com.ecommerce.sale.SaleDTOMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductMapper implements Function<Product, ProductResponse> {

    private final ProductStateDTOMapper stateMapper;
    private final CategoryDTOMapper categoryMapper;
    private final SaleDTOMapper saleMapper;

    @Override
    public ProductResponse apply(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getCreatedAt(),
                stateMapper.apply(product.getState()),
                product.isVisible(),
                product.getImages(),
                product.getProductCategories().stream()
                        .map(categoryMapper)
                        .collect(Collectors.toSet()),
                product.getProductSales().stream()
                        .map(saleMapper)
                        .collect(Collectors.toSet())
        );
    }
}
