package com.ecommerce.repositories;

import com.ecommerce.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    // default List<User> findByCriteria(String name, String password, String email,
    // UsersStates state, UsersRoles role) {
    // return findAll((Specification<User>) (root, query, criteriaBuilder) -> {
    // List<Predicate> predicates = new ArrayList<>();

    // if (name != null && !name.isEmpty()) {
    // predicates.add(
    // criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" +
    // name.toLowerCase() + "%"));
    // }

    // if (password != null && !password.isEmpty()) {
    // predicates.add(criteriaBuilder.equal(root.get("password"), password));
    // }

    // if (email != null && !email.isEmpty()) {
    // predicates.add(criteriaBuilder.equal(root.get("email"), email));
    // }

    // if (state != null) {
    // predicates.add(criteriaBuilder.equal(root.get("state"), state));
    // }

    // if (role != null) {
    // predicates.add(criteriaBuilder.equal(root.get("role"), role));
    // }

    // return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    // });
    // }
}
