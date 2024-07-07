package com.ecommerce.order;

import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
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

        public List<OrderResponse> getOrdersByCustomer(Long idCustomer, String filter) {
                Customer customer = customerRepository.findById(idCustomer)
                        .orElseThrow(() -> new EntityNotFoundException("Customer with id [%s] not found.".formatted(idCustomer)));

                Map<OrderLastTime, Supplier<List<Order>>> actions = new EnumMap<>(OrderLastTime.class);
                actions.put(OrderLastTime.ALL_TIME, () -> orderRepository.findByCustomer(customer));
                actions.put(OrderLastTime.LAST_YEAR, () -> orderRepository.findByCustomerAndCreatedAtAfter(customer, LocalDateTime.now().minusYears(1)));
                actions.put(OrderLastTime.LAST_MONTH, () -> orderRepository.findByCustomerAndCreatedAtAfter(customer, LocalDateTime.now().minusMonths(1)));
                actions.put(OrderLastTime.LAST_WEEK, () -> orderRepository.findByCustomerAndCreatedAtAfter(customer, LocalDateTime.now().minusDays(7)));

                OrderLastTime type = OrderLastTime.ALL_TIME;
                for (OrderLastTime x : OrderLastTime.values()){
                        if (x.name().equals(filter)) {
                                type = x;
                        }
                }

                return actions.get(type).get()
                        .stream()
                        .map(dtoMapper)
                        .collect(Collectors.toList());
        }

        public Long saveOrder(OrderRegistrationRequest dto) {
                Customer customer = customerRepository.findById(dto.customerId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Customer with id [%s] not found.".formatted(dto.customerId())));

                Order order = new Order();
                order.setAddress(dto.address());
                order.setAddressDetail(dto.addressDetail());
                order.setAddressState(dto.addressState());
                order.setAddressCity(dto.addressCity());
                order.setFullname(dto.fullname());
                order.setZipCode(dto.zipCode());
                order.setOptionalComment(dto.optionalComment());
                order.setCustomer(customer);
                order.setStatus(OrderStatus.PENDING);
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
                return order.getId();
        }

        public Order updateOrderStatus(Long orderId, String newStatus) {
                Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));
            
                try {
                    // Convierte el String a OrderStatus
                    OrderStatus status = OrderStatus.valueOf(newStatus.toUpperCase());
                    order.setStatus(status);
                } catch (IllegalArgumentException e) {
                    // Manejo del caso en que el nuevo estado no es válido
                    throw new IllegalArgumentException("Invalid status: " + newStatus.toUpperCase());
                }
            
                return orderRepository.save(order);
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
