package com.ecommerce.product.state;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product/state")
@RequiredArgsConstructor
public class ProductStateController {

    private final ProductStateService service;

    @GetMapping
    public ResponseEntity<List<ProductStateDTO>> getAllStates() {
        List<ProductStateDTO> states = service.getAllStates();
        return ResponseEntity.ok(states);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductStateDTO> getProductStateById(@PathVariable Long id) {
        ProductStateDTO product = service.getStateById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<?> saveProductState(@RequestBody ProductStateDTO state) {
        service.saveState(state);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductState newState) {
        service.updateState(id, newState);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        service.deleteState(id);
        return ResponseEntity.ok().build();
    }
}
