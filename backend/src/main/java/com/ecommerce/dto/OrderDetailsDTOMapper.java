package com.ecommerce.dto;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.ecommerce.entities.OrderDetails;

@Service
public class OrderDetailsDTOMapper implements Function<OrderDetails, OrderDetailsDTO> {
    public OrderDetailsDTO apply(OrderDetails orderDetails) {
        return new OrderDetailsDTO(
                orderDetails.getProduct().getId(),
                orderDetails.getOrder().getId(),
                orderDetails.getAmmount());
    }
}
