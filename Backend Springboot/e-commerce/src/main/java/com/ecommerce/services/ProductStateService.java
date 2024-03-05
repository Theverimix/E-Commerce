package com.ecommerce.services;

import com.ecommerce.entities.ProductState;
import com.ecommerce.repositories.ProductStateRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductStateService {

    private final ProductStateRepository repository;

    @Autowired
    public ProductStateService(ProductStateRepository repository) {
        this.repository = repository;
    }

    public Optional<ProductState> getStateById(Long id){
        return repository.findById(id);
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
