package com.ecommerce.customer;

import com.ecommerce.address.Address;
import com.ecommerce.order.Order;
import com.ecommerce.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Customers")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "customerId")
public class Customer extends User {

    private Date registerDate;

    private String country;

    @Column(unique = true)
    private String phone;

    @OneToMany(mappedBy = "customer")
    private List<Order> orders;

    @OneToMany(mappedBy = "customer")
    private List<Address> addresses;
}
