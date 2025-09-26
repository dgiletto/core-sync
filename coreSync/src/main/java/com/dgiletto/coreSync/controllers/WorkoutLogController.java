package com.dgiletto.coreSync.controllers;

import com.dgiletto.coreSync.domain.dto.WorkoutLogRequest;
import com.dgiletto.coreSync.domain.dto.WorkoutLogResponse;
import com.dgiletto.coreSync.services.WorkoutLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/workout")
public class WorkoutLogController {

    private final WorkoutLogService workoutLogService;

    public WorkoutLogController(WorkoutLogService workoutLogService) {
        this.workoutLogService = workoutLogService;
    }

    // POST /api/workout/log
    @PostMapping("/log")
    public ResponseEntity<WorkoutLogResponse> createWorkoutLog(@RequestBody WorkoutLogRequest request) {
        WorkoutLogResponse response = workoutLogService.createWorkoutLog(request);
        return ResponseEntity.ok(response);
    }

    // GET /api/workout/{user_id}
    @GetMapping("/{user_id}")
    public ResponseEntity<List<WorkoutLogResponse>> getWorkoutsByUser(@PathVariable("user_id") UUID userId) {
        List<WorkoutLogResponse> workouts = workoutLogService.getWorkoutsByUser(userId);
        return ResponseEntity.ok(workouts);
    }
}
