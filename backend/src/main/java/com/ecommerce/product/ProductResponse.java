package com.ecommerce.product;

import com.ecommerce.product.category.CategoryDTO;
import com.ecommerce.product.state.ProductStateDTO;
import com.ecommerce.sale.SaleDTO;

import java.util.Date;
import java.util.Set;

public record ProductResponse(
        Long id,
        String name,
        String description,
        double price,
        int stock,
        Date createdAt,
        ProductStateDTO state,
        boolean visible,
        Set<String> images,
        Set<CategoryDTO> categories,
        Set<SaleDTO> sales
) {}
