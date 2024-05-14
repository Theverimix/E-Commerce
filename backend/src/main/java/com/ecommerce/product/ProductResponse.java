package com.ecommerce.product;

import com.ecommerce.product.category.CategoryResponse;
import com.ecommerce.product.state.ProductStateResponse;
import com.ecommerce.sale.SaleResponse;

import java.util.Date;
import java.util.Set;
import java.util.List;

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
                List<CategoryResponse> categories,
                SaleResponse sales
) {}
