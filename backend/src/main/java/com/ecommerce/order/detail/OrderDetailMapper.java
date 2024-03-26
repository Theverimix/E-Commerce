package com.ecommerce.order.detail;

import java.util.function.Function;

import com.ecommerce.order.OrderMapper;
import com.ecommerce.product.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDetailMapper implements Function<OrderDetail, OrderDetailResponse> {

    private final ProductMapper productMapper;

    public OrderDetailResponse apply(OrderDetail detail) {
        return new OrderDetailResponse(
                detail.getOrder().getId(),
                productMapper.apply(detail.getProduct()),
                detail.getAmount()
        );
    }
}
