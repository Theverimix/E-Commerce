package com.ecommerce.cart;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.customer.Customer;
import com.ecommerce.customer.CustomerRepository;
import com.ecommerce.product.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    private final CustomerRepository customerRepository;

    private final ProductRepository productRepository;

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

        List<Cart> lista = cartRepository.findByCustomer(customer);
        log.warn("Lista: " + lista);
        return lista;
    }

    public void saveCart(CartDTO dto) {
        cartRepository.save(mapDTOToCart(dto));
    }

    public void updateCart(CartDTO dto) {
        cartRepository.save(mapDTOToCart(dto));
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
        log.warn("Cart DTO = " + dto.toString());

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
