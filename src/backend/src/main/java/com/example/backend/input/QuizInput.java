package com.example.backend.input;

import com.example.backend.model.Question;

import java.util.Set;

public class QuizInput
{
    private String name;
    private Set<Question> addQuestions;
    private Set<Question> removeQuestions;

    public String getName()
    {
        return name;
    }

    public Set<Question> getAddQuestions()
    {
        return addQuestions;
    }

    public Set<Question> getRemoveQuestions()
    {
        return removeQuestions;
    }
}
