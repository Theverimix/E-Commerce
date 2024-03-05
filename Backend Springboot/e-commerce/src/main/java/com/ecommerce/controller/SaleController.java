package com.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.SaleDTO;
import com.ecommerce.entities.Sale;
import com.ecommerce.services.SaleService;

@RestController
@RequestMapping("/sale")
public class SaleController {

    private final SaleService saleService;

    @Autowired
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        List<Sale> sales = saleService.getAllSales();
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Sale>> getSaleById(@PathVariable Long id) {
        Optional<Sale> sale = saleService.getSaleById(id);
        return ResponseEntity.ok(sale);
    }

    @PostMapping
    public ResponseEntity<Sale> saveSale(@RequestBody SaleDTO sale) {
        Sale newSale = saleService.saveSale(sale);
        return ResponseEntity.ok(newSale);
    }

    @PutMapping
    public ResponseEntity<Sale> updateSale(@RequestBody SaleDTO newSale) {
        Sale sale = saleService.updateSale(newSale);
        return ResponseEntity.ok(sale);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSale(@PathVariable Long id) {
        saleService.deleteSale(id);
        return ResponseEntity.ok().build();
    }
}
