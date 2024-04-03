package com.ecommerce.cart;

import java.util.List;

import com.ecommerce.exception.ApiResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customers/{customerId}/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ApiResponse getCartByCustomer(@PathVariable Long customerId) {
        List<CartResponse> response = cartService.getItemsFromCartByCustomer(customerId);
        return ApiResponse.ok(response);
    }

    @PostMapping
    public ApiResponse addProductToCart(
            @PathVariable Long customerId,
            @Valid @RequestBody CartRequest request) {
        cartService.addProductToCart(customerId, request);
        return ApiResponse.created();
    }

    @PutMapping
    public ApiResponse updateProductFromCart(
            @PathVariable Long customerId,
            @Valid @RequestBody CartRequest request) {
        cartService.updateProductFromCart(customerId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{productId}")
    public ApiResponse removeProductFromCart(
            @PathVariable Long customerId,
            @PathVariable Long productId) {
        cartService.removeProductFromCart(customerId, productId);
        return ApiResponse.deleted();
    }
}
