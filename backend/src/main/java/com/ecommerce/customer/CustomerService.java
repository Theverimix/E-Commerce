package com.ecommerce.customer;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;
    private final CustomerMapper mapper;

    public CustomerResponse getCustomerById(@NonNull Long id) {
        return repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new EntityNotFoundException("Customer with id [%s] not found.".formatted(id)));
    }

    public List<CustomerResponse> getAllCustomers() {
        return repository.findAll()
                .stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public void updateCustomer(Long customerId, CustomerUpdateRequest request) {
        Customer customer = repository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer with id [%s] not found.".formatted(customerId)));

        customer.setFirstname(request.firstname());
        customer.setLastname(request.lastname());
        customer.setEmail(request.email());
        customer.setAddress(request.address());
        customer.setCountry(request.country());
        customer.setPhone(request.phone());

        repository.save(customer);
    }
}
