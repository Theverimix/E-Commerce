package com.ecommerce.product;

import com.ecommerce.product.category.Category;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    Optional<Product> findByIdAndVisibleTrue(Long id);

    @Query(value = "SELECT p FROM Product p JOIN p.categories c WHERE c.id = :categoryId")
    List<Product> findByCategory(@Param("categoryId") Long idCategory);

    Page<Product> findAllByVisibleTrue(Pageable pageable);

    static Specification<Product> hasVisibleTrue() {
        return (root, query, cb) -> cb.equal(root.get("visible"), true);
    }

    static Specification<Product> nameContainingIgnoreCase(String search) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")),  "%" + search.toLowerCase()+ "%");
    }

    static Specification<Product> hasPriceLessThanEqual(Double price) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), price);
    }

    static Specification<Product> hasPriceBetween(Double minPrice, Double maxPrice) {
        return (root, query, cb) -> cb.between(root.get("price"), minPrice, maxPrice);
    }

    static Specification<Product> hasPriceGreaterThanEqual(Double price) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), price);
    }

    static Specification<Product> hasCategory(Category category) {
        return (root, query, cb) -> cb.isTrue(root.join("categories", JoinType.INNER).in(category));
    }

    static Specification<Product> hasSale() {
        return (root, query, cb) -> cb.isNotNull(root.get("sale"));
    }
}