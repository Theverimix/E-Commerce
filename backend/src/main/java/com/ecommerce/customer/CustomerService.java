package com.ecommerce.customer;

import static com.ecommerce.order.OrderSpecification.hasCustomer;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.ecommerce.address.Address;
import com.ecommerce.address.AddressMapper;
import com.ecommerce.address.AddressRepository;
import com.ecommerce.address.AddressRequest;
import com.ecommerce.address.AddressResponse;
import com.ecommerce.exception.PageNotFoundException;
import com.ecommerce.user.UserRole;
import com.ecommerce.user.UserState;
import com.ecommerce.utils.PageResponse;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;
    private final AddressRepository addressRepository;
    private final CustomerMapper mapper;
    private final AddressMapper addressMapper;

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

    // public void saveCustomer(@NonNull CustomerRequest request) {
    //     Customer customer = new Customer();
    //     customer.setFirstname(request.firstname());
    //     customer.setLastname(request.lastname());
    //     customer.setEmail(request.email());
    //     customer.setCountry(request.country());
    //     customer.setPhone(request.phone());
    //     customer.setState(request.state());
    //     customer.setRole(UserRole.CUSTOMER);
    //     customer.set
    //     repository.save(customer);
    // }

    public void updateCustomer(Long customerId, CustomerUpdateRequest request) {
        Customer customer = repository.findById(customerId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Customer with id [%s] not found.".formatted(customerId)));

        customer.setFirstname(request.firstname());
        customer.setLastname(request.lastname());
        customer.setEmail(request.email());
        customer.setCountry(request.country());
        customer.setPhone(request.phone());

        if (request.state() != null) {
            customer.setState(request.state());
        }

        repository.save(customer);
    }

    public PageResponse<AddressResponse> getAddressesByCustomer(Long customerId, int pageNumber, int size) throws PageNotFoundException {
        Customer customer = repository.findById(customerId).orElseThrow(() -> new EntityNotFoundException("Customer with id [%s] not found.".formatted(customerId)));
        PageRequest pageRequest = PageRequest.of(pageNumber, size, Sort.by("id").ascending());

        Specification<Address> specs = (root, query, builder) -> builder.equal(root.get("customer"), customer);

        Page<Address> page = addressRepository.findAll(specs, pageRequest);

        if (pageNumber >= page.getTotalPages()) {
            throw new PageNotFoundException(pageNumber);
        }

        List<AddressResponse> pageContent = page.getContent().stream()
                .map(addressMapper)
                .toList();

        return new PageResponse<>(
                pageContent,
                page.getTotalPages(),
                page.getTotalElements()
        );
    }

    // Customer Address Service

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

    public void deleteCustomerAddress(Long id) {
        addressRepository.deleteById(id);
    }
}
