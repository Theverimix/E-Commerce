package com.ecommerce.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.dto.OrderDTOMapper;
import com.ecommerce.dto.OrderRegistrationDTO;
import com.ecommerce.entities.Customer;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.repositories.CustomerRepository;
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
    private final CustomerRepository customerRepository;

    public OrderService(OrderRepository orderRepository, OrderDTOMapper dtoMapper, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.dtoMapper = dtoMapper;
        this.customerRepository = customerRepository;
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

    public List<OrderDTO> getOrdersByCustomer(Long idCustomer) {
        Customer customer = customerRepository.findById(idCustomer)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Customer with id [%s] not found.".formatted(idCustomer)
                ));
        return orderRepository.findByCustomer(customer).stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public void saveOrder(OrderRegistrationDTO dto) {
        Customer customer = customerRepository.findById(dto.customerId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Customer with id [%s] not found.".formatted(dto.customerId())
                ));

        Order order = new Order();
        order.setAdress(dto.address());
        order.setCustomer(customer);
        order.setDate(new Date());
        order.setDetails(dto.details());
        order.setStatus(OrderStatus.IN_PROCESS);
        orderRepository.save(order);
    }

    public void updateOrder(Long id, OrderRegistrationDTO dto) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Order with id [%s] not found.".formatted(id)
                ));
        order.setAdress(dto.address());
        order.setDetails(dto.details());
        orderRepository.save(order);
    }

    public void deleteOrder(@NonNull Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Order with id [%s] not found.".formatted(id)
                ));
        orderRepository.delete(order);
    }
}
