package com.example.backend.model;

import jakarta.persistence.*;

import java.util.HashSet;
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
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "question")
    private Set<Answer> answers;

    // Constructors
    public Question() 
    {
        this.answers = new HashSet<>();
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

    public void setAnswers(Set<Answer> answers)
    {
        this.answers = answers;
    }

    public void setQuiz(Quiz quiz)
    {
        this.quiz = quiz;
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

    public Set<Answer> getAnswers()
    {
        return answers;
    }

    public Quiz getQuiz()
    {
        return quiz;
    } 
}
