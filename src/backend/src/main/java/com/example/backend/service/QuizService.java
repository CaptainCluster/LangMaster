package com.example.backend.service;

import com.example.backend.input.QuizInput;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionService questionService;

    /**
     * Creating a Quiz object and saving it
     * @param name The name of the quiz
     */
    public boolean createQuiz(String name)
    {
        for (Quiz existingQuiz : quizRepository.findAll())
        {
            if (existingQuiz.getName().equals(name))
            {
                return false;
            }
        }
        Quiz newQuiz = new Quiz(name);
        quizRepository.save(newQuiz);
        return true;
    }

    public Quiz findQuiz(String name) {
        return quizRepository.findByName(name).orElse(null);
    }

    public Set<Question> findQuizzes(String quizName) {

        Optional<Quiz> optionalQuiz = quizRepository.findByName(quizName);
        if (optionalQuiz.isEmpty())
        {
            return null;
        }
        Quiz quiz = optionalQuiz.get();
        return quiz.getQuestions();
    }

    public void deleteQuiz(Quiz quiz)
    {
        quizRepository.delete(quiz);
    }

    public void addQuestions(Quiz quiz, Set<Question> questions)
    {
        for (Question question : questions)
        {
            quiz.getQuestions().add(question);
        }
        quizRepository.save(quiz);
    }

    public void removeQuestions(Quiz quiz, Set<Question> questions)
    {
        for (Question question : questions)
        {
            quiz.getQuestions().remove(question);
        }
        quizRepository.save(quiz);
    }

    public void putContentToQuiz(Quiz quiz, QuizInput quizInput)
    {
        quiz.setName(quizInput.getTitle());

        Set<Question> questions = questionService.convertInputToQuestion(quizInput.getQuestions());
        quiz.setQuestions(questions);

        quizRepository.save(quiz);
    }
}
