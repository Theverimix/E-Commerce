package com.ecommerce.repositories;

import com.ecommerce.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.entities.OrderDetails;
import com.ecommerce.entities.OrderDetailsKey;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, OrderDetailsKey> {

    @Query(value = "SELECT d FROM OrderDetails d WHERE d.order = :order")
    List<OrderDetails> findByOrder(Order order);

}
