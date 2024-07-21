package com.example.backend.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "studiedLanguages")
    private Set<User> studyingUsers;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "id")
    private Set<Quiz> quizzes;
}
