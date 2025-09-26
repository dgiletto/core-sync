package com.dgiletto.coreSync.mappers;

import com.dgiletto.coreSync.domain.dto.WorkoutLogRequest;
import com.dgiletto.coreSync.domain.dto.WorkoutLogResponse;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;

public interface WorkoutLogMapper {

    WorkoutLog toEntity(WorkoutLogRequest dto);

    WorkoutLogResponse toResponse(WorkoutLog workoutLog);
}
