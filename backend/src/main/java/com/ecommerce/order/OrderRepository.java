package com.ecommerce.order;

import com.ecommerce.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    //@Query(value = "SELECT o FROM Order o WHERE o.customer = :customer")
    //List<Order> findByCustomer(Customer customer);

    List<Order> findByCustomer(Customer customer);

}