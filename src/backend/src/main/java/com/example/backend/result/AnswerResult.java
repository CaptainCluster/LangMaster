package com.example.backend.result;

public class AnswerResult
{
    private long id;
    private String content;

    public AnswerResult() {}

    public AnswerResult(long id, String content)
    {
        this.id = id;
        this.content = content;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public void setContent(String content)
    {
        this.content = content;
    }

    public long getId()
    {
        return id;
    }

    public String getContent()
    {
        return content;
    }
}
