package com.ecommerce.dto;

import com.ecommerce.entities.Customer;
import com.ecommerce.entities.Product;

public record CartDTO(
        CartKeyDTO id,
        Product product,
        Customer customer,
        int amount
){}