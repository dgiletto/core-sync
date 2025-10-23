package com.dgiletto.coreSync.services.impl;

import com.dgiletto.coreSync.domain.dto.UserUpdateDto;
import com.dgiletto.coreSync.domain.entities.User;
import com.dgiletto.coreSync.repositories.UserRepository;
import com.dgiletto.coreSync.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> getUser(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public User updateUser(UUID id, UserUpdateDto updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    if (updatedUser.name() != null) user.setName(updatedUser.name());
                    if (updatedUser.age() != null) user.setAge(updatedUser.age());
                    if (updatedUser.weight() != null) user.setWeight(updatedUser.weight());
                    if (updatedUser.height() != null) user.setHeight(updatedUser.height());
                    if (updatedUser.fitnessLevel() != null) user.setFitnessLevel(updatedUser.fitnessLevel());
                    if (updatedUser.goals() != null) user.setGoals(updatedUser.goals());

                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}
