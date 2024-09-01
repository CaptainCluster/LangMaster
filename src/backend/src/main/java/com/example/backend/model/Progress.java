package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table
public class Progress
{
    private static final int DEFAULT_SUCCESSES = 0;
    private static final int DEFAULT_FAILS = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="progress_id")
    private long id;

    @Column(nullable = false)
    private int successes;

    @Column(nullable = false)
    private int fails;

    // Constructors
    public Progress()
    {
        this.successes = DEFAULT_SUCCESSES;
        this.fails = DEFAULT_FAILS;
    }

    public Progress(int successes, int fails)
    {
        this.successes = successes;
        this.fails = fails;
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setSuccesses(int successes) {
        this.successes = successes;
    }

    public void setFails(int fails) {
        this.fails = fails;
    }

    // Getters
    public long getId() {
        return id;
    }

    public int getSuccesses() {
        return successes;
    }

    public int getFails() {
        return fails;
    }
}
