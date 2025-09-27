package com.dgiletto.coreSync.repositories;

import com.dgiletto.coreSync.domain.entities.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
    List<Exercise> findByWorkoutLogId(UUID workoutLogId);
    Optional<Exercise> findByIdAndWorkoutLogId(UUID exerciseId, UUID workoutLogId);
    void deleteByIdAndWorkoutLogId(UUID exerciseId, UUID workoutLogId);
}
