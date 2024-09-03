package com.example.backend.input;

import com.example.backend.model.Question;

import java.util.Set;

public class QuizInput
{
    private String name;
    private Set<QuestionInput> questions;

    public String getName()
    {
        return name;
    }

    public Set<QuestionInput> getQuestions()
    {
        return questions;
    }

}
