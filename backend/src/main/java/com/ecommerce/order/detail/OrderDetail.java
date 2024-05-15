package com.ecommerce.order.detail;

import com.ecommerce.order.Order;
import com.ecommerce.product.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "OrderDetails")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class OrderDetail {

    @EmbeddedId
    private OrderDetailKey id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    private int amount;

    private double price;

}