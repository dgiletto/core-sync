package com.dgiletto.coreSync.domain.entities;

import jakarta.persistence.*;

import java.util.Objects;
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

    public Exercise() {
    }

    public Exercise(UUID id, String name, ExerciseType exerciseType,
                    ExerciseDifficulty difficulty, String muscleGroup,
                    Integer sets, Integer reps, Double weight,
                    Double duration, Double distance, WorkoutLog workoutLog) {
        this.id = id;
        this.name = name;
        this.exerciseType = exerciseType;
        this.difficulty = difficulty;
        this.muscleGroup = muscleGroup;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.duration = duration;
        this.distance = distance;
        this.workoutLog = workoutLog;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ExerciseType getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(ExerciseType exerciseType) {
        this.exerciseType = exerciseType;
    }

    public ExerciseDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(ExerciseDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    public String getMuscleGroup() {
        return muscleGroup;
    }

    public void setMuscleGroup(String muscleGroup) {
        this.muscleGroup = muscleGroup;
    }

    public Integer getSets() {
        return sets;
    }

    public void setSets(Integer sets) {
        this.sets = sets;
    }

    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public WorkoutLog getWorkoutLog() {
        return workoutLog;
    }

    public void setWorkoutLog(WorkoutLog workoutLog) {
        this.workoutLog = workoutLog;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Exercise exercise = (Exercise) o;
        return Objects.equals(id, exercise.id) &&
                Objects.equals(name, exercise.name) &&
                exerciseType == exercise.exerciseType &&
                difficulty == exercise.difficulty &&
                Objects.equals(muscleGroup, exercise.muscleGroup) &&
                Objects.equals(sets, exercise.sets) &&
                Objects.equals(reps, exercise.reps) &&
                Objects.equals(weight, exercise.weight) &&
                Objects.equals(duration, exercise.duration) &&
                Objects.equals(distance, exercise.distance) &&
                Objects.equals(workoutLog, exercise.workoutLog);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, exerciseType, difficulty,
                muscleGroup, sets, reps, weight, duration, distance, workoutLog);
    }

    @Override
    public String toString() {
        return "Exercise{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", exerciseType=" + exerciseType +
                ", difficulty=" + difficulty +
                ", muscleGroup='" + muscleGroup + '\'' +
                ", sets=" + sets +
                ", reps=" + reps +
                ", weight=" + weight +
                ", duration=" + duration +
                ", distance=" + distance +
                ", workoutLog=" + workoutLog +
                '}';
    }
}
