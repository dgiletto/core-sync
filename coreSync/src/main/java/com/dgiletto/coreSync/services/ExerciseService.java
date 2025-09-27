package com.dgiletto.coreSync.services;

import com.dgiletto.coreSync.domain.dto.ExerciseRequest;
import com.dgiletto.coreSync.domain.dto.ExerciseResponse;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {
    ExerciseResponse createExercise(UUID workoutLogId, ExerciseRequest exerciseRequest);
    List<ExerciseResponse> listExercisesByWorkoutLog(UUID workoutLogId);
    ExerciseResponse getExercise(UUID exerciseId, UUID workoutLogId);
    ExerciseResponse updateExercise(UUID exerciseId, UUID workoutLogId, ExerciseRequest request);
    void deleteExercise(UUID exerciseId, UUID workoutLogId);
}
