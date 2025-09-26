package com.dgiletto.coreSync.domain.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record WorkoutLogResponse(
        UUID id,
        String name,
        LocalDate date,
        UUID userId,
        List<ExerciseResponse> exercises
) {
}
