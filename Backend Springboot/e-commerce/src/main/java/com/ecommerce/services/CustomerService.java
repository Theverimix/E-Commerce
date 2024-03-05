package com.ecommerce.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CustomerDTO;
import com.ecommerce.dto.UserDTO;
import com.ecommerce.entities.Customer;
import com.ecommerce.entities.User;
import com.ecommerce.repositories.CustomerRepository;
import com.ecommerce.repositories.UserRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(@NonNull Long id) {
        return customerRepository.findById(id);
    }

    public Customer saveCustomer(CustomerDTO dto) {
        return customerRepository.save(mapDTOToCustomer(dto));
    }

    public Customer updateCustomer(CustomerDTO dto) {
        return customerRepository.save(mapDTOToCustomer(dto));
    }

    public void deleteCustomer(@NonNull Long id) {
        customerRepository.deleteById(id);
    }

    public CustomerDTO mapCustomerToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();

        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setPassword(customer.getPassword());
        dto.setEmail(customer.getEmail());
        dto.setState(customer.getState());
        dto.setRole(customer.getRole());
        dto.setAddress(customer.getAddress());
        dto.setRegisterDate(customer.getRegisterDate());
        dto.setCountry(customer.getCountry());
        dto.setPhone(customer.getPhone());
        dto.setOrders(customer.getOrders());

        return dto;
    }

    public Customer mapDTOToCustomer(CustomerDTO dto) {
        Customer customer = new Customer();

        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setPassword(dto.getPassword());
        customer.setEmail(dto.getEmail());
        customer.setState(dto.getState());
        customer.setRole(dto.getRole());
        customer.setAddress(dto.getAddress());
        customer.setRegisterDate(dto.getRegisterDate());
        customer.setCountry(dto.getCountry());
        customer.setPhone(dto.getPhone());
        customer.setOrders(dto.getOrders());

        return customer;
    }
}
