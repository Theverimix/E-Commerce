package com.ecommerce.order;

import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;

import com.ecommerce.customer.Customer;
import com.ecommerce.customer.CustomerRepository;
import com.ecommerce.exception.PageNotFoundException;
import com.ecommerce.order.detail.OrderDetail;
import com.ecommerce.order.detail.OrderDetailKey;
import com.ecommerce.product.ProductRepository;
import com.ecommerce.utils.PageResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import static com.ecommerce.order.OrderSpecification.hasCreatedAfter;
import static com.ecommerce.order.OrderSpecification.hasCustomer;

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

        public PageResponse<OrderResponse> getAllOrders(int pageNumber, int size) throws PageNotFoundException {
                PageRequest pageRequest = PageRequest.of(pageNumber, size, Sort.by("id").ascending());
                Page<Order> page = orderRepository.findAll(pageRequest);

                if (pageNumber >= page.getTotalPages()) {
                        throw new PageNotFoundException(pageNumber);
                }

                List<OrderResponse> pageContent = page.getContent().stream()
                        .map(dtoMapper)
                        .toList();

                return new PageResponse<>(
                        pageContent,
                        page.getTotalPages(),
                        page.getTotalElements()
                );
        }

        public PageResponse<OrderResponse> getOrdersByCustomer(
                int pageNumber, int size, Long idCustomer, String filter
        )throws PageNotFoundException {
                Customer customer = customerRepository.findById(idCustomer)
                        .orElseThrow(() -> new EntityNotFoundException("Customer with id [%s] not found.".formatted(idCustomer)));

                PageRequest pageRequest = PageRequest.of(pageNumber, size, Sort.by("id").ascending());
                Specification<Order> specs = getSpecsByFilter(filter, customer);

                Page<Order> page = orderRepository.findAll(specs, pageRequest);

                if (pageNumber >= page.getTotalPages()) {
                        throw new PageNotFoundException(pageNumber);
                }

                List<OrderResponse> pageContent = page.getContent().stream()
                        .map(dtoMapper)
                        .toList();
                
                return new PageResponse<>(
                        pageContent,
                        page.getTotalPages(),
                        page.getTotalElements()
                );
        }

        public Long saveOrder(OrderRegistrationRequest dto) {
                Customer customer = customerRepository.findById(dto.customerId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Customer with id [%s] not found.".formatted(dto.customerId())));

                Order order = new Order();
                order.setAddress(dto.address());
                order.setAddressCountry(dto.addressCountry());
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

                OrderStatus status = OrderStatus.valueOf(newStatus.toUpperCase());
                order.setStatus(status);

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

        private Specification<Order> getSpecsByFilter(String filter, Customer customer) {
                Specification<Order> specs = hasCustomer(customer);

                Map<OrderLastTime, Supplier<Specification<Order>>> actions = new EnumMap<>(OrderLastTime.class);
                actions.put(OrderLastTime.ALL_TIME, () -> Specification.where(specs));
                actions.put(OrderLastTime.LAST_YEAR, () -> hasCreatedAfter(LocalDateTime.now().minusYears(1)));
                actions.put(OrderLastTime.LAST_MONTH, () -> hasCreatedAfter(LocalDateTime.now().minusMonths(1)));
                actions.put(OrderLastTime.LAST_WEEK, () -> hasCreatedAfter(LocalDateTime.now().minusWeeks(1)));

                OrderLastTime type = OrderLastTime.ALL_TIME;
                for (OrderLastTime x : OrderLastTime.values()) {
                        if (x.name().equals(filter)) {
                                type = x;
                                break;
                        }
                }
                Specification<Order> spec = actions.get(type).get();
                specs.and(spec);

                return specs;
        }
}
