package com.ecommerce.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.ecommerce.entities.Category;
import com.ecommerce.entities.ProductState;
import com.ecommerce.entities.Sale;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;

    private String name;

    private String description;

    private double price;

    private int stock;

    private Date created_Date;

    private ProductState state;

    private boolean visible;

    private List<String> images;

    Set<Category> productCategories;

    Set<Sale> productSales;
}
