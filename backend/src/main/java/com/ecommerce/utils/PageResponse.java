package com.ecommerce.utils;

import java.util.List;

public record PageResponse<T>(
        List<T> content,
        int totalPages,
        long totalElements
) {}
