package com.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
