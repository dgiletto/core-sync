package com.dgiletto.coreSync.mappers.impl;

import com.dgiletto.coreSync.domain.dto.ExerciseResponse;
import com.dgiletto.coreSync.domain.dto.WorkoutLogRequest;
import com.dgiletto.coreSync.domain.dto.WorkoutLogResponse;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import com.dgiletto.coreSync.mappers.ExerciseMapper;
import com.dgiletto.coreSync.mappers.WorkoutLogMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class WorkoutLogMapperImpl implements WorkoutLogMapper{

    // Request DTO -> Entity
    @Override
    public WorkoutLog toEntity(WorkoutLogRequest dto) {
        WorkoutLog log = new WorkoutLog();
        log.setName(dto.name());
        log.setDate(dto.date());
        return log;
    }

    // Entity -> Response DTO
    @Override
    public WorkoutLogResponse toResponse(WorkoutLog log) {
        return new WorkoutLogResponse(
                log.getId(),
                log.getName(),
                log.getDate(),
                log.getUser().getId()
        );
    }
}
