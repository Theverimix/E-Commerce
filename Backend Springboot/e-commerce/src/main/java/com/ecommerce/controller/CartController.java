package com.ecommerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.entities.Cart;
import com.ecommerce.services.CartService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/cart")
@Slf4j
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{customerId}")
    public List<Cart> getCartByCustomer(@PathVariable Long customerId) {
        log.warn("Customer ID = " + customerId);
        return cartService.getCartsByCustomer(customerId);
    }

    @PostMapping
    public ResponseEntity<Cart> saveCart(@RequestBody CartDTO cart) {
        Cart newCart = cartService.saveCart(cart);
        return ResponseEntity.ok(newCart);
    }

    @PutMapping
    public ResponseEntity<Cart> updateCart(@RequestBody CartDTO newCart) {
        Cart cart = cartService.updateCart(newCart);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteCart(@RequestBody CartDTO dto) {
        cartService.deleteCart(dto.customerId(), dto.productId());
        return ResponseEntity.ok().build();
    }
}
