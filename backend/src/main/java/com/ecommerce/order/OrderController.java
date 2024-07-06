package com.ecommerce.order;

import java.util.List;

import com.ecommerce.exception.ApiResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ApiResponse getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ApiResponse.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ApiResponse getOrderById(@PathVariable Long orderId) {
        OrderResponse order = orderService.getOrderById(orderId);
        return ApiResponse.ok(order);
    }

    @PostMapping
    public ApiResponse saveOrder(@RequestBody @Valid OrderRegistrationRequest order) {
        Long id = orderService.saveOrder(order);
        return ApiResponse.created().data(id);
    }

    @PatchMapping("/{orderId}")
    public ApiResponse updateOrderStatus(
        @PathVariable Long orderId,
        @RequestBody String statusJson) throws JsonMappingException, JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(statusJson);
        String status = jsonNode.get("status").asText();
        Order updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ApiResponse.updated().data(updatedOrder);
    }

    @PutMapping("/{orderId}")
    public ApiResponse updateOrder(
            @PathVariable Long orderId,
            @RequestBody @Valid OrderRegistrationRequest newOrder
    ) {
        orderService.updateOrder(orderId, newOrder);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{orderId}")
    public ApiResponse deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ApiResponse.deleted(orderId);
    }
}
