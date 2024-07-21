package com.example.backend.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @OneToMany(cascade = CascadeType.PERSIST)
    private Set<Question> content;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Reward reward;
}
