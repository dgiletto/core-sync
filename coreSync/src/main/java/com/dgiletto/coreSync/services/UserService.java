package com.dgiletto.coreSync.services;

import com.dgiletto.coreSync.domain.dto.UserUpdateDto;
import com.dgiletto.coreSync.domain.entities.User;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<User> getUser(UUID id);
    User updateUser(UUID id, UserUpdateDto updatedUser);
}
