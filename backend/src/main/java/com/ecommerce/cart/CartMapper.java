package com.ecommerce.cart;

import java.util.function.Function;

import com.ecommerce.customer.CustomerDTOMapper;
import com.ecommerce.product.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartMapper implements Function<Cart, CartResponse> {

    private final ProductMapper productMapper;
    private final CustomerDTOMapper customerMapper;

    public CartResponse apply(Cart cart) {
        return new CartResponse(
                productMapper.apply(cart.getProduct()),
                customerMapper.apply(cart.getCustomer()),
                cart.getAmount());
    }
}
