package com.example.backend.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String title;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "answer_id", referencedColumnName = "id")
    private Set<Answer> possibleAnswers;
}
