package com.ecommerce.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.ecommerce.entities.Category;
import com.ecommerce.entities.ProductState;
import com.ecommerce.entities.Sale;

public record ProductDTO(
        Long id,
        String name,
        String description,
        double price,
        int stock,
        Date createdDate,
        ProductState state,
        boolean visible,
        List<String> images,
        Set<Category> productCategories,
        Set<Sale> productSales
){}
