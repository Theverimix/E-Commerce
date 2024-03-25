package com.ecommerce.cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecommerce.customer.Customer;

public interface CartRepository extends JpaRepository<Cart, CartKey> {

    @Query(value = "SELECT c FROM Cart c WHERE c.customer = :customer")
    List<Cart> findByCustomer(Customer customer);

}
