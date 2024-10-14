package com.ecommerce.order;

import com.ecommerce.customer.Customer;
import com.ecommerce.order.detail.OrderDetail;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String fullname;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(nullable = false)
    private String address;

    @Column(name = "address_country", nullable = true)
    private String addressCountry;

    @Column(name = "address_detail")
    private String addressDetail;

    @Column(name = "address_state", nullable = false)
    private String addressState;

    @Column(name = "address_city", nullable = false)
    private String addressCity;

    @Column(name = "zip_code", nullable = false)
    private int zipCode;

    @Column(name = "optional_comment")
    private String optionalComment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> details;

}