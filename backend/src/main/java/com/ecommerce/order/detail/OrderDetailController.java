package com.ecommerce.order.detail;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders/{orderId}/details")
@RequiredArgsConstructor
public class OrderDetailController {

    private final OrderDetailService service;

    @GetMapping("/{productId}")
    public ResponseEntity<OrderDetailResponse> getDetail(
            @PathVariable Long orderId,
            @PathVariable Long productId) {
        OrderDetailResponse response = service.findById(orderId, productId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderDetailResponse>> getDetailsByOrder(@PathVariable Long orderId) {
        List<OrderDetailResponse> response = service.findDetailsByOrder(orderId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> saveOrderDetails(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderDetailRequest request) {
        service.saveOrderDetail(orderId, request);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> updateOrderDetails(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderDetailRequest request) {
        service.updateOrderDetail(orderId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Object> deleteOrderDetails(
            @PathVariable Long orderId,
            @PathVariable Long productId) {
        service.deleteOrderDetail(orderId, productId);
        return ResponseEntity.ok().build();
    }
}