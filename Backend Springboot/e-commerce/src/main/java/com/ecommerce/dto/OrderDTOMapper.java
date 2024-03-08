package com.ecommerce.dto;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.ecommerce.entities.Order;

@Service
public class OrderDTOMapper implements Function<Order, OrderDTO> {
    public OrderDTO apply(Order order) {
        return new OrderDTO(
                order.getId(),
                order.getCustomer(),
                order.getAdress(),
                order.getStatus(),
                order.getDate(),
                order.getDetails());
    }
}
