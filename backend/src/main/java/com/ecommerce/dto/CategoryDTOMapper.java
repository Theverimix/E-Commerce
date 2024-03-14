package com.ecommerce.dto;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.ecommerce.entities.Category;

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
