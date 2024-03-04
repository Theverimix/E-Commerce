package com.ecommerce.controller;

import com.ecommerce.entities.ProductState;
import com.ecommerce.services.ProductStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product/state")
public class ProductStateController {

    private final ProductStateService service;

    @Autowired
    public ProductStateController(ProductStateService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ProductState>> getAllStates(){
        List<ProductState> states = service.getAllStates();
        return ResponseEntity.ok(states);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductState>> getProductStateById(@PathVariable Long id){
        Optional<ProductState> product = service.getStateById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<ProductState> saveProductState(@RequestBody ProductState state){
        ProductState result = service.saveState(state);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductState> updateProduct(@PathVariable Long id, @RequestBody ProductState newState){
        ProductState state = service.updateState(id, newState);
        return ResponseEntity.ok(state);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id){
        service.deleteState(id);
        return ResponseEntity.ok().build();
    }
}
