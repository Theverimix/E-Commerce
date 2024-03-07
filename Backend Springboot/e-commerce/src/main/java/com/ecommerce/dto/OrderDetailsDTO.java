package com.ecommerce.dto;

import com.ecommerce.entities.Order;
import com.ecommerce.entities.Product;

public record OrderDetailsDTO(
        OrderDetailsKeyDTO id,
        Product product,
        Order order,
        int amount
) {}