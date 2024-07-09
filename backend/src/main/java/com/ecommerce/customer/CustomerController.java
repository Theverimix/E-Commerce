package com.ecommerce.customer;

import java.util.List;

import com.ecommerce.address.AddressRequest;
import com.ecommerce.exception.ApiResponse;
import com.ecommerce.exception.PageNotFoundException;
import com.ecommerce.order.OrderResponse;
import com.ecommerce.order.OrderService;

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

    @GetMapping
    public ApiResponse getAllCustomers() {
        List<CustomerResponse> customers = service.getAllCustomers();
        return ApiResponse.ok(customers);
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
            @RequestParam(name = "filter", required = false, defaultValue = "ALL_TIME") String filter
    ) throws PageNotFoundException {
        PageResponse<OrderResponse> orders = orderService.getOrdersByCustomer(page, 10, customerId, filter);
        return ApiResponse.ok(orders);
    }

    @PutMapping("/{customerId}")
    public ApiResponse updateCustomer(
            @PathVariable Long customerId,
            @RequestBody @Valid CustomerUpdateRequest request
    ) {
        service.updateCustomer(customerId, request);
        return ApiResponse.updated();
    }

    @PutMapping("/{customerId}/address")
    public ApiResponse updateCustomerAddress(
            @PathVariable Long customerId,
            @RequestBody @Valid AddressRequest request
    ) {
        service.updateCustomerAddress(customerId, request);
        return ApiResponse.updated();
    }

    @PostMapping("/{customerId}/address")
    public ApiResponse saveCustomerAddress(
            @RequestBody @Valid AddressRequest request
    ) {
        service.saveCustomerAddress(request);
        return ApiResponse.created();
    }
}
