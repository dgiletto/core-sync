package com.dgiletto.coreSync.mappers.impl;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.Period;
import com.dgiletto.coreSync.domain.entities.ProgressReport;
import com.dgiletto.coreSync.domain.entities.User;
import com.dgiletto.coreSync.mappers.ProgressReportMapper;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ProgressReportMapperImpl implements ProgressReportMapper {

    @Override
    public ProgressReport toEntity(ProgressReportDto dto, User user, Period period) {
        ProgressReport report = new ProgressReport();
        report.setUser(user);
        report.setPeriod(period);
        report.setStartDate(dto.getStartDate());
        report.setEndDate(dto.getEndDate());
        report.setStrengthProgress(dto.getStrengthProgress());
        report.setEnduranceProgress(dto.getEnduranceProgress());
        report.setAvgWeight(dto.getWeight());
        report.setBmiChange(dto.getBmi());
        return report;
    }

    @Override
    public ProgressReportDto toDto(ProgressReport entity) {
        return new ProgressReportDto(
                entity.getStartDate(),
                entity.getEndDate(),
                entity.getStrengthProgress(),
                entity.getEnduranceProgress(),
                entity.getAvgWeight(),
                entity.getBmiChange()
        );
    }
}
