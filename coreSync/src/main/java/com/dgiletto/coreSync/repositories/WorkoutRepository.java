package com.dgiletto.coreSync.repositories;

import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<WorkoutLog, UUID> {
    List<WorkoutLog> findByUserId(UUID userId);
}
