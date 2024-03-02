package com.ecommerce.dto;

import java.util.Set;

import com.ecommerce.entities.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;

    private String name;

    private String description;

    private boolean visible;

    Set<Product> products;
}
