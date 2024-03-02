package com.ecommerce.dto;

import com.ecommerce.entities.Customer;
import com.ecommerce.entities.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {

    private CartKeyDTO id;

    private Product product;

    private Customer customer;

    private int ammount;
}
