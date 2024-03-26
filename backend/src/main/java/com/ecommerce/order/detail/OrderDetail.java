package com.ecommerce.order.detail;

import com.ecommerce.order.Order;
import com.ecommerce.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "OrderDetails")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
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
}
