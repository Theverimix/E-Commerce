package com.ecommerce.repositories;

import com.ecommerce.entities.ProductState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductStateRepository extends JpaRepository<ProductState, Long> {
}
