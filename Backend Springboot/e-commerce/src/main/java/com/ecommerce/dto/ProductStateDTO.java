package com.ecommerce.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductStateDTO {
    private Long id;

    private String name;

    private boolean visible;
}
