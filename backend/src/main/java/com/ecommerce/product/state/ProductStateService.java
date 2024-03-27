package com.ecommerce.product.state;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductStateService {

    private final ProductStateRepository repository;
    private final ProductStateMapper mapper;

    public List<ProductStateResponse> getAllStates() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public ProductStateResponse getStateById(Long stateId) {
        return repository.findById(stateId)
                .map(mapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "State with id [%s] not found.".formatted(stateId)));
    }

    public void saveState(ProductStateRequest request) {
        ProductState state = new ProductState();
        state.setName(request.name());
        state.setVisible(request.visible());
        repository.save(state);
    }

    public void updateState(Long stateId, ProductStateRequest request) {
        ProductState state = repository.findById(stateId)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + stateId));

        state.setName(request.name());
        state.setVisible(request.visible());
        repository.save(state);
    }

    public void deleteState(Long stateId) {
        ProductState state = repository.findById(stateId)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + stateId));

        repository.delete(state);
    }
}
