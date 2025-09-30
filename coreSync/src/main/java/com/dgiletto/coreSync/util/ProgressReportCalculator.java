package com.dgiletto.coreSync.util;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.ExerciseType;
import com.dgiletto.coreSync.domain.entities.User;
import com.dgiletto.coreSync.domain.entities.WorkoutLog;
import com.dgiletto.coreSync.repositories.UserRepository;
import com.dgiletto.coreSync.repositories.WorkoutRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Component
public class ProgressReportCalculator {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    public ProgressReportCalculator(WorkoutRepository workoutRepository, UserRepository userRepository) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }

    private double computeStrengthProgress(List<WorkoutLog> logs) {
        // avg of total lifted weight for the week or month
        return logs.stream()
                .flatMap(log -> log.getExercises().stream())
                .filter(e -> e.getExerciseType() == ExerciseType.STRENGTH)
                .mapToDouble(e -> e.getReps() * e.getSets() * e.getWeight())
                .average()
                .orElse(0);
    }

    private double computeEnduranceProgress(List<WorkoutLog> logs) {
        // average speed (distance / duration)
        return logs.stream()
                .flatMap(log -> log.getExercises().stream())
                .filter(e -> e.getExerciseType() == ExerciseType.CARDIO)
                .mapToDouble(e -> e.getDistance() / (double) e.getDuration())
                .average()
                .orElse(0);
    }

    private double computeBmi(double weight, double height) {
        if (weight <= 0) return 0;
        return weight / (height * height) * 703;
    }

    @Transactional
    public ProgressReportDto calculate(UUID userId, LocalDate start, LocalDate end) {
        List<WorkoutLog> logs = workoutRepository.findByUserIdAndDateBetween(userId, start, end);
        User user = userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("User not found")
        );

        double avgStrength = computeStrengthProgress(logs);
        double avgSpeed = computeEnduranceProgress(logs);
        double latestWeight = logs.isEmpty() ? 0 : logs.getLast().getWeight();
        double bmi = computeBmi(latestWeight, user.getHeight());

        return new ProgressReportDto(
                start,
                end,
                avgStrength,
                avgSpeed,
                latestWeight,
                bmi
        );
    }
}
