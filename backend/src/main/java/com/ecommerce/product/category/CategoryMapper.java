package com.ecommerce.product.category;

import java.util.function.Function;

import org.springframework.stereotype.Service;

@Service
public class CategoryMapper implements Function<Category, CategoryResponse> {
    public CategoryResponse apply(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.isVisible()
        );
    }
}
