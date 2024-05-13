package com.ecommerce.product;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByIdAndVisibleTrue(Long id);

    @Query(value = "SELECT p FROM Product p JOIN p.categories c WHERE c.id = :categoryId")
    List<Product> findByCategory(@Param("categoryId") Long idCategory);

    Page<Product> findAllByVisibleTrue(Pageable pageable);

}