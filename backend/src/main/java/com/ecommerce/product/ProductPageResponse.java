package com.ecommerce.product;

import java.util.List;

import org.springframework.data.domain.Page;

public record ProductPageResponse(
        List<ProductResponse> products,
        int totalPages,
        long totalElements) {
}
