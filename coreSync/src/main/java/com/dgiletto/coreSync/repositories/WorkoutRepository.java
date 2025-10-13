package com.dgiletto.coreSync.repositories;

import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<WorkoutLog, UUID> {
    Page<WorkoutLog> findAllByUserId(UUID userId, Pageable pageable);
    Optional<WorkoutLog> findByIdAndUserId(UUID workoutLogId, UUID userId);
    void deleteByIdAndUserId(UUID workoutLogId, UUID userId);
    List<WorkoutLog> findByUserIdAndDateBetween(UUID userId, LocalDate start, LocalDate end);
}
