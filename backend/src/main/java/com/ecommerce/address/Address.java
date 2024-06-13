package com.ecommerce.address;

import com.ecommerce.customer.Customer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "Addresses")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "addressId")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String fullName;

    private String addressLine;

    private String city;

    private String region;

    private String country;

    private String phone;

    private String zip;

    private String deliveryInstructions;
}
