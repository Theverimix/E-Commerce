package com.ecommerce.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.OrderDTO;
import com.ecommerce.entities.Order;
import com.ecommerce.repositories.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(@NonNull Long id) {
        return orderRepository.findById(id);
    }

    public Order saveOrder(OrderDTO dto) {
        return orderRepository.save(mapDTOToOrder(dto));
    }

    public Order updateOrder(OrderDTO dto) {
        return orderRepository.save(mapDTOToOrder(dto));
    }

    public void deleteOrder(@NonNull Long id) {
        orderRepository.deleteById(id);
    }

    public OrderDTO mapOrderToDTO(Order order) {
        OrderDTO dto = new OrderDTO();

        dto.setId(order.getId());
        dto.setCustomer(order.getCustomer());
        dto.setAdress(order.getAdress());
        dto.setStatus(order.getStatus());
        dto.setDate(order.getDate());
        dto.setDetails(order.getDetails());

        return dto;
    }

    public Order mapDTOToOrder(OrderDTO dto) {
        Order order = new Order();

        order.setId(dto.getId());
        order.setCustomer(dto.getCustomer());
        order.setAdress(dto.getAdress());
        order.setStatus(dto.getStatus());
        order.setDate(dto.getDate());
        order.setDetails(dto.getDetails());

        return order;
    }
}
