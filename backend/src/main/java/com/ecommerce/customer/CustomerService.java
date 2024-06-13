package com.ecommerce.customer;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.address.Address;
import com.ecommerce.address.AddressRepository;
import com.ecommerce.address.AddressRequest;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;
    private final AddressRepository addressRepository;
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

    public void updateCustomerAddress(Long id, AddressRequest request) {
        Customer customer = repository.findById(request.customerId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Customer with id [%s] not found.".formatted(request.customerId())));

        Address address = addressRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(
                "Address with id [%s] not found.".formatted(id)));

        address.setCustomer(customer);
        address.setFullName(request.fullName());
        address.setAddressLine(request.addressLine());
        address.setCity(request.city());
        address.setRegion(request.region());
        address.setCountry(request.country());
        address.setPhone(request.phone());
        address.setZip(request.zip());
        address.setDeliveryInstructions(request.deliveryInstructions());

        addressRepository.save(address);
    }

    public void saveCustomerAddress(AddressRequest request) {
        Customer customer = repository.findById(request.customerId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Customer with id [%s] not found.".formatted(request.customerId())));
        addressRepository.save(Address.builder()
                .customer(customer)
                .fullName(request.fullName())
                .addressLine(request.addressLine())
                .city(request.city())
                .region(request.region())
                .country(request.country())
                .phone(request.phone())
                .zip(request.zip())
                .deliveryInstructions(request.deliveryInstructions())
                .build());
    }

    public void updateCustomer(Long customerId, CustomerUpdateRequest request) {
        Customer customer = repository.findById(customerId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Customer with id [%s] not found.".formatted(customerId)));

        customer.setFirstname(request.firstname());
        customer.setLastname(request.lastname());
        customer.setEmail(request.email());
        // customer.setAddresses(request.address());
        customer.setCountry(request.country());
        customer.setPhone(request.phone());

        repository.save(customer);
    }
}
