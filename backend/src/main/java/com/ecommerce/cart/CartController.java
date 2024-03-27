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

@RestController
@RequestMapping("/customers/{customerId}/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartResponse>> getCartByCustomer(@PathVariable Long customerId) {
        List<CartResponse> response = cartService.getItemsFromCartByCustomer(customerId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addProductToCart(
            @PathVariable Long customerId,
            @RequestBody CartRequest request
    ) {
        cartService.addProductToCart(customerId, request);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> updateProductFromCart(
            @PathVariable Long customerId,
            @RequestBody CartRequest request
    ) {
        cartService.updateProductFromCart(customerId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Object> removeProductFromCart(
            @PathVariable Long customerId,
            @PathVariable Long productId
    ) {
        cartService.removeProductFromCart(customerId, productId);
        return ResponseEntity.ok().build();
    }
}
