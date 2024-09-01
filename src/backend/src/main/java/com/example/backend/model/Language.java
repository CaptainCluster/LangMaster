package com.example.backend.model;

import jakarta.persistence.*;
import java.util.Collections;
import java.util.Set;

@Entity
@Table
public class Language
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="language_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "languages")
    private Set<User> users;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "language")
    private Set<Quiz> quizzes;

    // Constructors
    public Language()
    {
        this.users = Collections.emptySet();
        this.quizzes = Collections.emptySet();
    }

    public Language(String name)
    {
        this.name = name;
        this.users = Collections.emptySet();
        this.quizzes = Collections.emptySet();
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setStudyingUsers(Set<User> users) {
        this.users = users;
    }

    public void setQuizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
    }

    // Getters
    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Set<User> getUsers() {
        return this.users;
    }

    public Set<Quiz> getQuizzes() {
        return this.quizzes;
    }
}
