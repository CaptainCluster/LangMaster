package com.example.backend.model;

import jakarta.persistence.*;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table
public class Quiz
{
    // quiz_id as the primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="quiz_id")
    private long id;

    // The name of the quiz
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="language_id")
    @JsonBackReference
    private Language language;

    // A written description to describe the quiz
    @Column
    private String description;

    // One Quiz, many Questions
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "quiz")
    private Set<Question> questions;

    // A Reward entity for each Quiz
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="reward_id")
    private Reward reward;

    // Constructors
    public Quiz()
    {
        this.name = "Unnamed Quiz";
        this.reward = new Reward();
    }

    public Quiz(String name)
    {
        this.name = name;
        this.reward = new Reward();
    }

    // Setters
    public void setId(long id) 
    {
        this.id = id;
    }

    public void setName(String name) 
    {
        this.name = name;
    }

    public void setDescription(String description) 
    {
        this.description = description;
    }

    public void setLanguage(Language language)
    {
        this.language = language;
    }

    public void setQuestions(Set<Question> questions) 
    {
        this.questions = questions;
    }

    public void setReward(Reward reward) 
    {
        this.reward = reward;
    }

    // Getters
    public long getId() 
    {
        return id;
    }

    public String getName() 
    {
        return name;
    }

    public String getDescription() 
    {
        return description;
    }
    
    public Language getLanguage()
    {
      return language;
    }

    public Set<Question> getQuestions() 
    {
        return questions;
    }

    public Reward getReward() 
    {
        return reward;
    }
}
