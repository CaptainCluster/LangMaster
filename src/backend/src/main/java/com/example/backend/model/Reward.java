package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private int xp;
}
