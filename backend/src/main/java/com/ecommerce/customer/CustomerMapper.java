package com.ecommerce.customer;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CustomerMapper implements Function<Customer, CustomerResponse> {
    @Override
    public CustomerResponse apply(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFirstname(),
                customer.getLastname(),
                customer.getEmail(),
                customer.getState(),
                customer.getRole(),
                customer.getAddresses(),
                customer.getRegisterDate(),
                customer.getCountry(),
                customer.getPhone());
    }

    public Customer buildCustomer(CustomerResponse dto) {
        return Customer.builder()
                .id(dto.id())
                .firstname(dto.firstname())
                .lastname(dto.lastname())
                .email(dto.email())
                .state(dto.state())
                .role(dto.role())
                .addresses(dto.addresses())
                .registerDate(dto.registerDate())
                .country(dto.country())
                .phone(dto.phone())
                .build();
    }
}
