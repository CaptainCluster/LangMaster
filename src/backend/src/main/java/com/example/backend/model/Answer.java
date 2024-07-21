package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String content;

    @Column
    private boolean isCorrect;
}
