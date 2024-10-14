package com.ecommerce.exception;

import lombok.Getter;

@Getter
public class PageNotFoundException extends Exception {
    private final int id;

    public PageNotFoundException(int id) {
        this.id = id;
    }
}
