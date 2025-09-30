package com.dgiletto.coreSync.services.impl;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.Period;
import com.dgiletto.coreSync.domain.entities.ProgressReport;
import com.dgiletto.coreSync.domain.entities.User;
import com.dgiletto.coreSync.mappers.ProgressReportMapper;
import com.dgiletto.coreSync.repositories.ProgressReportRepository;
import com.dgiletto.coreSync.repositories.UserRepository;
import com.dgiletto.coreSync.services.ProgressReportService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProgressReportServiceImpl implements ProgressReportService {

    private final ProgressReportRepository progressReportRepository;
    private final ProgressReportMapper mapper;

    public ProgressReportServiceImpl(ProgressReportRepository progressReportRepository, ProgressReportMapper mapper) {
        this.progressReportRepository = progressReportRepository;
        this.mapper = mapper;
    }

    @Override
    public ProgressReportDto getReport(UUID userId, Period period) {
        return progressReportRepository.findByUserIdAndPeriod(userId, period)
                .map(mapper::toDto)
                .orElse(null);
    }

    @Override
    @Transactional
    public void updateReport(UUID userId, Period period, ProgressReportDto newReport) {
        ProgressReport report = progressReportRepository.findByUserIdAndPeriod(userId, period)
                .orElse(new ProgressReport());

        report.setStartDate(newReport.getStartDate());
        report.setEndDate(newReport.getEndDate());
        report.setStrengthProgress(newReport.getStrengthProgress());
        report.setEnduranceProgress(newReport.getEnduranceProgress());
        report.setBmiChange(newReport.getBmi());
        report.setAvgWeight(newReport.getWeight());

        progressReportRepository.save(report);
    }
}
