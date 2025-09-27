package com.dgiletto.coreSync.controllers;

import com.dgiletto.coreSync.domain.dto.ExerciseRequest;
import com.dgiletto.coreSync.domain.dto.ExerciseResponse;
import com.dgiletto.coreSync.services.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;


    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    // POST /api/exercise/{workout_log_id}
    @PostMapping("/api/exercise/{workout_log_id")
    public ResponseEntity<ExerciseResponse> createExercise(
            @PathVariable("workout_log_id") UUID workoutLogId,
            @RequestBody ExerciseRequest request
    ) {
        ExerciseResponse response = exerciseService.createExercise(workoutLogId, request);
        return ResponseEntity.ok(response);
    }

    // GET /api/exercise/{workout_log_id}
    @GetMapping("/api/exercise/{workout_log_id}")
    public ResponseEntity<List<ExerciseResponse>> listExercises(
            @PathVariable("workout_log_id") UUID workoutLogId
    ) {
        List<ExerciseResponse> exercises = exerciseService.listExercisesByWorkoutLog(workoutLogId);
        return ResponseEntity.ok(exercises);
    }

    // GET /api/exercise/{workout_log_id}/{exercise_id}
    public ResponseEntity<ExerciseResponse> getExerciseById(
            @PathVariable("exercise_id") UUID exerciseId,
            @PathVariable("workout_log_id") UUID workoutLogId
    ) {
        return ResponseEntity.ok(exerciseService.getExercise(exerciseId, workoutLogId));
    }

    // PUT /api/exercise/{workout_log_id}/{exercise_id}
    public ResponseEntity<ExerciseResponse> updateExercise(
            @PathVariable("exercise_id") UUID exerciseId,
            @PathVariable("workout_log_id") UUID workoutLogId,
            @RequestBody ExerciseRequest request
    ) {
        return ResponseEntity.ok(exerciseService.updateExercise(exerciseId, workoutLogId, request));
    }

    // DELETE /api/exercise/{workout_log_id}/{exercise_id}
    public ResponseEntity<Void> deleteExercise(
            @PathVariable("exercise_id") UUID exerciseId,
            @PathVariable("workout_log_id") UUID workoutLogId
    ) {
        exerciseService.deleteExercise(exerciseId, workoutLogId);
        return ResponseEntity.noContent().build();
    }
}
