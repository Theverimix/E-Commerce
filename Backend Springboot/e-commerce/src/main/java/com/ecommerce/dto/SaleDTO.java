package com.ecommerce.dto;

import java.util.Date;
import java.util.Set;

import com.ecommerce.entities.Product;
import com.ecommerce.enums.DiscountsTypes;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDTO {
    private Long id;

    private String name;

    private Date startAt;

    private Date endAt;

    private DiscountsTypes discountType;

    private int discountValue;

    Set<Product> products;
}
