package com.example.backend.service;

import com.example.backend.model.Question;
import com.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService
{
    @Autowired
    private QuestionRepository questionRepository;

    public Question getById(long id)
    {
        return questionRepository.findById(id).orElse(null);
    }

    public List<Question> getAllQuestions()
    {
        return questionRepository.findAll();
    }
}
