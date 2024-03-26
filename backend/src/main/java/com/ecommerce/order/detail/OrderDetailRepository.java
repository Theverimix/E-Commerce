package com.ecommerce.order.detail;

import com.ecommerce.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailKey> {

    List<OrderDetail> findByOrder(Order order);

}