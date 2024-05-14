package com.ecommerce.sale;

import java.util.Date;
import java.util.List;

import com.ecommerce.product.Product;
import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "sales")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Date startAt;

    private Date endAt;

    @Enumerated(EnumType.STRING)
    private DiscountsTypes discountType;

    private int discountValue;

    @OneToMany(mappedBy = "sale")
    private List<Product> products;
}
