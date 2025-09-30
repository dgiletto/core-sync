package com.dgiletto.coreSync.domain.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "progress_reports")
public class ProgressReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Period period;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    // Calculated Values
    private Double avgWeight;
    private Double bmiChange;
    private Double enduranceProgress;
    private Double strengthProgress;

    public ProgressReport() {
    }

    public ProgressReport(UUID id, User user, Period period,
                          LocalDate startDate, LocalDate endDate,
                          Double avgWeight, Double bmiChange,
                          Double enduranceProgress, Double strengthProgress) {
        this.id = id;
        this.user = user;
        this.period = period;
        this.startDate = startDate;
        this.endDate = endDate;
        this.avgWeight = avgWeight;
        this.bmiChange = bmiChange;
        this.enduranceProgress = enduranceProgress;
        this.strengthProgress = strengthProgress;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Period getPeriod() {
        return period;
    }

    public void setPeriod(Period period) {
        this.period = period;
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

    public Double getAvgWeight() {
        return avgWeight;
    }

    public void setAvgWeight(Double avgWeight) {
        this.avgWeight = avgWeight;
    }

    public Double getBmiChange() {
        return bmiChange;
    }

    public void setBmiChange(Double bmiChange) {
        this.bmiChange = bmiChange;
    }

    public Double getEnduranceProgress() {
        return enduranceProgress;
    }

    public void setEnduranceProgress(Double enduranceProgress) {
        this.enduranceProgress = enduranceProgress;
    }

    public Double getStrengthProgress() {
        return strengthProgress;
    }

    public void setStrengthProgress(Double strengthProgress) {
        this.strengthProgress = strengthProgress;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProgressReport that = (ProgressReport) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(user, that.user) &&
                period == that.period &&
                Objects.equals(startDate, that.startDate) &&
                Objects.equals(endDate, that.endDate) &&
                Objects.equals(avgWeight, that.avgWeight) &&
                Objects.equals(bmiChange, that.bmiChange) &&
                Objects.equals(enduranceProgress, that.enduranceProgress) &&
                Objects.equals(strengthProgress, that.strengthProgress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, period, startDate,
                endDate, avgWeight, bmiChange, enduranceProgress, strengthProgress);
    }

    @Override
    public String toString() {
        return "ProgressReport{" +
                "id=" + id +
                ", user=" + user +
                ", period=" + period +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", avgWeight=" + avgWeight +
                ", bmiChange=" + bmiChange +
                ", enduranceProgress=" + enduranceProgress +
                ", strengthProgress=" + strengthProgress +
                '}';
    }
}
