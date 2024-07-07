package com.ecommerce.order;

import com.ecommerce.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomer(Customer customer);
    List<Order> findByCustomerAndCreatedAtAfter(Customer customer, LocalDateTime createdAt);

}