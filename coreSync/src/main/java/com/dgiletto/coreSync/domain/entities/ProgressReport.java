package com.dgiletto.coreSync.domain.entities;

import jakarta.persistence.*;

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
}
