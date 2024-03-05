package com.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.entities.OrderDetails;
import com.ecommerce.entities.OrderDetailsKey;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, OrderDetailsKey> {

}
