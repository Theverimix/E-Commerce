package com.ecommerce.customer;

import java.util.List;

import com.ecommerce.exception.ApiResponse;
import com.ecommerce.order.OrderResponse;
import com.ecommerce.order.OrderService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService service;
    private final OrderService orderService;

    @GetMapping
    public ApiResponse getAllCustomers() {
        List<CustomerDTO> customers = service.getAllCustomers();
        return ApiResponse.ok(customers);
    }

    @GetMapping("/{customerId}")
    public ApiResponse getCustomerById(@PathVariable Long customerId) {
        CustomerDTO customer = service.getCustomerById(customerId);
        return ApiResponse.ok(customer);
    }

    @GetMapping("/{customerId}/orders")
    public ApiResponse getOrdersByCustomer(@PathVariable Long customerId) {
        List<OrderResponse> orders = orderService.getOrdersByCustomer(customerId);
        return ApiResponse.ok(orders);
    }

    @PostMapping
    public ApiResponse saveCustomer(@RequestBody @Valid CustomerDTO customer) {
        service.saveCustomer(customer);
        return ApiResponse.created();
    }

    @PutMapping
    public ApiResponse updateCustomer(@RequestBody @Valid CustomerDTO newCustomer) {
        service.updateCustomer(newCustomer);
        return ApiResponse.updated();
    }
}
