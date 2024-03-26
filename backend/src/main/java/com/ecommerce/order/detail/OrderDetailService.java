package com.ecommerce.order.detail;

import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.order.Order;
import com.ecommerce.order.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.product.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderDetailService {

    private final OrderDetailRepository repository;
    private final OrderDetailMapper mapper;

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public OrderDetailResponse findById(Long orderId, Long productId) {
        OrderDetailKey key = buildOrderDetailsKey(orderId, productId);
        return repository.findById(key)
                .map(mapper)
                .orElseThrow(() -> new EntityNotFoundException("Product in order not found."));
    }

    public List<OrderDetailResponse> findDetailsByOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElse(null);

        return repository.findByOrder(order).stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public void saveOrderDetail(Long orderId, OrderDetailRequest request) {
        OrderDetail detail = mapDTOToOrderDetails(orderId, request.productId(), request.amount());
        repository.save(detail);
    }

    public void updateOrderDetail(Long orderId, OrderDetailRequest request) {
        OrderDetailKey key = buildOrderDetailsKey(orderId, request.productId());
        OrderDetail detail = repository.findById(key)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found."));

        detail.setAmount(request.amount());
        repository.save(detail);
    }

    public void deleteOrderDetail(@NonNull Long orderId, @NonNull Long productId) {
        repository.deleteById(
                buildOrderDetailsKey(orderId, productId)
        );
    }

    private OrderDetailKey buildOrderDetailsKey(Long orderId, Long productId) {
        return new OrderDetailKey(productId, orderId);
    }

    private OrderDetail mapDTOToOrderDetails(Long orderId, Long productId, int amount) {
        OrderDetail detail = new OrderDetail();
        detail.setProduct(productRepository.findById(productId).orElse(null));
        detail.setOrder(orderRepository.findById(orderId).orElse(null));
        detail.setAmount(amount);
        return detail;
    }
}
