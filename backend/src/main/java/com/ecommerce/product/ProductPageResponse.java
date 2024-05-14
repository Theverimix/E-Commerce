package com.ecommerce.product;

import java.util.List;

public record ProductPageResponse(
        List<ProductResponse> products,
        int totalPages,
        long totalElements
) {}
