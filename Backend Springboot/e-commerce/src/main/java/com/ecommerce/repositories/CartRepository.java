package com.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecommerce.entities.Cart;
import com.ecommerce.entities.CartKey;
import com.ecommerce.entities.Customer;

public interface CartRepository extends JpaRepository<Cart, CartKey> {
    @Query(value = "SELECT * FROM user WHERE customer=?", nativeQuery = true)
    public List<Cart> findByCustomer(Customer customer);
}
