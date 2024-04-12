package com.ecommerce.cart;

import com.ecommerce.customer.CustomerResponse;
import com.ecommerce.product.ProductResponse;

public record CartResponse(
        ProductResponse product,
        CustomerResponse customer,
        int amount
) {}
