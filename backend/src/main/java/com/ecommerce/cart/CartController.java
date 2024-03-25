package com.ecommerce.cart;

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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/cart")
@Slf4j
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<Cart>> getCartByCustomer(@PathVariable Long customerId) {
        log.warn("Customer ID = " + customerId);
        return ResponseEntity.ok(cartService.getCartsByCustomer(customerId));
    }

    @PostMapping
    public ResponseEntity<?> saveCart(@RequestBody CartDTO cart) {
        cartService.saveCart(cart);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> updateCart(@RequestBody CartDTO newCart) {
        cartService.updateCart(newCart);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteCart(@RequestBody CartDTO dto) {
        cartService.deleteCart(dto.customerId(), dto.productId());
        return ResponseEntity.ok().build();
    }
}
