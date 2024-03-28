package com.ecommerce.sale;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @GetMapping
    public ResponseEntity<List<SaleResponse>> getAllSales() {
        List<SaleResponse> sales = saleService.getAllSales();
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/{saleId}")
    public ResponseEntity<SaleResponse> getSaleById(@PathVariable Long saleId) {
        SaleResponse sale = saleService.getSaleById(saleId);
        return ResponseEntity.ok(sale);
    }

    @PostMapping
    public ResponseEntity<?> saveSale(@RequestBody SaleRequest request) {
        saleService.saveSale(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{saleId}")
    public ResponseEntity<?> updateSale(@PathVariable Long saleId, @RequestBody SaleRequest request) {
        saleService.updateSale(saleId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{saleId}")
    public ResponseEntity<?> deleteSale(@PathVariable Long saleId) {
        saleService.deleteSale(saleId);
        return ResponseEntity.ok().build();
    }
}
