package com.ecommerce.order;

import com.ecommerce.exception.ApiResponse;
import com.ecommerce.exception.PageNotFoundException;
import com.ecommerce.utils.PageResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ApiResponse getAllOrders(
            @RequestParam(name = "page", defaultValue = "0") int page
    ) throws PageNotFoundException {
        PageResponse<OrderResponse> orders = orderService.getAllOrders(page, 10);
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
        @RequestBody String statusJson
    ) throws JsonProcessingException {
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
