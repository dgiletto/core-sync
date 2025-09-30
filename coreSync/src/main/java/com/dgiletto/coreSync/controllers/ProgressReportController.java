package com.dgiletto.coreSync.controllers;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.Period;
import com.dgiletto.coreSync.domain.entities.ProgressReport;
import com.dgiletto.coreSync.services.ProgressReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/report")
public class ProgressReportController {

    private final ProgressReportService progressReportService;

    public ProgressReportController(ProgressReportService progressReportService) {
        this.progressReportService = progressReportService;
    }

    // GET /api/report/{user_id}/weekly
    @GetMapping("/{user_id}/weekly")
    public ProgressReportDto getWeeklyReport(@PathVariable("user_id") UUID userId) {
        return progressReportService.getReport(userId, Period.WEEKLY);
    }

    // GET /api/report/{user_id}/monthly
    @GetMapping("/{user_id}/monthly")
    public ProgressReportDto getMonthlyReport(@PathVariable("user_id") UUID userId) {
        return progressReportService.getReport(userId, Period.MONTHLY);
    }
}
