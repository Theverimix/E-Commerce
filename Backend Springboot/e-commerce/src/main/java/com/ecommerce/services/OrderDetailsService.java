package com.ecommerce.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.OrderDetailsDTO;
import com.ecommerce.dto.OrderDetailsKeyDTO;
import com.ecommerce.entities.OrderDetails;
import com.ecommerce.entities.OrderDetailsKey;
import com.ecommerce.repositories.OrderDetailsRepository;

@Service
public class OrderDetailsService {
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrderDetailsService(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
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

    public OrderDetailsDTO mapOrderDetailsToDTO(OrderDetails orderDetails) {
        OrderDetailsDTO dto = new OrderDetailsDTO();

        dto.setId(mapOrderDetailsKeytoDTO(orderDetails.getId()));
        dto.setProduct(orderDetails.getProduct());
        dto.setOrder(orderDetails.getOrder());
        dto.setAmmount(orderDetails.getAmmount());

        return dto;
    }

    public OrderDetails mapDTOToOrderDetails(OrderDetailsDTO dto) {
        OrderDetails orderDetails = new OrderDetails();

        orderDetails.setId(mapDTOtoOrderDetailsKey(dto.getId()));
        orderDetails.setProduct(dto.getProduct());
        orderDetails.setOrder(dto.getOrder());
        orderDetails.setAmmount(dto.getAmmount());

        return orderDetails;
    }

    public OrderDetailsKeyDTO mapOrderDetailsKeytoDTO(OrderDetailsKey orderDetailsKey) {
        OrderDetailsKeyDTO dto = new OrderDetailsKeyDTO();

        dto.setOrderId(orderDetailsKey.getOrderId());
        dto.setProductId(orderDetailsKey.getProductId());

        return dto;
    }

    public OrderDetailsKey mapDTOtoOrderDetailsKey(OrderDetailsKeyDTO dto) {
        OrderDetailsKey orderDetailsKey = new OrderDetailsKey();

        orderDetailsKey.setOrderId(dto.getOrderId());
        orderDetailsKey.setProductId(dto.getProductId());

        return orderDetailsKey;
    }
}
