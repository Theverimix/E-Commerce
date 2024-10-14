package com.ecommerce.customer;
import java.util.List;

public record CustomerPageResponse(
    List<CustomerResponse> customers,
        int totalPages,
        long totalElements
) {}
