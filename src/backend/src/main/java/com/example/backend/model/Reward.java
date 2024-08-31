package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table
public class Reward
{
    private static final int DEFAULT_XP = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reward_id")
    private long id;

    @Column
    private int xp;

    // Constructors
    public Reward() {
        this.xp = DEFAULT_XP;
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }

    // Getters
    public long getId() {
        return id;
    }

    public int getXp() {
        return xp;
    }
}
