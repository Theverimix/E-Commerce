package com.ecommerce.order;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.customer.Customer;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.customer.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

        private final OrderRepository orderRepository;
        private final OrderMapper dtoMapper;
        private final CustomerRepository customerRepository;

        public OrderResponse getOrderById(@NonNull Long id) {
                return orderRepository.findById(id)
                                .map(dtoMapper)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Order with id [%s] not found.".formatted(id)));
        }

        public List<OrderResponse> getAllOrders() {
                return orderRepository.findAll().stream()
                                .map(dtoMapper)
                                .collect(Collectors.toList());
        }

        public List<OrderResponse> getOrdersByCustomer(Long idCustomer) {
                Customer customer = customerRepository.findById(idCustomer)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Customer with id [%s] not found.".formatted(idCustomer)));
                return orderRepository.findByCustomer(customer).stream()
                                .map(dtoMapper)
                                .collect(Collectors.toList());
        }

        public void saveOrder(OrderRegistrationDTO dto) {
                Customer customer = customerRepository.findById(dto.customerId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Customer with id [%s] not found.".formatted(dto.customerId())));

                Order order = new Order();
                order.setAddress(dto.address());
                order.setCustomer(customer);
                order.setDate(new Date());
                order.setDetails(dto.details());
                order.setStatus(OrderStatus.IN_PROCESS);
                orderRepository.save(order);
        }

        public void updateOrder(Long id, OrderRegistrationDTO dto) {
                Order order = orderRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Order with id [%s] not found.".formatted(id)));
                order.setAddress(dto.address());
                order.setDetails(dto.details());
                orderRepository.save(order);
        }

        public void deleteOrder(@NonNull Long id) {
                Order order = orderRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Order with id [%s] not found.".formatted(id)));
                orderRepository.delete(order);
        }
}
