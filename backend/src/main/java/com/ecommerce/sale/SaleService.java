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

    private final SaleRepository repository;
    private final SaleMapper mapper;

    List<SaleResponse> getAllSales() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    SaleResponse getSaleById(@NonNull Long id) {
        return repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sale with id [%s] not found.".formatted(id)));
    }

    void saveSale(SaleRequest request) {
        Sale sale = Sale.builder()
                .name(request.name())
                .startAt(request.startAt())
                .endAt(request.endAt())
                .discountType(request.discountType())
                .discountValue(request.discountValue())
                .build();
        repository.save(sale);
    }

    void updateSale(Long saleId, SaleRequest request) {
        Sale sale = repository.findById(saleId)
                .orElseThrow(() -> new EntityNotFoundException("Sale with id [%s] not found.".formatted(saleId)));

        sale.setName(request.name());
        sale.setStartAt(request.startAt());
        sale.setEndAt(request.endAt());
        sale.setDiscountType(request.discountType());
        sale.setDiscountValue(request.discountValue());

        repository.save(sale);
    }

    void deleteSale(@NonNull Long id) {
        Sale sale = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sale with id [%s] not found.".formatted(id)));

        repository.delete(sale);
    }
}
