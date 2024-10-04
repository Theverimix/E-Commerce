package com.ecommerce.exception;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ApiResponse {

    private final boolean success;
    private final int statusCode;
    private final String message;
    private final LocalDateTime timestamp;
    private Object data;

    public ApiResponse(boolean success, int statusCode, String message, LocalDateTime timestamp) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
    }

    public Date convertirADate() {
        // Obtener la zona horaria por defecto del sistema
        ZoneId zonaHoraria = ZoneId.systemDefault();

        // Convertir LocalDate a Date
        Date fechaDate = Date.from(timestamp.atZone(zonaHoraria).toInstant());

        return fechaDate;
    }

    public static ApiResponse ok(Object data) {
        return success(HttpStatus.OK, "Ok").data(data);
    }

    public static ApiResponse ok(String message) {
        return success(HttpStatus.OK, message);
    }

    public static ApiResponse ok(String message, Object data) {
        return success(HttpStatus.OK, message).data(data);
    }

    public static ApiResponse created() {
        return success(HttpStatus.CREATED, "Entity created successfully");
    }

    public static ApiResponse updated() {
        return success(HttpStatus.OK, "Entity updated successfully");
    }

    public static ApiResponse deleted() {
        return success(HttpStatus.NO_CONTENT, "Entity deleted successfully");
    }

    public static ApiResponse deleted(Long id) {
        return success(HttpStatus.NO_CONTENT, "Entity with id [%s] was deleted".formatted(id));
    }

    public static ApiResponse badRequest(String message) {
        return error(HttpStatus.BAD_REQUEST, message);
    }

    public static ApiResponse unauthorized(String message) {
        return error(HttpStatus.UNAUTHORIZED, message);
    }

    public static ApiResponse forbidden(String message) {
        return error(HttpStatus.FORBIDDEN, message);
    }

    public static ApiResponse notFound(String message) {
        return error(HttpStatus.NOT_FOUND, message);
    }

    public static ApiResponse conflict(String message) {
        return error(HttpStatus.CONFLICT, message);
    }

    public static ApiResponse internalServerError(String message) {
        return error(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }

    public ApiResponse data(Object object) {
        this.data = object;
        return this;
    }

    // Generic Response

    private static ApiResponse success(HttpStatus status, String message) {
        return new ApiResponse(true, status.value(), message, LocalDateTime.now());
    }

    private static ApiResponse error(HttpStatus status, String message) {
        return new ApiResponse(false, status.value(), message, LocalDateTime.now());
    }
}