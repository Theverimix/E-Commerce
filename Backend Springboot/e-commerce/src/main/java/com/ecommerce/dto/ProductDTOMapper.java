package com.ecommerce.dto;

import com.ecommerce.entities.Product;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ProductDTOMapper implements Function<Product, ProductDTO> {
    @Override
    public ProductDTO apply(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getCreatedAt(),
                product.getState(),
                product.isVisible(),
                product.getImages(),
                product.getProductCategories(),
                product.getProductSales());
    }
}
