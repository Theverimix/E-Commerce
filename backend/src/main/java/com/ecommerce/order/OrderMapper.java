package com.ecommerce.order;

import java.util.function.Function;
import java.util.stream.Collectors;

import com.ecommerce.customer.CustomerMapper;
import com.ecommerce.order.detail.OrderDetailMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderMapper implements Function<Order, OrderResponse> {

    private final CustomerMapper dtoMapper;
    private final OrderDetailMapper detailMapper;

    public OrderResponse apply(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getFullname(),
                dtoMapper.apply(order.getCustomer()),
                order.getAddress(),
                order.getAddressCountry(),
                order.getAddressDetail(),
                order.getAddressState(),
                order.getAddressCity(),
                order.getZipCode(),
                order.getOptionalComment(),
                order.getStatus().getName(),
                order.getCreatedAt(),
                order.getDetails().stream()
                        .map(detailMapper)
                        .collect(Collectors.toSet())
        );
    }
}
