package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private int successes;

    @Column(nullable = false)
    private int fails;

}
