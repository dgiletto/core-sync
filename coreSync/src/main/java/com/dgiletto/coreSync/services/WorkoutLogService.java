package com.dgiletto.coreSync.services;

import com.dgiletto.coreSync.domain.dto.WorkoutLogRequest;
import com.dgiletto.coreSync.domain.dto.WorkoutLogResponse;

import java.util.List;
import java.util.UUID;

public interface WorkoutLogService {
    WorkoutLogResponse createWorkoutLog(WorkoutLogRequest request);
    List<WorkoutLogResponse> getWorkoutsByUser(UUID userId);
}
