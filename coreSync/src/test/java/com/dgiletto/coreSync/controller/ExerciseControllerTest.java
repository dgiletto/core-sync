package com.dgiletto.coreSync.controller;

import com.jayway.jsonpath.JsonPath;
import jakarta.transaction.Transactional;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.UUID;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ExerciseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private String token;
    private UUID workoutLogId;

    @BeforeEach
    void setup() throws Exception {
        // login to get JWT
        MvcResult loginResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"john@example.com\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        // Store the token for authorization
        token = JsonPath.parse(response).read("$.token");

        // known user id of john@example.com
        UUID userId = UUID.fromString("61fbe004-85db-40bf-8b54-0b63e4a5402a");

        // Create a workout log to add exercises to
        String body = """
                {
                    "name": "Workout 1",
                    "date": "2025-09-27",
                    "userId": "%s"
                }
                """.formatted(userId);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/workout/log")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andReturn();
        String resp = result.getResponse().getContentAsString();
        // Store the workout log id for testing
        workoutLogId = UUID.fromString(JsonPath.parse(resp).read("$.id"));
    }

    @Test
    void createExerciseTest_ForCardio() throws Exception {
        String body = """
                {
                    "name": "Run",
                    "exerciseType": "CARDIO",
                    "difficulty": "HIGH",
                    "muscleGroup": null,
                    "sets": null,
                    "reps": null,
                    "weight": null,
                    "duration": 16,
                    "distance": 2
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/exercise/" + workoutLogId)
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Run"))
                .andExpect(jsonPath("$.exerciseType").value("CARDIO"))
                .andExpect(jsonPath("$.difficulty").value("HIGH"))
                .andExpect(jsonPath("$.muscleGroup").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.duration").value(16));
    }

    @Test
    void createExerciseTest_ForStrength() throws Exception {
        String body = """
                {
                    "name": "Dumbbell Curls",
                    "exerciseType": "STRENGTH",
                    "difficulty": "HIGH",
                    "muscleGroup": "Biceps",
                    "sets": 3,
                    "reps": 10,
                    "weight": 25,
                    "duration": null,
                    "distance": null
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/exercise/" + workoutLogId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Dumbbell Curls"))
                .andExpect(jsonPath("$.exerciseType").value("STRENGTH"))
                .andExpect(jsonPath("$.difficulty").value("HIGH"))
                .andExpect(jsonPath("$.muscleGroup").value("Biceps"))
                .andExpect(jsonPath("$.duration").value(IsNull.nullValue()));
    }

    @Test
    void getAllExercisesInWorkoutTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/exercise/" + workoutLogId)
                    .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void getExerciseById() throws Exception {
        // create new exercise
        String body = """
                {
                    "name": "Dumbbell Curls",
                    "exerciseType": "STRENGTH",
                    "difficulty": "HIGH",
                    "muscleGroup": "Biceps",
                    "sets": 3,
                    "reps": 10,
                    "weight": 25,
                    "duration": null,
                    "distance": null
                }
                """;
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/exercise/" + workoutLogId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andReturn();
        String resp = result.getResponse().getContentAsString();
        String exerciseId = JsonPath.parse(resp).read("$.id");

        // now get the specific new exercise by id
        mockMvc.perform(MockMvcRequestBuilders.get("/api/exercise/" + workoutLogId + "/" + exerciseId)
                    .header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.name").value("Dumbbell Curls"))
                .andExpect(jsonPath("$.exerciseType").value("STRENGTH"))
                .andExpect(jsonPath("$.difficulty").value("HIGH"))
                .andExpect(jsonPath("$.muscleGroup").value("Biceps"))
                .andExpect(jsonPath("$.duration").value(IsNull.nullValue()));
    }

    @Test
    void updateExerciseTest() throws Exception {
        // create new exercise
        String body = """
                {
                    "name": "Dumbbell Curls",
                    "exerciseType": "STRENGTH",
                    "difficulty": "HIGH",
                    "muscleGroup": "Biceps",
                    "sets": 3,
                    "reps": 10,
                    "weight": 25,
                    "duration": null,
                    "distance": null
                }
                """;
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/exercise/" + workoutLogId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andReturn();
        String resp = result.getResponse().getContentAsString();
        String exerciseId = JsonPath.parse(resp).read("$.id");

        // update that newly created exercise
        String updateBody = """
                {
                    "name": "Run",
                    "exerciseType": "CARDIO",
                    "difficulty": "HIGH",
                    "muscleGroup": null,
                    "sets": null,
                    "reps": null,
                    "weight": null,
                    "duration": 16,
                    "distance": 2
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.put("/api/exercise/" + workoutLogId + "/" + exerciseId)
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(exerciseId))
                .andExpect(jsonPath("$.name").value("Run"))
                .andExpect(jsonPath("$.exerciseType").value("CARDIO"))
                .andExpect(jsonPath("$.difficulty").value("HIGH"))
                .andExpect(jsonPath("$.muscleGroup").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.duration").value(16));
    }

    @Test
    void deleteExerciseTest() throws Exception {
        // create new exercise
        String body = """
                {
                    "name": "Dumbbell Curls",
                    "exerciseType": "STRENGTH",
                    "difficulty": "HIGH",
                    "muscleGroup": "Biceps",
                    "sets": 3,
                    "reps": 10,
                    "weight": 25,
                    "duration": null,
                    "distance": null
                }
                """;
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/exercise/" + workoutLogId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andReturn();
        String resp = result.getResponse().getContentAsString();
        String exerciseId = JsonPath.parse(resp).read("$.id");

        // now delete it
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/exercise/" + workoutLogId + "/" + exerciseId)
                    .header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
    }
}
