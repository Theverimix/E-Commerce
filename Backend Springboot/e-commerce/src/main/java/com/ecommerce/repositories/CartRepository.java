package com.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entities.Cart;
import com.ecommerce.entities.CartKey;

public interface CartRepository extends JpaRepository<Cart, CartKey> {

}
