package com.ecommerce.product;

import com.ecommerce.product.category.CategoryMapper;
import com.ecommerce.product.state.ProductStateMapper;
import com.ecommerce.sale.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductMapper implements Function<Product, ProductResponse> {

    private final ProductStateMapper stateMapper;
    private final CategoryMapper categoryMapper;
    private final SaleMapper saleMapper;

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
                product.getCategories().stream()
                        .map(categoryMapper)
                        .collect(Collectors.toList()),
                product.getSales().stream()
                        .map(saleMapper)
                        .collect(Collectors.toList()));
    }
}
