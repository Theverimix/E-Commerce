package com.ecommerce.dto;

import com.ecommerce.entities.Category;

import java.util.List;
import java.util.Set;

public record ProductRegistrationDTO(
        String name,
        String description,
        double price,
        int stock,
        Long idState,
        boolean visible,
        List<String> images,
        Set<Category> productCategories
) {
}
