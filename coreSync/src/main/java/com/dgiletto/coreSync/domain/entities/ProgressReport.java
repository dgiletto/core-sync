package com.dgiletto.coreSync.domain.entities;

import jakarta.persistence.*;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "progress_reports")
public class ProgressReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    private Period period;

    private Double strengthProgress;
    private Double enduranceProgress;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public ProgressReport() {
    }

    public ProgressReport(UUID id, Period period, Double strengthProgress,
                          Double enduranceProgress, User user) {
        this.id = id;
        this.period = period;
        this.strengthProgress = strengthProgress;
        this.enduranceProgress = enduranceProgress;
        this.user = user;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Period getPeriod() {
        return period;
    }

    public void setPeriod(Period period) {
        this.period = period;
    }

    public Double getStrengthProgress() {
        return strengthProgress;
    }

    public void setStrengthProgress(Double strengthProgress) {
        this.strengthProgress = strengthProgress;
    }

    public Double getEnduranceProgress() {
        return enduranceProgress;
    }

    public void setEnduranceProgress(Double enduranceProgress) {
        this.enduranceProgress = enduranceProgress;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProgressReport that = (ProgressReport) o;
        return Objects.equals(id, that.id) &&
                period == that.period &&
                Objects.equals(strengthProgress, that.strengthProgress) &&
                Objects.equals(enduranceProgress, that.enduranceProgress) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, period, strengthProgress, enduranceProgress, user);
    }

    @Override
    public String toString() {
        return "ProgressReport{" +
                "id=" + id +
                ", period=" + period +
                ", strengthProgress=" + strengthProgress +
                ", enduranceProgress=" + enduranceProgress +
                ", user=" + user +
                '}';
    }
}
