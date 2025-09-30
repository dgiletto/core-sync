package com.dgiletto.coreSync.repositories;

import com.dgiletto.coreSync.domain.dto.ProgressReportDto;
import com.dgiletto.coreSync.domain.entities.Period;
import com.dgiletto.coreSync.domain.entities.ProgressReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProgressReportRepository extends JpaRepository<ProgressReport, UUID> {
    Optional<ProgressReport> findByUserIdAndPeriod(UUID userId, Period period);
}
