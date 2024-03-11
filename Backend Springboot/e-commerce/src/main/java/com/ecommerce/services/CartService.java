package com.ecommerce.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.entities.Cart;
import com.ecommerce.entities.CartKey;
import com.ecommerce.entities.Customer;
import com.ecommerce.repositories.CartRepository;
import com.ecommerce.repositories.CustomerRepository;
import com.ecommerce.repositories.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CartService {

    private final CartRepository cartRepository;

    private final CustomerRepository customerRepository;

    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, CustomerRepository customerRepository,
            ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<Cart> getCartById(@NonNull CartKey id) {
        return cartRepository.findById(id);
    }

    public List<Cart> getCartsByCustomer(@NonNull Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        log.warn("Customer Id: " + customerId);
        log.warn(customer.toString());
        return cartRepository.findByCustomer(customer);
    }

    public Cart saveCart(CartDTO dto) {
        return cartRepository.save(mapDTOToCart(dto));
    }

    public Cart updateCart(CartDTO dto) {
        return cartRepository.save(mapDTOToCart(dto));
    }

    public void deleteCart(@NonNull Long customerId, @NonNull Long productId) {
        CartKey cartKey = new CartKey();
        cartKey.setCustomerId(customerId);
        cartKey.setProductId(productId);
        cartRepository.deleteById(cartKey);
    }

    // public CartDTO mapCartToDTO(Cart cart) {
    // CartDTO dto = new CartDTO();

    // dto.setId(mapCartKeytoDTO(cart.getId()));
    // dto.setProduct(cart.getProduct());
    // dto.setCustomer(cart.getCustomer());
    // dto.setAmmount(cart.getAmmount());

    // return dto;
    // }

    public Cart mapDTOToCart(CartDTO dto) {
        CartKey cartKey = new CartKey();
        cartKey.setCustomerId(dto.customerId());
        cartKey.setProductId(dto.productId());

        Cart cart = new Cart();
        cart.setId(cartKey);
        cart.setProduct(productRepository.findById(dto.productId()).orElse(null));
        cart.setCustomer(customerRepository.findById(dto.customerId()).orElse(null));
        cart.setAmmount(dto.ammount());

        return cart;
    }

}
