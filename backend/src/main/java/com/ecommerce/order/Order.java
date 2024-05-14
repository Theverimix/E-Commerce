package com.ecommerce.order;

import com.ecommerce.customer.Customer;
import com.ecommerce.order.detail.OrderDetail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "Orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String address;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Date date;

    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> details;
}
