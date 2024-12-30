package com.example.backend.service;

import com.example.backend.input.AnswerInput;
import com.example.backend.input.QuestionInput;
import com.example.backend.model.Answer;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuestionService
{
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerService answerService;

    public Question getById(long id)
    {
        return questionRepository.findById(id).orElse(null);
    }

    public List<Question> getAllQuestions()
    {
        return questionRepository.findAll();
    }

    public Set<Question> convertInputToQuestion(Set<QuestionInput> questionInputs, Quiz quiz)
    {
        Set<Question> questions = new HashSet<>();
        for (QuestionInput questionInput : questionInputs)
        {
            Question newQuestion = new Question();
            newQuestion.setTitle(questionInput.getTitle());
            newQuestion.setQuiz(quiz);      

            Set<Answer> answers = answerService.convertInputsToAnswers(questionInput.getAnswers(), newQuestion);
            
            System.out.println("Testing answers...");
            for (Answer answer : answers)
            {
              System.out.println(answer.getTitle());
            }

            newQuestion.setAnswers(answers);

            questions.add(newQuestion);
        }
        return questions;
    }
}
