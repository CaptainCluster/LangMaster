package com.example.backend.service;

import com.example.backend.input.AnswerInput;
import com.example.backend.model.Answer;
import com.example.backend.model.Question;
import com.example.backend.repository.AnswerRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.result.AnswerResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
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
        return question.getAnswers();
    }

    public Set<Answer> getAnswersFromQuestionId(long questionId)
    {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElse(null);
        if (question == null)
        {
            return new HashSet<>();
        }
        return question.getAnswers();
    }

    public Answer getAnswerById(long id)
    {
        return answerRepository.findById(id).orElse(null);
    }

    public Set<AnswerResult> formatToResult(Set<Answer> answers)
    {
        Set<AnswerResult> answerResults = new HashSet<>();
        for (Answer answer : answers)
        {
            AnswerResult answerResult = new AnswerResult(answer.getId(), answer.getTitle());
            answerResults.add(answerResult);
        }
        return answerResults;
    }

    public Set<Answer> convertInputsToAnswers(Set<AnswerInput> answerInputs, Question question)
    {
        Set<Answer> answers = new HashSet<>();
        for (AnswerInput answerInput : answerInputs)
        {
            Answer newAnswer = new Answer();
            newAnswer.setTitle(answerInput.getTitle());
            newAnswer.setIsCorrect(answerInput.getIsCorrect());
            newAnswer.setQuestion(question);
            answers.add(newAnswer);
        }
        return answers;
    }
}
