package com.example.backend.input;

import java.util.Set;

public class QuizInput
{
    private String title;
    private Set<QuestionInput> questions;

    public String getTitle()
    {
        return title;
    }

    public Set<QuestionInput> getQuestions()
    {
        return questions;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public void setQuestions(Set<QuestionInput> questions)
    {
        this.questions = questions;
    }
}
