package com.dgiletto.coreSync.domain.dto;

import java.time.LocalDate;

public class ProgressReportDto {
    private LocalDate startDate;
    private LocalDate endDate;
    private double strengthProgress;
    private double enduranceProgress;
    private double weight;
    private double bmi;

    public ProgressReportDto(LocalDate startDate, LocalDate endDate,
                             double strengthProgress, double enduranceProgress,
                             double weight, double bmi) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.strengthProgress = strengthProgress;
        this.enduranceProgress = enduranceProgress;
        this.weight = weight;
        this.bmi = bmi;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public double getStrengthProgress() {
        return strengthProgress;
    }

    public void setStrengthProgress(double strengthProgress) {
        this.strengthProgress = strengthProgress;
    }

    public double getEnduranceProgress() {
        return enduranceProgress;
    }

    public void setEnduranceProgress(double enduranceProgress) {
        this.enduranceProgress = enduranceProgress;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getBmi() {
        return bmi;
    }

    public void setBmi(double bmi) {
        this.bmi = bmi;
    }
}
