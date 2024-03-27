package com.ecommerce.cart;

import com.ecommerce.customer.CustomerDTO;
import com.ecommerce.product.ProductResponse;

public record CartResponse(
        ProductResponse product,
        CustomerDTO customer,
        int amount
) {}
