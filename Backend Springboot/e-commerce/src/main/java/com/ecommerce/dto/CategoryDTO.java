package com.ecommerce.dto;

import java.util.Set;

import com.ecommerce.entities.Product;

public record CategoryDTO(
        Long id,
        String name,
        String description,
        boolean visible,
        Set<Product> products
) {}
