package com.ecommerce.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "carts")
public class Cart {

    @EmbeddedId
    private CartKey id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("customerId")
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private int ammount;
}
