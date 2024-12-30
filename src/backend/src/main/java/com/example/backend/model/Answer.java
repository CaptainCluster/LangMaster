package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table
public class Answer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="answer_id")
    private long id;

    @Column
    private String title;

    @Column
    private boolean isCorrect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="question_id")
    @JsonBackReference
    private Question question;

    // Constructors
    public Answer() {}

    public Answer(String content, boolean isCorrect)
    {
        this.title = content;
        this.isCorrect = isCorrect;
    }

    // Setters
    public void setId(long id) 
    {
        this.id = id;
    }

    public void setTitle(String content) 
    {
        this.title = content;
    }

    public void setIsCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public void setQuestion(Question question)
    {
      this.question = question;
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

    public boolean getIsCorrect() 
    {
        return isCorrect;
    }

    public Question getQuestion()
    {
        return question;
    }
}
