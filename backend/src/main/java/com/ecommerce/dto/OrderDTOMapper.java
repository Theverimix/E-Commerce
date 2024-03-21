package com.ecommerce.dto;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.ecommerce.entities.Order;

@Service
public class OrderDTOMapper implements Function<Order, OrderDTO> {

    private final CustomerDTOMapper dtoMapper;

    public OrderDTOMapper(CustomerDTOMapper dtoMapper) {
        this.dtoMapper = dtoMapper;
    }

    public OrderDTO apply(Order order) {
        return new OrderDTO(
                order.getId(),
                dtoMapper.apply(order.getCustomer()),
                order.getAdress(),
                order.getStatus(),
                order.getDate(),
                order.getDetails());
    }
}
