package com.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.entities.Cart;
import com.ecommerce.services.CartService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/cart")
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

    // @GetMapping("/id")
    // public ResponseEntity<Optional<Cart>> getCartById(@RequestBody Long
    // customerID) {
    // Optional<Cart> cart =
    // cartService.getCartById(cartService.mapDTOtoCartKey(dto));
    // return ResponseEntity.ok(cart);
    // }

    @GetMapping("/")
    public List<Cart> getCartByCustomer(@RequestParam Long customerId) {
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
    public ResponseEntity<Object> deleteCart(@RequestParam Long customerId, @RequestParam Long productId) {
        cartService.deleteCart(customerId, productId);
        return ResponseEntity.ok().build();
    }
}
