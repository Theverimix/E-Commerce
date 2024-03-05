package com.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartKeyDTO;
import com.ecommerce.entities.Cart;
import com.ecommerce.services.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping
    public ResponseEntity<Optional<Cart>> getCartById(@RequestBody CartKeyDTO dto) {
        Optional<Cart> cart = cartService.getCartById(cartService.mapDTOtoCartKey(dto));
        return ResponseEntity.ok(cart);
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
    public ResponseEntity<Object> deleteCart(@RequestBody CartKeyDTO dto) {
        cartService.deleteCart(cartService.mapDTOtoCartKey(dto));
        return ResponseEntity.ok().build();
    }
}
