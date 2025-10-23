package com.dgiletto.coreSync.domain.dto;

import com.dgiletto.coreSync.domain.entities.FitnessLevel;

import java.util.List;

public record UserUpdateDto(
        String name,
        Integer age,
        Double weight,
        Double height,
        FitnessLevel fitnessLevel,
        List<String> goals
) {
}
