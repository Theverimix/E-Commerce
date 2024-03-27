package com.ecommerce.product;

import com.ecommerce.product.category.CategoryResponse;
import com.ecommerce.product.state.ProductStateResponse;
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
        ProductStateResponse state,
        boolean visible,
        Set<String> images,
        Set<CategoryResponse> categories,
        Set<SaleDTO> sales
) {}
