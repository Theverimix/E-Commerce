package com.ecommerce.cart;

import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.product.Product;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.customer.Customer;
import com.ecommerce.customer.CustomerRepository;
import com.ecommerce.product.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository repository;
    private final CartMapper mapper;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public List<CartResponse> getItemsFromCartByCustomer(@NonNull Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found."));

        return repository.findByCustomer(customer).stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public void addProductToCart(Long customerId, CartRequest request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found."));

        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new EntityNotFoundException("Customer not found."));

        repository.save(new Cart(
                null,
                product,
                customer,
                request.amount()
        ));
    }

    public void updateProductFromCart(@NonNull Long customerId, @NonNull CartRequest request) {
        CartKey key = new CartKey(request.productId(), customerId);

        Cart cart = repository.findById(key)
                .orElseThrow(() -> new EntityNotFoundException("Item cart not found."));

        cart.setAmount(request.amount());

        repository.save(cart);
    }

    public void removeProductFromCart(@NonNull Long customerId, @NonNull Long productId) {
        CartKey key = new CartKey(customerId, productId);

        Cart cart = repository.findById(key)
                .orElseThrow(() -> new EntityNotFoundException("Item cart not found."));

        repository.delete(cart);
    }
}