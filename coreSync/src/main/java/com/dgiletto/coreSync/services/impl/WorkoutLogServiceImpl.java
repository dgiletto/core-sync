package com.dgiletto.coreSync.services.impl;

import com.dgiletto.coreSync.domain.dto.WorkoutLogRequest;
import com.dgiletto.coreSync.domain.dto.WorkoutLogResponse;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import com.dgiletto.coreSync.mappers.ExerciseMapper;
import com.dgiletto.coreSync.mappers.WorkoutLogMapper;
import com.dgiletto.coreSync.repositories.UserRepository;
import com.dgiletto.coreSync.repositories.WorkoutRepository;
import com.dgiletto.coreSync.services.WorkoutLogService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkoutLogServiceImpl implements WorkoutLogService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;
    private final WorkoutLogMapper workoutLogMapper;
    private final ExerciseMapper exerciseMapper;

    public WorkoutLogServiceImpl(
            WorkoutRepository workoutRepository,
            UserRepository userRepository,
            WorkoutLogMapper workoutLogMapper,
            ExerciseMapper exerciseMapper
    ) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
        this.workoutLogMapper = workoutLogMapper;
        this.exerciseMapper = exerciseMapper;
    }

    @Override
    public WorkoutLogResponse createWorkoutLog(WorkoutLogRequest request) {
        var user = userRepository.findById(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var workoutLog = workoutLogMapper.toEntity(request);
        workoutLog.setUser(user);

        var exercises = request.exercises().stream()
                .map(er -> exerciseMapper.toEntity(er, workoutLog))
                .toList();
        workoutLog.setExercises(exercises);

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
}
