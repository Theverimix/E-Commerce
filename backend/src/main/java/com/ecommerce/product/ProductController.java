package com.ecommerce.product;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @GetMapping
    ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = service.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    ResponseEntity<List<ProductResponse>> getProductsByCategory(@RequestParam("category") Long categoryId) {
        List<ProductResponse> products = service.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        ProductResponse product = service.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    ResponseEntity<?> saveProduct(
            @RequestBody ProductRegisterRequest request
    ) {
        service.saveProduct(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductUpdateRequest request
    ){
        service.updateProduct(id, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}