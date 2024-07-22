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
    @JoinColumn(name = "quiz_id", referencedColumnName = "id")
    private Set<Question> content;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Reward reward;

    // Constructors
    public Quiz() {
        this.name = "Unnamed Quiz";
        fillCommon();
    }

    public Quiz(String name) {
        this.name = name;
        fillCommon();
    }

    public void fillCommon() {
        this.reward = new Reward();
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setContent(Set<Question> content) {
        this.content = content;
    }

    public void setReward(Reward reward) {
        this.reward = reward;
    }

    // Getters
    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Set<Question> getContent() {
        return content;
    }

    public Reward getReward() {
        return reward;
    }
}
