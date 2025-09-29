package com.dgiletto.coreSync.services.impl;

import com.dgiletto.coreSync.domain.dto.WorkoutLogRequest;
import com.dgiletto.coreSync.domain.dto.WorkoutLogResponse;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import com.dgiletto.coreSync.mappers.ExerciseMapper;
import com.dgiletto.coreSync.mappers.WorkoutLogMapper;
import com.dgiletto.coreSync.repositories.UserRepository;
import com.dgiletto.coreSync.repositories.WorkoutRepository;
import com.dgiletto.coreSync.services.WorkoutLogService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class WorkoutLogServiceImpl implements WorkoutLogService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;
    private final WorkoutLogMapper workoutLogMapper;

    public WorkoutLogServiceImpl(
            WorkoutRepository workoutRepository,
            UserRepository userRepository,
            WorkoutLogMapper workoutLogMapper
    ) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
        this.workoutLogMapper = workoutLogMapper;
    }

    @Transactional
    @Override
    public WorkoutLogResponse createWorkoutLog(WorkoutLogRequest request) {
        var user = userRepository.findById(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var workoutLog = workoutLogMapper.toEntity(request);
        workoutLog.setUser(user);

        var saved = workoutRepository.save(workoutLog);
        return workoutLogMapper.toResponse(saved);
    }

    @Override
    public List<WorkoutLogResponse> getWorkoutsByUser(UUID userId) {
        List<WorkoutLog> logs = workoutRepository.findByUserId(userId);
        return logs.stream()
                .map(workoutLogMapper::toResponse)
                .toList();
    }

    @Override
    public WorkoutLogResponse getWorkoutLog(UUID userId, UUID workoutLogId) {
        var log = workoutRepository.findByIdAndUserId(workoutLogId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Workout log not found for this user"));
        return workoutLogMapper.toResponse(log);
    }

    @Transactional
    @Override
    public WorkoutLogResponse updateWorkoutLog(UUID userId, UUID workoutLogId, WorkoutLogRequest request) {
        var workoutLog = workoutRepository.findByIdAndUserId(workoutLogId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Workout log not found for this user"));
        workoutLog.setName(request.name());
        workoutLog.setDate(request.date());
        workoutLog.setWeight(request.weight());
        var updated = workoutRepository.save(workoutLog);
        return workoutLogMapper.toResponse(updated);
    }

    @Transactional
    @Override
    public void deleteWorkoutLog(UUID userId, UUID workoutLogId) {
        workoutRepository.deleteByIdAndUserId(workoutLogId, userId);
    }
}
