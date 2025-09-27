package com.dgiletto.coreSync.mappers.impl;

import com.dgiletto.coreSync.domain.dto.ExerciseRequest;
import com.dgiletto.coreSync.domain.dto.ExerciseResponse;
import com.dgiletto.coreSync.domain.entities.Exercise;
import com.dgiletto.coreSync.domain.entities.ExerciseType;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import com.dgiletto.coreSync.mappers.ExerciseMapper;
import org.springframework.stereotype.Component;

@Component
public class ExerciseMapperImpl implements ExerciseMapper {

    // Request DTO -> Entity
    @Override
    public Exercise toEntity(ExerciseRequest dto) {
        Exercise ex = new Exercise();
        ex.setName(dto.name());
        ex.setExerciseType(dto.exerciseType());
        ex.setDifficulty(dto.difficulty());

        if (dto.exerciseType() == ExerciseType.STRENGTH) {
            ex.setMuscleGroup(dto.muscleGroup());
            ex.setSets(dto.sets());
            ex.setReps(dto.reps());
            ex.setWeight(dto.weight());
            ex.setDuration(null);
            ex.setDistance(null);
        } else if (dto.exerciseType() == ExerciseType.CARDIO) {
            ex.setDuration(dto.duration());
            ex.setDistance(dto.distance());
            ex.setMuscleGroup(null);
            ex.setSets(null);
            ex.setReps(null);
            ex.setWeight(null);
        }

        return ex;
    }

    @Override
    public ExerciseResponse toResponse(Exercise exercise) {
        return new ExerciseResponse(
                exercise.getId(),
                exercise.getName(),
                exercise.getExerciseType(),
                exercise.getDifficulty(),
                exercise.getMuscleGroup(),
                exercise.getSets(),
                exercise.getReps(),
                exercise.getWeight(),
                exercise.getDuration(),
                exercise.getDistance()
        );
    }
}
