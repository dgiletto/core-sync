package com.dgiletto.coreSync.domain.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "workout_logs")
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "workoutLog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises;

    public WorkoutLog() {
    }

    public WorkoutLog(UUID id, String name, LocalDate date, User user, List<Exercise> exercises) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.user = user;
        this.exercises = exercises;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        WorkoutLog that = (WorkoutLog) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(date, that.date) &&
                Objects.equals(user, that.user) &&
                Objects.equals(exercises, that.exercises);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, date, user, exercises);
    }

    @Override
    public String toString() {
        return "WorkoutLog{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", user=" + user +
                ", exercises=" + exercises +
                '}';
    }
}
