package com.dgiletto.coreSync.domain.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record WorkoutLogRequest(
        String name,
        LocalDate date,
        UUID userId,
        List<ExerciseRequest> exercises
) {
}
