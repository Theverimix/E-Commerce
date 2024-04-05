package com.ecommerce.exception;

import jakarta.persistence.EntityNotFoundException;
import org.hibernate.ObjectNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(ObjectNotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    ApiResponse objectNotFoundException(ObjectNotFoundException e) {
        return ApiResponse.notFound(e.getMessage());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    ApiResponse entityNotFoundException(EntityNotFoundException e) {
        return ApiResponse.notFound(e.getMessage());
    }

    @ExceptionHandler({ UsernameNotFoundException.class, BadCredentialsException.class })
    @ResponseStatus(UNAUTHORIZED)
    ApiResponse authenticationException(Exception e) {
        return ApiResponse.unauthorized(e.getMessage());
    }

    @ExceptionHandler(InsufficientAuthenticationException.class)
    @ResponseStatus(UNAUTHORIZED)
    ApiResponse insufficientAuthenticationException(InsufficientAuthenticationException e) {
        return ApiResponse.unauthorized("Login credentials are missing").data(e.getMessage());
    }

    @ExceptionHandler(AccountStatusException.class)
    @ResponseStatus(UNAUTHORIZED)
    ApiResponse accountStatusException(AccountStatusException e) {
        return ApiResponse.unauthorized("User account is abnormal").data(e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(FORBIDDEN)
    ApiResponse accessDeniedException(AccessDeniedException e) {
        return ApiResponse.forbidden("No permission").data(e.getMessage());
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(NOT_FOUND)
    ApiResponse noHandlerFoundException(NoHandlerFoundException e) {
        return ApiResponse.notFound("This API endpoint is not found.").data(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(BAD_REQUEST)
    ApiResponse validationException(MethodArgumentNotValidException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();
        Map<String, String> map = new HashMap<>(errors.size());
        errors.forEach((error) -> {
            String key = ((FieldError) error).getField();
            String val = error.getDefaultMessage();
            map.put(key, val);
        });
        return ApiResponse.badRequest("Provided arguments are invalid, see data for details.").data(map);
    }

    // Handles any unhandled exceptions.
    @ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    ApiResponse otherException(Exception e) {
        return ApiResponse.internalServerError("A server internal error occurs.").data(e.getMessage());
    }

}