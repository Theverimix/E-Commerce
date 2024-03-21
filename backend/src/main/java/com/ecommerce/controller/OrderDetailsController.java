package com.ecommerce.controller;

import java.util.List;

import com.ecommerce.entities.OrderDetailsKey;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.dto.OrderDetailsDTO;
import com.ecommerce.entities.OrderDetails;
import com.ecommerce.services.OrderDetailsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OrderDetailsController {

    private final OrderDetailsService orderDetailsService;

    @GetMapping("/order/{id}/details")
    public ResponseEntity<List<OrderDetailsDTO>> getDetailsByOrder(@PathVariable Long id) {
        List<OrderDetailsDTO> details = orderDetailsService.getDetailsByOrder(id);
        return ResponseEntity.ok(details);
    }

    @PostMapping("/order/details")
    public ResponseEntity<?> saveOrderDetails(@RequestBody OrderDetailsDTO dto) {
        orderDetailsService.saveOrderDetails(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/order/details")
    public ResponseEntity<OrderDetails> updateOrderDetails(@RequestBody OrderDetailsDTO dto) {
        orderDetailsService.updateOrderDetails(dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/order/{orderId}/detail/{productId}")
    public ResponseEntity<Object> deleteOrderDetails(@PathVariable Long orderId, @PathVariable Long productId) {
        OrderDetailsKey key = orderDetailsService.buildOrderDetailsKey(productId, orderId);
        orderDetailsService.deleteOrderDetails(key);

        return ResponseEntity.ok().build();
    }

}
