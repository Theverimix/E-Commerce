package com.ecommerce.order;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.product.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderDetailsService {
    private final OrderDetailsRepository orderDetailsRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailsDTOMapper dtoMapper;

    public List<OrderDetailsDTO> getAllOrderDetails() {
        return orderDetailsRepository.findAll().stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public List<OrderDetailsDTO> getDetailsByOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElse(null);

        return orderDetailsRepository.findByOrder(order).stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public void saveOrderDetails(OrderDetailsDTO dto) {
        orderDetailsRepository.save(mapDTOToOrderDetails(dto));
    }

    public void updateOrderDetails(OrderDetailsDTO dto) {
        orderDetailsRepository.save(mapDTOToOrderDetails(dto));
    }

    public void deleteOrderDetails(@NonNull OrderDetailsKey id) {
        orderDetailsRepository.deleteById(id);
    }

    public OrderDetailsKey buildOrderDetailsKey(Long productId, Long orderId) {
        return new OrderDetailsKey(productId, orderId);
    }

    private OrderDetails mapDTOToOrderDetails(OrderDetailsDTO dto) {
        OrderDetailsKey orderDetailsKey = new OrderDetailsKey();
        orderDetailsKey.setOrderId(dto.orderId());
        orderDetailsKey.setProductId(dto.productId());

        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setId(orderDetailsKey);
        orderDetails.setProduct(productRepository.findById(dto.productId()).orElse(null));
        orderDetails.setOrder(orderRepository.findById(dto.orderId()).orElse(null));
        orderDetails.setAmmount(dto.ammount());

        return orderDetails;
    }
}
