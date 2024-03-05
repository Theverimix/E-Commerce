package com.ecommerce.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartKeyDTO;
import com.ecommerce.entities.Cart;
import com.ecommerce.entities.CartKey;
import com.ecommerce.repositories.CartRepository;

@Service
public class CartService {
    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<Cart> getCartById(@NonNull CartKey id) {
        return cartRepository.findById(id);
    }

    public Cart saveCart(CartDTO dto) {
        return cartRepository.save(mapDTOToCart(dto));
    }

    public Cart updateCart(CartDTO dto) {
        return cartRepository.save(mapDTOToCart(dto));
    }

    public void deleteCart(@NonNull CartKey id) {
        cartRepository.deleteById(id);
    }

    public CartDTO mapCartToDTO(Cart cart) {
        CartDTO dto = new CartDTO();

        dto.setId(mapCartKeytoDTO(cart.getId()));
        dto.setProduct(cart.getProduct());
        dto.setCustomer(cart.getCustomer());
        dto.setAmmount(cart.getAmmount());

        return dto;
    }

    public Cart mapDTOToCart(CartDTO dto) {
        Cart cart = new Cart();

        cart.setId(mapDTOtoCartKey(dto.getId()));
        cart.setProduct(dto.getProduct());
        cart.setCustomer(dto.getCustomer());
        cart.setAmmount(dto.getAmmount());

        return cart;
    }

    public CartKeyDTO mapCartKeytoDTO(CartKey cartKey) {
        CartKeyDTO dto = new CartKeyDTO();

        dto.setCustomerId(cartKey.getCustomerId());
        dto.setProductId(cartKey.getProductId());

        return dto;
    }

    public CartKey mapDTOtoCartKey(CartKeyDTO dto) {
        CartKey cartKey = new CartKey();

        cartKey.setCustomerId(dto.getCustomerId());
        cartKey.setProductId(dto.getProductId());

        return cartKey;
    }
}
