package com.example.backend.input;

import java.util.Set;

public class QuizInput
{
    private long id;
    private String name;
    private Set<QuestionInput> questions;

    public long getId()
    {
        return id;
    } 
    
    public String getName()
    {
        return name;
    }

    public Set<QuestionInput> getQuestions()
    {
        return questions;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public void setQuestions(Set<QuestionInput> questions)
    {
        this.questions = questions;
    }
}
