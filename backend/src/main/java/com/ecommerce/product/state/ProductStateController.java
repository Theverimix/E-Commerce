package com.ecommerce.product.state;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/product/states")
@RequiredArgsConstructor
public class ProductStateController {

    private final ProductStateService service;

    @GetMapping
    public ResponseEntity<List<ProductStateResponse>> getAllStates() {
        List<ProductStateResponse> states = service.getAllStates();
        return ResponseEntity.ok(states);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductStateResponse> getProductStateById(@PathVariable Long id) {
        ProductStateResponse product = service.getStateById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<?> saveProductState(@RequestBody @Valid ProductStateRequest request) {
        service.saveState(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductStateRequest request) {
        service.updateState(id, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        service.deleteState(id);
        return ResponseEntity.ok().build();
    }
}
