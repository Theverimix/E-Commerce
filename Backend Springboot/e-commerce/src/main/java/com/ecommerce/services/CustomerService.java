package com.ecommerce.services;

import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.dto.CustomerDTOMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CustomerDTO;
import com.ecommerce.entities.Customer;
import com.ecommerce.repositories.CustomerRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerDTOMapper customerDtoMapper;

    public CustomerService(CustomerRepository customerRepository, CustomerDTOMapper customerDTOMapper) {
        this.customerRepository = customerRepository;
        this.customerDtoMapper = customerDTOMapper;
    }

    public CustomerDTO getCustomerById(@NonNull Long id) {
        return customerRepository.findById(id)
                .map(customerDtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product with id [%s] not found.".formatted(id)
                ));
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(customerDtoMapper)
                .collect(Collectors.toList());
    }

    public void saveCustomer(CustomerDTO dto) {
        customerRepository.save(mapDTOToCustomer(dto));
    }

    public void updateCustomer(CustomerDTO dto) {
        customerRepository.save(mapDTOToCustomer(dto));
    }

    public void deleteCustomer(@NonNull Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product with id [%s] not found.".formatted(id)));

        customerRepository.delete(customer);
    }

    public Customer mapDTOToCustomer(CustomerDTO dto) {
        Customer customer = new Customer();

        customer.setId(dto.id());
        customer.setName(dto.name());
        customer.setEmail(dto.email());
        customer.setState(dto.state());
        customer.setRole(dto.role());
        customer.setAddress(dto.address());
        customer.setRegisterDate(dto.registerDate());
        customer.setCountry(dto.country());
        customer.setPhone(dto.phone());
        customer.setOrders(dto.orders());

        return customer;
    }
}
