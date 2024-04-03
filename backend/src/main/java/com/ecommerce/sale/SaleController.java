package com.ecommerce.sale;

import java.util.List;

import com.ecommerce.exception.ApiResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @GetMapping
    public ApiResponse getAllSales() {
        List<SaleResponse> sales = saleService.getAllSales();
        return ApiResponse.ok(sales);
    }

    @GetMapping("/{saleId}")
    public ApiResponse getSaleById(@PathVariable Long saleId) {
        SaleResponse sale = saleService.getSaleById(saleId);
        return ApiResponse.ok(sale);
    }

    @PostMapping
    public ApiResponse saveSale(@RequestBody @Valid SaleRequest request) {
        saleService.saveSale(request);
        return ApiResponse.created();
    }

    @PutMapping("/{saleId}")
    public ApiResponse updateSale(@PathVariable Long saleId, @Valid @RequestBody SaleRequest request) {
        saleService.updateSale(saleId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{saleId}")
    public ApiResponse deleteSale(@PathVariable Long saleId) {
        saleService.deleteSale(saleId);
        return ApiResponse.deleted(saleId);
    }
}
