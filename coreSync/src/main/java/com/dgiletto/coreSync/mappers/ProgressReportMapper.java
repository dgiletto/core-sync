package com.dgiletto.coreSync.mappers;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.Period;
import com.dgiletto.coreSync.domain.entities.ProgressReport;
import com.dgiletto.coreSync.domain.entities.User;

import java.util.UUID;

public interface ProgressReportMapper {
    ProgressReport toEntity(ProgressReportDto dto, User user, Period period);
    ProgressReportDto toDto(ProgressReport entity);
}
