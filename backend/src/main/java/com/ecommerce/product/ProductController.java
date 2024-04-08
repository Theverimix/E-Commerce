package com.ecommerce.product;

import com.ecommerce.exception.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @GetMapping
    ApiResponse getAllProducts(@RequestParam(name = "page", defaultValue = "0") int page) {
        List<ProductResponse> products = service.getAllProducts(page).getContent();
        return ApiResponse.ok(products);
    }

    // @GetMapping
    // ApiResponse getAllProducts() {
    // List<ProductResponse> products = service.getAllProducts();
    // return ApiResponse.ok(products);
    // }

    @GetMapping("/search")
    ApiResponse getProductsByCategory(@RequestParam("category") Long categoryId) {
        List<ProductResponse> products = service.getProductsByCategory(categoryId);
        return ApiResponse.ok(products);
    }

    @GetMapping("/{productId}")
    ApiResponse getProductById(@PathVariable Long productId) {
        ProductResponse product = service.getProductById(productId);
        return ApiResponse.ok(product);
    }

    @PostMapping
    ApiResponse saveProduct(
            @Valid @RequestBody ProductRegisterRequest request) {
        service.saveProduct(request);
        return ApiResponse.created();
    }

    @PutMapping("/{productId}")
    ApiResponse updateProduct(
            @PathVariable Long productId,
            @Valid @RequestBody ProductUpdateRequest request) {
        service.updateProduct(productId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{productId}")
    ApiResponse deleteProduct(@PathVariable Long productId) {
        service.deleteProduct(productId);
        return ApiResponse.deleted(productId);
    }
}