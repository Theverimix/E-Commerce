package com.ecommerce.dto;

import java.util.Date;
import java.util.List;

import com.ecommerce.entities.Order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO extends UserDTO {

    private String address;

    private Date registerDate;

    private String country;

    private String phone;

    private List<Order> orders;
}
