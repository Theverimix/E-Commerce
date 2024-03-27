package com.ecommerce.sale;

import java.util.Date;
import java.util.Set;

import com.ecommerce.enums.DiscountsTypes;

import com.ecommerce.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import lombok.*;

@Entity
@Table(name = "sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @ManyToMany(mappedBy = "sales")
    Set<Product> products;
}
