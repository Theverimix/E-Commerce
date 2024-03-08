package com.ecommerce.services;

import com.ecommerce.dto.SaleDTO;
import com.ecommerce.entities.Sale;
import com.ecommerce.repositories.SaleRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaleService {

    private final SaleRepository saleRepository;

    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Optional<Sale> getSaleById(@NonNull Long id) {
        return saleRepository.findById(id);
    }

    public Sale saveSale(SaleDTO dto) {
        return saleRepository.save(mapDTOToSale(dto));
    }

    public Sale updateSale(SaleDTO dto) {
        return saleRepository.save(mapDTOToSale(dto));
    }

    public void deleteSale(@NonNull Long id) {
        saleRepository.deleteById(id);
    }

    // public SaleDTO mapSaleToDTO(Sale sale) {
    // SaleDTO dto = new SaleDTO();

    // dto.setId(sale.getId());
    // dto.setName(sale.getName());
    // dto.setStartAt(sale.getStartAt());
    // dto.setEndAt(sale.getEndAt());
    // dto.setDiscountType(sale.getDiscountType());
    // dto.setDiscountValue(sale.getDiscountValue());
    // dto.setProducts(sale.getProducts());

    // return dto;
    // }

    public Sale mapDTOToSale(SaleDTO dto) {
        Sale sale = new Sale();

        sale.setId(dto.id());
        sale.setName(dto.name());
        sale.setStartAt(dto.startAt());
        sale.setEndAt(dto.endAt());
        sale.setDiscountType(dto.discountType());
        sale.setDiscountValue(dto.discountValue());
        sale.setProducts(dto.products());

        return sale;
    }
}
