package com.dgiletto.coreSync.controller;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void registerUser_ShouldSucceedWithoutAuth() throws Exception {
        String body = """
                {
                    "name": "John",
                    "email": "john@example.com",
                    "passwordHash": "password123",
                    "age": 21,
                    "weight": 140,
                    "height": 70,
                    "fitnessLevel": "INTERMEDIATE",
                    "goals": ["Weight gain"]
                }
        """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isCreated());

    }

    @Test
    void accessProtectedEndpoint_WithoutToken_ShouldFail() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/workouts"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void loginAndAccessProtectedEndpoint() throws Exception {
        // Login user and extract token
        MvcResult loginResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"john@example.com\", \"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        String token = JsonPath.parse(response).read("$.token");

        String userId = "61fbe004-85db-40bf-8b54-0b63e4a5402a";

        // Call a protected endpoint with token
        mockMvc.perform(MockMvcRequestBuilders.get("/api/workout/" + userId)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }


}
