package com.ecommerce.order;

import java.util.function.Function;

import org.springframework.stereotype.Service;

@Service
public class OrderDetailsDTOMapper implements Function<OrderDetails, OrderDetailsDTO> {
    public OrderDetailsDTO apply(OrderDetails orderDetails) {
        return new OrderDetailsDTO(
                orderDetails.getProduct().getId(),
                orderDetails.getOrder().getId(),
                orderDetails.getAmmount());
    }
}
