package com.ecommerce.dto;

import com.ecommerce.entities.Order;
import com.ecommerce.entities.Product;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailsDTO {
    private OrderDetailsKeyDTO id;

    private Product product;

    private Order order;

    private int ammount;
}
