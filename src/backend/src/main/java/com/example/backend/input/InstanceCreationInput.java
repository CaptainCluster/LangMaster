package com.example.backend.input;

public class InstanceCreationInput
{
    private Long quizId;
    private Long userId;

    public Long getQuizId()
    {
        return quizId;
    }

    public Long getUserId()
    {
        return userId;
    }

    public void setUserId(Long userId)
    {
        this.userId = userId;
    }

    public void setQuizId(Long quizId)
    {
        this.quizId = quizId;
    }
}
