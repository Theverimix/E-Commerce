package com.ecommerce.order;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum OrderStatus {

    CLOSED("Closed"),
    PENDING	("Pending"),
    APPROVED("Approved"),
    CANCELED("Canceled");

    private String name;

    OrderStatus(String name) {
        this.name = name;
    }

    @JsonCreator
    public static OrderStatus forValue(String value) {
        try {
            return OrderStatus.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid value for OrderStatus: " + value);
        }
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}
