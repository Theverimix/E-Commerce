package com.ecommerce.product;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.ecommerce.product.category.Category;
import com.ecommerce.sale.Sale;

public record ProductDTO(
                Long id,
                String name,
                String description,
                double price,
                int stock,
                Date createdDate,
                Long stateId,
                boolean visible,
                List<String> images,
                Set<Category> productCategories,
                Set<Sale> productSales) {
}
