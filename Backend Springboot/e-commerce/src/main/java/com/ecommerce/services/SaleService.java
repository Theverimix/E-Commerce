package com.ecommerce.services;

import com.ecommerce.dto.SaleDTO;
import com.ecommerce.entities.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaleService {

    private final SaleRepository saleRepository;

    @Autowired
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

    public SaleDTO mapSaleToDTO(Sale sale) {
        SaleDTO dto = new SaleDTO();

        dto.setId(sale.getId());
        dto.setName(sale.getName());
        dto.setStartAt(sale.getStartAt());
        dto.setEndAt(sale.getEndAt());
        dto.setDiscountType(sale.getDiscountType());
        dto.setDiscountValue(sale.getDiscountValue());
        dto.setProducts(sale.getProducts());

        return dto;
    }

    public Sale mapDTOToSale(SaleDTO dto) {
        Sale sale = new Sale();

        sale.setId(dto.getId());
        sale.setName(dto.getName());
        sale.setStartAt(dto.getStartAt());
        sale.setEndAt(dto.getEndAt());
        sale.setDiscountType(dto.getDiscountType());
        sale.setDiscountValue(dto.getDiscountValue());
        sale.setProducts(dto.getProducts());

        return sale;
    }
}
