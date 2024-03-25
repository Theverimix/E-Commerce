package com.ecommerce.cart;

import java.util.function.Function;

import org.springframework.stereotype.Service;

@Service
public class CartDTOMapper implements Function<Cart, CartDTO> {
    public CartDTO apply(Cart cart) {
        return new CartDTO(
                cart.getProduct().getId(),
                cart.getCustomer().getId(),
                cart.getAmmount());
    }
}
