package com.example.backend.input;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class InstanceCreationInput
{
    private Long quizId;
    private Long userId;
    private String username;

    public InstanceCreationInput() {}

    @JsonProperty("quizId")
    public Long getQuizId()
    {
        return quizId;
    }

    @JsonProperty("userId")
    public Long getUserId()
    {
        return userId;
    }

    @JsonProperty("username")
    public String getUsername()
    {
        return username;
    }

    public void setUserId(Long userId)
    {
        this.userId = userId;
    }

    public void setQuizId(Long quizId)
    {
        this.quizId = quizId;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }
}
