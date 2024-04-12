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

    private final CustomerRepository customerRepository;
    private final CustomerDTOMapper customerDtoMapper;

    public CustomerDTO getCustomerById(@NonNull Long id) {
        return customerRepository.findById(id)
                .map(customerDtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product with id [%s] not found.".formatted(id)));
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
                        "Customer with id [%s] not found.".formatted(id)));

        customerRepository.delete(customer);
    }

    public Customer mapDTOToCustomer(CustomerDTO dto) {
        Customer customer = new Customer();

        customer.setId(dto.id());
        customer.setFirstname(dto.firstname());
        customer.setLastname(dto.lastname());
        customer.setEmail(dto.email());
        customer.setState(dto.state());
        customer.setRole(dto.role());
        customer.setAddress(dto.address());
        customer.setRegisterDate(dto.registerDate());
        customer.setCountry(dto.country());
        customer.setPhone(dto.phone());

        return customer;
    }

}
