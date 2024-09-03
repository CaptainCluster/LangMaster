package com.example.backend.input;

import com.example.backend.model.Answer;

import java.util.Set;

public class QuestionInput
{
    private String title;
    private Set<AnswerInput> answers;

    public String getTitle()
    {
        return title;
    }

    public Set<AnswerInput> getAnswers()
    {
        return answers;
    }
}
