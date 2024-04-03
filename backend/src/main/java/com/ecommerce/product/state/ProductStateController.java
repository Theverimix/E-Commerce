package com.ecommerce.product.state;

import com.ecommerce.exception.ApiResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/product/states")
@RequiredArgsConstructor
public class ProductStateController {

    private final ProductStateService service;

    @GetMapping
    public ApiResponse getAllStates() {
        List<ProductStateResponse> states = service.getAllStates();
        return ApiResponse.ok(states);
    }

    @GetMapping("/{stateId}")
    public ApiResponse getProductStateById(@PathVariable Long stateId) {
        ProductStateResponse product = service.getStateById(stateId);
        return ApiResponse.ok(product);
    }

    @PostMapping
    public ApiResponse saveProductState(@RequestBody @Valid ProductStateRequest request) {
        service.saveState(request);
        return ApiResponse.created();
    }

    @PutMapping("/{stateId}")
    public ApiResponse updateProduct(
            @PathVariable Long stateId,
            @Valid @RequestBody ProductStateRequest request) {
        service.updateState(stateId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{stateId}")
    public ApiResponse deleteProduct(@PathVariable Long stateId) {
        service.deleteState(stateId);
        return ApiResponse.deleted(stateId);
    }
}