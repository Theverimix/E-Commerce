package com.ecommerce.product.category;

import java.util.function.Function;

import org.springframework.stereotype.Service;

@Service
public class CategoryDTOMapper implements Function<Category, CategoryDTO> {
    public CategoryDTO apply(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.isVisible()
        );
    }
}
