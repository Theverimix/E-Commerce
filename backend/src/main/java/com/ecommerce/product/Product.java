package com.ecommerce.product;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.ecommerce.product.category.Category;
import com.ecommerce.product.state.ProductState;
import com.ecommerce.sale.Sale;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        private String name;

        private String description;

        private double price;

        private int stock;

        @Column(name = "created_date")
        private Date createdAt;

        @ManyToOne
        private ProductState state;

        private boolean visible;

        private Set<String> images;

        @ManyToMany
        @JoinTable(name = "product_categories", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
        private List<Category> categories;

        @ManyToOne
        @JoinColumn(name = "sale_id", nullable = true)
        private Sale sale;
}
