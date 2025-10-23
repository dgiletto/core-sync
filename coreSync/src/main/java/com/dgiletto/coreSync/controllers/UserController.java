package com.dgiletto.coreSync.controllers;

import com.dgiletto.coreSync.domain.dto.UserUpdateDto;
import com.dgiletto.coreSync.domain.entities.User;
import com.dgiletto.coreSync.repositories.UserRepository;
import com.dgiletto.coreSync.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<User> getUserById(@PathVariable("user_id") UUID id) {
        return userService.getUser(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{user_id}")
    public ResponseEntity<User> updateUserById(
            @PathVariable("user_id") UUID id,
            @RequestBody UserUpdateDto updateDto
    ) {
        try {
            User updatedUser = userService.updateUser(id, updateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException error) {
            return ResponseEntity.notFound().build();
        }
    }
}
