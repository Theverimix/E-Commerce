package com.ecommerce.order;

import com.ecommerce.customer.Customer;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class OrderSpecification {

    public static Specification<Order> hasCustomer(Customer customer) {
        return (root, query, builder) -> builder.equal(root.get("customer"), customer);
    }

    public static Specification<Order> hasCreatedAfter(LocalDateTime created) {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("createdAt"), created);
    }
}
