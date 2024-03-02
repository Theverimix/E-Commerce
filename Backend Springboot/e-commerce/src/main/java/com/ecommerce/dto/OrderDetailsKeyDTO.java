package com.ecommerce.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailsKeyDTO {
    private Long productId;

    private Long orderId;
}
