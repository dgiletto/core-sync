package com.dgiletto.coreSync.domain.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "exercise_type", nullable = false)
    private ExerciseType exerciseType;

    @Column(name = "difficulty")
    private ExerciseDifficulty difficulty;

    // Strength Fields
    private String muscleGroup;
    private Integer sets;
    private Integer reps;
    private Double weight;

    // Endurance Fields
    private Double duration;
    private Double distance;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "workout_log_id", nullable = false)
    private WorkoutLog workoutLog;
}
