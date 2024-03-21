package com.ecommerce.controller;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.dto.ProductRegistrationDTO;
import com.ecommerce.services.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/add")
    ResponseEntity<ProductRegistrationDTO> addProduct(@RequestBody ProductRegistrationDTO product) {
        productService.addProduct(product);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    ResponseEntity<?> saveProduct(@RequestBody ProductDTO product) {
        productService.saveProduct(product);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO newProduct) {
        productService.updateProduct(id, newProduct);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}