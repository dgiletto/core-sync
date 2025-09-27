package com.dgiletto.coreSync.services.impl;

import com.dgiletto.coreSync.domain.dto.ExerciseRequest;
import com.dgiletto.coreSync.domain.dto.ExerciseResponse;
import com.dgiletto.coreSync.domain.entities.Exercise;
import com.dgiletto.coreSync.domain.entities.ExerciseType;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import com.dgiletto.coreSync.mappers.ExerciseMapper;
import com.dgiletto.coreSync.repositories.ExerciseRepository;
import com.dgiletto.coreSync.repositories.WorkoutRepository;
import com.dgiletto.coreSync.services.ExerciseService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;
    private final WorkoutRepository workoutRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, ExerciseMapper exerciseMapper, WorkoutRepository workoutRepository) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
        this.workoutRepository = workoutRepository;
    }

    @Transactional
    @Override
    public ExerciseResponse createExercise(UUID workoutLogId, ExerciseRequest exerciseRequest) {
        Optional<WorkoutLog> log = workoutRepository.findById(workoutLogId);
        var exercise = exerciseMapper.toEntity(exerciseRequest);
        exercise.setWorkoutLog(log.orElse(null));

        var saved = exerciseRepository.save(exercise);
        return exerciseMapper.toResponse(saved);
    }

    @Override
    public List<ExerciseResponse> listExercisesByWorkoutLog(UUID workoutLogId) {
        List<Exercise> exercises = exerciseRepository.findByWorkoutLogId(workoutLogId);
        return exercises.stream()
                .map(exerciseMapper::toResponse)
                .toList();
    }

    @Override
    public ExerciseResponse getExercise(UUID exerciseId, UUID workoutLogId) {
        var exercise = exerciseRepository.findByIdAndWorkoutLogId(exerciseId, workoutLogId)
                .orElseThrow(() -> new IllegalArgumentException("Exercise was not found for this workout log"));
        return exerciseMapper.toResponse(exercise);
    }

    @Transactional
    @Override
    public ExerciseResponse updateExercise(UUID exerciseId, UUID workoutLogId, ExerciseRequest request) {
        // Ensure enums are not null
        if (null == request.exerciseType()) {
            throw new IllegalArgumentException("Exercise must have a valid exercise type");
        }

        if (null == request.difficulty()) {
            throw new IllegalArgumentException("Exercise must have a valid exercise difficulty");
        }

        var exercise = exerciseRepository.findByIdAndWorkoutLogId(exerciseId, workoutLogId)
                .orElseThrow(() -> new IllegalArgumentException("Exercise was not found for this workout log"));

        exercise.setName(request.name());
        exercise.setExerciseType(request.exerciseType());
        exercise.setDifficulty(request.difficulty());

        // Only set certain variables depending on exercise type
        if (exercise.getExerciseType() == ExerciseType.STRENGTH) {
            exercise.setMuscleGroup(request.muscleGroup());
            exercise.setSets(request.sets());
            exercise.setReps(request.reps());
            exercise.setWeight(request.weight());
            exercise.setDuration(null);
            exercise.setDistance(null);
        }

        else if (exercise.getExerciseType() == ExerciseType.CARDIO) {
            exercise.setMuscleGroup(null);
            exercise.setSets(null);
            exercise.setReps(null);
            exercise.setWeight(null);
            exercise.setDuration(request.duration());
            exercise.setDistance(request.distance());
        }

        var updated = exerciseRepository.save(exercise);
        return exerciseMapper.toResponse(updated);
    }

    @Transactional
    @Override
    public void deleteExercise(UUID exerciseId, UUID workoutLogId) {
        exerciseRepository.deleteByIdAndWorkoutLogId(exerciseId, workoutLogId);
    }
}
