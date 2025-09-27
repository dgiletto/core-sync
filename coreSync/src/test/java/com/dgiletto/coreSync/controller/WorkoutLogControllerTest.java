package com.dgiletto.coreSync.controller;


import com.jayway.jsonpath.JsonPath;
import jakarta.transaction.Transactional;
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
public class WorkoutLogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private String token;
    private UUID userId;

    @BeforeEach
    void setup() throws Exception{
        // login to JWT token
        MvcResult loginResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"email\":\"john@example.com\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        token = JsonPath.parse(response).read("$.token");

        // known user id of john@example.com
        userId = UUID.fromString("61fbe004-85db-40bf-8b54-0b63e4a5402a");
    }

    @Test
    void createWorkoutLogTest() throws Exception {
        String body = """
                {
                    "name": "Workout 1",
                    "date": "2025-09-27",
                    "userId": "%s"
                }
                """.formatted(userId);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/workout/log")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(userId.toString()))
                .andExpect(jsonPath("$.name").value("Workout 1"))
                .andExpect(jsonPath("$.date").value("2025-09-27"));
    }

    @Test
    void getAllWorkoutsByUserTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/workout/" + userId)
                    .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void getWorkoutLogByIdTest() throws Exception {
        // create new workout log
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
        String logId = JsonPath.parse(resp).read("$.id");

        // now get the specific new workout
        mockMvc.perform(MockMvcRequestBuilders.get("/api/workout/" + userId + "/" + logId)
                    .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(logId))
                .andExpect(jsonPath("$.name").value("Workout 1"))
                .andExpect(jsonPath("$.date").value("2025-09-27"))
                .andExpect(jsonPath("$.userId").value(userId.toString()));
    }

    @Test
    void updateWorkoutLogTest() throws Exception {
        // Create new workout log
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
        String logId = JsonPath.parse(resp).read("$.id");

        // now update it
        String updateBody = """
                {
                    "name": "Workout 2",
                    "date": "2025-09-25",
                    "userId": "%s"
                }
                """.formatted(userId);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/workout/" + userId + "/" + logId)
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(logId))
                .andExpect(jsonPath("$.name").value("Workout 2"))
                .andExpect(jsonPath("$.date").value("2025-09-25"))
                .andExpect(jsonPath("$.userId").value(userId.toString()));
    }

    @Test
    void deleteWorkoutLogTest() throws Exception {
        // create a new workout log
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
        String logId = JsonPath.parse(resp).read("$.id");

        // now delete it
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/workout/" + userId + "/" + logId)
                    .header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
    }
}
