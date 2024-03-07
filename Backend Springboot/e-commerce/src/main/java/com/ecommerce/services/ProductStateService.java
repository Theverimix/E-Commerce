package com.ecommerce.services;

import com.ecommerce.entities.ProductState;
import com.ecommerce.repositories.ProductStateRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductStateService {

    private final ProductStateRepository repository;

    @Autowired
    public ProductStateService(ProductStateRepository repository) {
        this.repository = repository;
    }

    public ProductState getStateById(Long id){
        return repository.findById(id).orElseThrow(() ->
                    new EntityNotFoundException("Product with id [%s] not found.".formatted(id)));
    }

    public List<ProductState> getAllStates(){
        return repository.findAll();
    }

    public ProductState saveState(ProductState state){
        return repository.save(state);
    }

    public ProductState updateState(Long id, ProductState newState){
        ProductState state = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id));
        state.setName(newState.getName());
        state.setVisible(newState.isVisible());
        return repository.save(state);
    }

    public void deleteState(Long id){
        ProductState state = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id));
        repository.delete(state);
    }
}
