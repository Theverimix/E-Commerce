package com.ecommerce.order;

import java.util.List;

import com.ecommerce.exception.ApiResponse;
import org.springframework.web.bind.annotation.*;

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
        orderService.saveOrder(order);
        return ApiResponse.created();
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
