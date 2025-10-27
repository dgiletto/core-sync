package com.dgiletto.coreSync.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
    @GetMapping("/api/health")
    public String health() {
        return "OK";
    }
}
