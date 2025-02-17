package com.example.backend.service;

import com.example.backend.input.QuizInput;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.repository.QuizRepository;
import com.example.backend.result.QuizResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.List;

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

    public Quiz findQuiz(String name) 
    {
        return quizRepository.findByName(name).orElse(null);
    }

    public Quiz findQuizById(long id)
    {
        return quizRepository.findById(id).orElse(null);
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
        quiz.setName(quizInput.getName());
        
        Set<Question> questions = questionService.convertInputToQuestion(quizInput.getQuestions(), quiz);
        quiz.setQuestions(questions);

        quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() 
    {
      return quizRepository.findAll(); 
    }

    
    public QuizResult convertQuizToResult(Quiz quiz) 
    {
      if (quiz == null)
      {
        return null;
      }
      QuizResult quizResult = new QuizResult (
        quiz.getName(),
        quiz.getDescription(),
        quiz.getLanguage(),
        quiz.getQuestions(),
        quiz.getReward()
      );
      return quizResult;
    }
}
