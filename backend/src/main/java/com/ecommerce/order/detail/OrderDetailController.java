package com.ecommerce.order.detail;

import java.util.List;

import com.ecommerce.exception.ApiResponse;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders/{orderId}/details")
@RequiredArgsConstructor
public class OrderDetailController {

    private final OrderDetailService service;

    @GetMapping("/{productId}")
    public ApiResponse getDetail(
            @PathVariable Long orderId,
            @PathVariable Long productId) {
        OrderDetailResponse response = service.findById(orderId, productId);
        return ApiResponse.ok(response);
    }

    @GetMapping
    public ApiResponse getDetailsByOrder(@PathVariable Long orderId) {
        List<OrderDetailResponse> response = service.findDetailsByOrder(orderId);
        return ApiResponse.ok(response);
    }

    @PostMapping
    public ApiResponse saveOrderDetails(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderDetailRequest request) {
        service.saveOrderDetail(orderId, request);
        return ApiResponse.created();
    }

    @PutMapping
    public ApiResponse updateOrderDetails(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderDetailRequest request) {
        service.updateOrderDetail(orderId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{productId}")
    public ApiResponse deleteOrderDetails(
            @PathVariable Long orderId,
            @PathVariable Long productId) {
        service.deleteOrderDetail(orderId, productId);
        return ApiResponse.deleted();
    }
}