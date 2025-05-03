package com.example.backend.result;

public class LoginResult
{
    private boolean success;
    private String token;

    public LoginResult() {}

    public LoginResult(boolean success)
    {
        this.success = success;
    }

    public void setSuccess(boolean success)
    {
        this.success = success;
    }

    public void setToken(String token)
    {
        this.token = token;
    }

    public boolean isSuccess()
    {
        return success;
    }

    public String getToken()
    {
        return token;
    }
}
