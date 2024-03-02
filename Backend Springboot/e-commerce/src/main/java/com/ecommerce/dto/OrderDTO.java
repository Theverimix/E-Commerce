package com.ecommerce.dto;

import java.util.Date;
import java.util.Set;

import com.ecommerce.entities.Customer;
import com.ecommerce.entities.OrderDetails;
import com.ecommerce.enums.OrderStatus;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;

    private Customer customer;

    private String adress;

    private OrderStatus status;

    private Date date;

    private Set<OrderDetails> details;
}
