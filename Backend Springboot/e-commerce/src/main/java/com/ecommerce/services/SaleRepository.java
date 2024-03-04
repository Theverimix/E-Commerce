package com.ecommerce.services;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entities.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

}
