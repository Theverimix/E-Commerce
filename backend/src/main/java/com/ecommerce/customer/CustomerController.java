package com.ecommerce.customer;

import java.util.List;

import com.ecommerce.address.AddressRequest;
import com.ecommerce.address.AddressResponse;
import com.ecommerce.exception.ApiResponse;
import com.ecommerce.exception.PageNotFoundException;
import com.ecommerce.order.OrderResponse;
import com.ecommerce.order.OrderService;
import com.ecommerce.product.ProductPageResponse;
import com.ecommerce.utils.PageResponse;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService service;
    private final OrderService orderService;

    // Customer API

    @GetMapping
    ApiResponse getAllCustomers(
            @RequestParam(name = "page", defaultValue = "0") int page) {
        CustomerPageResponse products = service.getAllCustomers(page);
        return ApiResponse.ok(products);
    }

    @GetMapping("/{customerId}")
    public ApiResponse getCustomerById(@PathVariable Long customerId) {
        CustomerResponse customer = service.getCustomerById(customerId);
        return ApiResponse.ok(customer);
    }

    @GetMapping("/{customerId}/orders")
    public ApiResponse getOrdersByCustomer(
            @PathVariable Long customerId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "filter", required = false, defaultValue = "ALL_TIME") String filter)
            throws PageNotFoundException {
        PageResponse<OrderResponse> orders = orderService.getOrdersByCustomer(page, 10, customerId, filter);
        return ApiResponse.ok(orders);
    }

    @GetMapping("/{customerId}/addresses")
    public ApiResponse getAddressesByCustomer(
            @PathVariable Long customerId,
            @RequestParam(name = "page", defaultValue = "0") int page) throws PageNotFoundException {
        PageResponse<AddressResponse> addresses = service.getAddressesByCustomer(customerId, page, 10);
        return ApiResponse.ok(addresses);
    }

    @PutMapping("/{customerId}")
    public ApiResponse updateCustomer(
            @PathVariable Long customerId,
            @RequestBody @Valid CustomerUpdateRequest request) {
        service.updateCustomer(customerId, request);
        return ApiResponse.updated();
    }

    // Customer Address API

    @GetMapping("/addresses/{addressId}")
    public ApiResponse getAddressById(@PathVariable Long addressId) {
        AddressResponse address = service.getAddressById(addressId);
        return ApiResponse.ok(address);
    }

    @PostMapping("/{customerId}/address")
    public ApiResponse saveCustomerAddress(
            @PathVariable Long customerId,
            @RequestBody @Valid AddressRequest request) {
        service.saveCustomerAddress(request, customerId);
        return ApiResponse.created();
    }

    @PutMapping("/address/{addressId}")
    public ApiResponse updateCustomerAddress(
            @PathVariable Long addressId,
            @RequestBody @Valid AddressRequest request) {
        service.updateCustomerAddress(addressId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{customerId}/address/{addressId}")
    public ApiResponse deleteCustomerAddress(
            @PathVariable Long customerId,
            @PathVariable Long addressId) {
        service.deleteCustomerAddress(addressId);
        return ApiResponse.deleted();
    }
}
