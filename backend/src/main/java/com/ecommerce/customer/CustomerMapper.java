package com.ecommerce.customer;

import org.springframework.stereotype.Service;

import com.ecommerce.address.AddressMapper;

import lombok.RequiredArgsConstructor;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class CustomerMapper implements Function<Customer, CustomerResponse> {

    private final AddressMapper addressMapper;
    @Override
    public CustomerResponse apply(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFirstname(),
                customer.getLastname(),
                customer.getEmail(),
                customer.getState(),
                customer.getRole(),
                customer.getAddresses().stream().map(addressMapper).toList(),
                customer.getRegisterDate(),
                customer.getCountry(),
                customer.getPhone());
    }

    // public Customer buildCustomer(CustomerResponse dto) {
    //     return Customer.builder()
    //             .id(dto.id())
    //             .firstname(dto.firstname())
    //             .lastname(dto.lastname())
    //             .email(dto.email())
    //             .state(dto.state())
    //             .role(dto.role())
    //             .addresses(dto.addresses())
    //             .registerDate(dto.registerDate())
    //             .country(dto.country())
    //             .phone(dto.phone())
    //             .build();
    // }
}
