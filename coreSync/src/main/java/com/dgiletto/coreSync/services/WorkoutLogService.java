package com.dgiletto.coreSync.services;

import com.dgiletto.coreSync.domain.dto.WorkoutLogRequest;
import com.dgiletto.coreSync.domain.dto.WorkoutLogResponse;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkoutLogService {
    WorkoutLogResponse createWorkoutLog(WorkoutLogRequest request);
    Page<WorkoutLogResponse> getWorkoutsByUser(UUID userId, Pageable pageable);
    WorkoutLogResponse getWorkoutLog(UUID userId, UUID workoutLogId);
    WorkoutLogResponse updateWorkoutLog(UUID userId, UUID workoutLogId, WorkoutLogRequest request);
    void deleteWorkoutLog(UUID userId, UUID workoutLogId);
}
