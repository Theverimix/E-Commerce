package com.ecommerce.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.OrderDetailsDTO;
import com.ecommerce.entities.OrderDetails;
import com.ecommerce.entities.OrderDetailsKey;
import com.ecommerce.repositories.OrderDetailsRepository;
import com.ecommerce.repositories.OrderRepository;
import com.ecommerce.repositories.ProductRepository;

@Service
public class OrderDetailsService {
    private final OrderDetailsRepository orderDetailsRepository;

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    public OrderDetailsService(OrderDetailsRepository orderDetailsRepository, ProductRepository productRepository,
            OrderRepository orderRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderDetails> getAllOrderDetailss() {
        return orderDetailsRepository.findAll();
    }

    public Optional<OrderDetails> getOrderDetailsById(@NonNull OrderDetailsKey id) {
        return orderDetailsRepository.findById(id);
    }

    public OrderDetails saveOrderDetails(OrderDetailsDTO dto) {
        return orderDetailsRepository.save(mapDTOToOrderDetails(dto));
    }

    public OrderDetails updateOrderDetails(OrderDetailsDTO dto) {
        return orderDetailsRepository.save(mapDTOToOrderDetails(dto));
    }

    public void deleteOrderDetails(@NonNull OrderDetailsKey id) {
        orderDetailsRepository.deleteById(id);
    }

    // public OrderDetailsDTO mapOrderDetailsToDTO(OrderDetails orderDetails) {
    // OrderDetailsDTO dto = new OrderDetailsDTO();

    // dto.setId(mapOrderDetailsKeytoDTO(orderDetails.getId()));
    // dto.setProduct(orderDetails.getProduct());
    // dto.setOrder(orderDetails.getOrder());
    // dto.setAmmount(orderDetails.getAmmount());

    // return dto;
    // }

    public OrderDetails mapDTOToOrderDetails(OrderDetailsDTO dto) {
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
