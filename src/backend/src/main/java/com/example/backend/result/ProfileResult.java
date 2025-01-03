package com.example.backend.result;

import java.util.Set;

public class ProfileResult
{
    private boolean success;
    private String username;
    private String bio;
    private Set<String> languages;

    public ProfileResult() {}

    public ProfileResult(boolean success)
    {
        this.success = success;
    }

    public void setSuccess(boolean success)
    {
        this.success = success;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public void setBio(String bio)
    {
        this.bio = bio;
    }

    public void setLanguages(Set<String> languages)
    {
        this.languages = languages;
    }
}
