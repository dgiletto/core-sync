package com.dgiletto.coreSync.mappers;

import com.dgiletto.coreSync.domain.dto.ExerciseRequest;
import com.dgiletto.coreSync.domain.dto.ExerciseResponse;
import com.dgiletto.coreSync.domain.entities.Exercise;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;

public interface ExerciseMapper {
    Exercise toEntity(ExerciseRequest dto, WorkoutLog log);
    ExerciseResponse toResponse(Exercise exercise);
}
