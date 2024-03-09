package com.ecommerce.services;

import com.ecommerce.dto.ProductStateDTO;
import com.ecommerce.dto.ProductStateDTOMapper;
import com.ecommerce.entities.ProductState;
import com.ecommerce.repositories.ProductStateRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductStateService {

    private final ProductStateRepository repository;
    private final ProductStateDTOMapper dtoMapper;

    public ProductStateService(ProductStateRepository repository, ProductStateDTOMapper dtoMapper) {
        this.repository = repository;
        this.dtoMapper = dtoMapper;
    }

    public List<ProductStateDTO> getAllStates(){
        return repository.findAll().stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public ProductStateDTO getStateById(Long id){
        return repository.findById(id)
                .map(dtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "State with id [%s] not found.".formatted(id)
                ));
    }

    public void saveState(ProductStateDTO dto){
        repository.save(new ProductState(
                dto.id(), dto.name(), dto.visible()
        ));
    }

    public void updateState(Long id, ProductState newState){
        ProductState state = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id));
        state.setName(newState.getName());
        state.setVisible(newState.isVisible());
        repository.save(state);
    }

    public void deleteState(Long id){
        ProductState state = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id));
        repository.delete(state);
    }
}
