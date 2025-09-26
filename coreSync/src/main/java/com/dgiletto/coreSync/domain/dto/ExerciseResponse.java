package com.dgiletto.coreSync.domain.dto;

import com.dgiletto.coreSync.domain.entities.ExerciseDifficulty;
import com.dgiletto.coreSync.domain.entities.ExerciseType;

import java.util.UUID;

public record ExerciseResponse(
        UUID id,
        String name,
        ExerciseType exerciseType,
        ExerciseDifficulty difficulty,
        String muscleGroup,
        Integer sets,
        Integer reps,
        Double weight,
        Double duration,
        Double distance
) {
}
