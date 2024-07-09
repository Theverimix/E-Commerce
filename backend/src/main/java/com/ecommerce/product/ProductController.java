package com.ecommerce.product;

import com.ecommerce.exception.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @GetMapping
    ApiResponse getAllProducts(
            @RequestParam(name = "page", defaultValue = "0") int page
    ) {
        ProductPageResponse products = service.getAllProducts(page);
        return ApiResponse.ok(products);
    }

    @GetMapping("/{productId}")
    ApiResponse getProductById(@PathVariable Long productId) {
        ProductResponse product = service.getProductById(productId);
        return ApiResponse.ok(product);
    }

    @GetMapping("/ids")
    ApiResponse getProductsByIds(@RequestParam List<Long> ids) {
        List<ProductResponse> products = service.getProductsByIds(ids);
        return ApiResponse.ok(products);
    }

    @GetMapping("/search")
    ApiResponse searchProducts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "low-price", required = false) Double minPrice,
            @RequestParam(name = "high-price", required = false) Double maxPrice,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "sale", defaultValue = "false") boolean sale) {
        ProductPageResponse products = service.searchProduct(page, name, minPrice, maxPrice, category, sale);
        return ApiResponse.ok(products);
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