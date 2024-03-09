package com.ecommerce.services;

import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.dto.OrderDTOMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.OrderDTO;
import com.ecommerce.entities.Order;
import com.ecommerce.repositories.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderDTOMapper dtoMapper;

    public OrderService(OrderRepository orderRepository, OrderDTOMapper dtoMapper) {
        this.orderRepository = orderRepository;
        this.dtoMapper = dtoMapper;
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(@NonNull Long id) {
        return orderRepository.findById(id)
                .map(dtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Order with id [%s] not found.".formatted(id)
                ));
    }

    public void saveOrder(OrderDTO dto) {
        orderRepository.save(mapDtoToOrder(dto));
    }

    public void updateOrder(OrderDTO dto) {
        orderRepository.save(mapDtoToOrder(dto));
    }

    public void deleteOrder(@NonNull Long id) {
        orderRepository.deleteById(id);
    }

    private Order mapDtoToOrder(OrderDTO dto) {
        Order order = new Order();

        order.setId(dto.id());
        order.setCustomer(dto.customer());
        order.setAdress(dto.address());
        order.setStatus(dto.status());
        order.setDate(dto.date());
        order.setDetails(dto.details());

        return order;
    }
}
