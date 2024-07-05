package com.ecommerce.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.customer.Customer;
import com.ecommerce.customer.CustomerRepository;
import com.ecommerce.order.detail.OrderDetail;
import com.ecommerce.order.detail.OrderDetailKey;
import com.ecommerce.product.ProductRepository;
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
        private final ProductRepository productRepository;

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

        public void saveOrder(OrderRegistrationRequest dto) {
                Customer customer = customerRepository.findById(dto.customerId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Customer with id [%s] not found.".formatted(dto.customerId())));

                Order order = new Order();
                order.setAddress(dto.address());
                order.setAddressDetail(dto.addressDetail());
                order.setAddressState(dto.addressState());
                order.setAddressCity(dto.addressCity());
                order.setZipCode(dto.zipCode());
                order.setOptionalComment(dto.optionalComment());
                order.setCustomer(customer);
                order.setStatus(OrderStatus.IN_PROCESS);
                List<OrderDetail> details = dto.details().stream()
                        .map(detail -> OrderDetail.builder()
                                .id(new OrderDetailKey(detail.productId(), order.getId()))
                                .order(order)
                                .product(productRepository.findById(detail.productId()).orElseThrow(() -> new EntityNotFoundException("Product not found")))
                                .price(detail.price())
                                .amount(detail.amount())
                                .build())
                        .toList();
                order.setDetails(details);
                order.setCreatedAt(LocalDateTime.now());

                orderRepository.save(order);
        }

        // TODO
        public void updateOrder(Long id, OrderRegistrationRequest dto) {
                Order order = orderRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Order with id [%s] not found.".formatted(id)));
                order.setAddress(dto.address());

                List<OrderDetail> details = dto.details().stream()
                        .map(detail -> OrderDetail.builder()
                                .order(order)
                                .product(productRepository.findById(detail.productId()).orElseThrow(() -> new EntityNotFoundException("Product not found")))
                                .price(detail.price())
                                .amount(detail.amount())
                                .build())
                        .toList();
                order.setDetails(details);

                orderRepository.save(order);
        }

        public void deleteOrder(@NonNull Long id) {
                Order order = orderRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Order with id [%s] not found.".formatted(id)));
                orderRepository.delete(order);
        }
}
