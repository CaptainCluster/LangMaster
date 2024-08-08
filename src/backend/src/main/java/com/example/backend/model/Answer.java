package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table
public class Answer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String content;

    @Column
    private boolean isCorrect;

    // Constructors
    public Answer() {}

    public Answer(String content, boolean isCorrect) {
        this.content = content;
        this.isCorrect = isCorrect;
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    // Getters
    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public boolean getIsCorrect() {
        return isCorrect;
    }
}
