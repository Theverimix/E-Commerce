package com.ecommerce.dto;

import com.ecommerce.entities.Customer;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CustomerDTOMapper implements Function<Customer, CustomerDTO> {
    @Override
    public CustomerDTO apply(Customer customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getName(),
                customer.getPassword(),
                customer.getEmail(),
                customer.getState(),
                customer.getRole(),
                customer.getAddress(),
                customer.getRegisterDate(),
                customer.getCountry(),
                customer.getPhone(),
                customer.getOrders()
        );
    }
}
