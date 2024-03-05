package com.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.OrderDetailsDTO;
import com.ecommerce.dto.OrderDetailsKeyDTO;
import com.ecommerce.entities.OrderDetails;
import com.ecommerce.services.OrderDetailsService;

@RestController
@RequestMapping("/order")
public class OrderDetailsController {

    private final OrderDetailsService orderDetailsService;

    @Autowired
    public OrderDetailsController(OrderDetailsService orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }

    @GetMapping("/details")
    public ResponseEntity<List<OrderDetails>> getAllOrderDetailss() {
        List<OrderDetails> orderDetailss = orderDetailsService.getAllOrderDetailss();
        return ResponseEntity.ok(orderDetailss);
    }

    @GetMapping("/details")
    public ResponseEntity<Optional<OrderDetails>> getOrderDetailsById(@RequestBody OrderDetailsKeyDTO dto) {
        Optional<OrderDetails> orderDetails = orderDetailsService
                .getOrderDetailsById(orderDetailsService.mapDTOtoOrderDetailsKey(dto));
        return ResponseEntity.ok(orderDetails);
    }

    @PostMapping
    public ResponseEntity<OrderDetails> saveOrderDetails(@RequestBody OrderDetailsDTO orderDetails) {
        OrderDetails newOrderDetails = orderDetailsService.saveOrderDetails(orderDetails);
        return ResponseEntity.ok(newOrderDetails);
    }

    @PutMapping
    public ResponseEntity<OrderDetails> updateOrderDetails(@RequestBody OrderDetailsDTO newOrderDetails) {
        OrderDetails orderDetails = orderDetailsService.updateOrderDetails(newOrderDetails);
        return ResponseEntity.ok(orderDetails);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteOrderDetails(@RequestBody OrderDetailsKeyDTO dto) {
        orderDetailsService.deleteOrderDetails(orderDetailsService.mapDTOtoOrderDetailsKey(dto));
        return ResponseEntity.ok().build();
    }

}
