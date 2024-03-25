package com.ecommerce.sale;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final SaleDTOMapper saleDtoMapper;

    public List<SaleDTO> getAllSales() {
        return saleRepository.findAll().stream()
                .map(saleDtoMapper)
                .collect(Collectors.toList());
    }

    public SaleDTO getSaleById(@NonNull Long id) {
        return saleRepository.findById(id)
                .map(saleDtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sale with id [%s] not found.".formatted(id)));
    }

    public void saveSale(SaleDTO dto) {
        saleRepository.save(mapDTOToSale(dto));
    }

    public void updateSale(SaleDTO dto) {
        saleRepository.save(mapDTOToSale(dto));
    }

    public void deleteSale(@NonNull Long id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sale with id [%s] not found.".formatted(id)));

        saleRepository.delete(sale);
    }

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
