package com.example.backend.service;

import com.example.backend.model.Answer;
import com.example.backend.model.Question;
import com.example.backend.repository.AnswerRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.result.AnswerResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

@Service
public class AnswerService
{
    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Set<Answer> getAnswersFromQuestion(Question question)
    {
        return question.getPossibleAnswers();
    }

    public Set<Answer> getAnswersFromQuestionId(long questionId)
    {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElse(null);
        if (question == null)
        {
            return Collections.emptySet();
        }
        return question.getPossibleAnswers();
    }

    public Answer getAnswerById(long id)
    {
        return answerRepository.findById(id).orElse(null);
    }

    public Set<AnswerResult> formatToResult(Set<Answer> answers)
    {
        Set<AnswerResult> answerResults = Collections.emptySet();
        for (Answer answer : answers)
        {
            AnswerResult answerResult = new AnswerResult(answer.getId(), answer.getContent());
            answerResults.add(answerResult);
        }
        return answerResults;
    }
}