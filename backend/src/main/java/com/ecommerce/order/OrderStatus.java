package com.ecommerce.order;

import lombok.Getter;

@Getter
public enum OrderStatus {

    CLOSED("Closed"),
    IN_PROCESS("In Process"),
    SUSPENDED("Suspended"),
    CANCELED("Canceled");

    private String name;

    OrderStatus(String name) {
        this.name = name;
    }
}
