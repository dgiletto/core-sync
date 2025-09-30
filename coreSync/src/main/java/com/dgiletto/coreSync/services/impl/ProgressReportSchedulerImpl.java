package com.dgiletto.coreSync.services.impl;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.Period;
import com.dgiletto.coreSync.domain.entities.ProgressReport;
import com.dgiletto.coreSync.domain.entities.User;
import com.dgiletto.coreSync.repositories.UserRepository;
import com.dgiletto.coreSync.services.ProgressReportScheduler;
import com.dgiletto.coreSync.services.ProgressReportService;
import com.dgiletto.coreSync.util.ProgressReportCalculator;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProgressReportSchedulerImpl implements ProgressReportScheduler {

    private final UserRepository userRepository;
    private final ProgressReportService progressReportService;
    private final ProgressReportCalculator progressReportCalculator;

    public ProgressReportSchedulerImpl(UserRepository userRepository, ProgressReportService progressReportService, ProgressReportCalculator progressReportCalculator) {
        this.userRepository = userRepository;
        this.progressReportService = progressReportService;
        this.progressReportCalculator = progressReportCalculator;
    }

    // Run every Sunday at 00:00 (midnight)
    @Override
    @Scheduled(cron = "0 0 0 * * SUN")
    public void updateWeeklyReports() {
        List<User> users = userRepository.findAll();
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusWeeks(1);

        for (User user : users) {
            ProgressReportDto report = progressReportCalculator.calculate(user.getId(), start, today);

            progressReportService.updateReport(user.getId(), Period.WEEKLY, report);
        }
    }

    // Run on the 1st of each month at 00:00 (midnight)
    @Override
    @Scheduled(cron = "0 0 0 1 * *")
    public void updateMonthlyReports() {
        List<User> users = userRepository.findAll();
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusMonths(1);

        for (User user : users) {
            ProgressReportDto report = progressReportCalculator.calculate(user.getId(), start, today);

            progressReportService.updateReport(user.getId(), Period.MONTHLY, report);
        }
    }
}
