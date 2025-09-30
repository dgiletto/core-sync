package com.dgiletto.coreSync.services;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.Period;
import com.dgiletto.coreSync.domain.entities.ProgressReport;

import java.util.UUID;

public interface ProgressReportService {
    ProgressReportDto getReport(UUID userId, Period period);
    void updateReport(UUID userId, Period period, ProgressReportDto newReport);
}
