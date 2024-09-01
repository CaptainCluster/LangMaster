package com.example.backend.model;

import jakarta.persistence.*;

import java.util.Collections;
import java.util.Set;

@Entity
@Table
public class Question
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_id")
    private long id;

    @Column
    private String title;

    // Many Questions, one Quiz
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    // One Question, many Answers
    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "question")
    private Set<Answer> possibleAnswers;

    // Constructors
    public Question() 
    {
        this.possibleAnswers = Collections.emptySet();
    }

    // Setters
    public void setId(long id) 
    {
        this.id = id;
    }

    public void setTitle(String title) 
    {
        this.title = title;
    }

    public void setPossibleAnswers(Set<Answer> possibleAnswers) 
    {
        this.possibleAnswers = possibleAnswers;
    }

    // Getters
    public long getId() 
    {
        return id;
    }

    public String getTitle() 
    {
        return title;
    }

    public Set<Answer> getPossibleAnswers() 
    {
        return possibleAnswers;
    }
}
