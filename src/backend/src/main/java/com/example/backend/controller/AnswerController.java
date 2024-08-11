package com.example.backend.controller;

import com.example.backend.model.Answer;
import com.example.backend.result.AnswerResult;
import com.example.backend.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/answer")
public class AnswerController
{
    @Autowired
    private AnswerService answerService;

    // All the answers of one Question obj
    @GetMapping("/")
    public ResponseEntity<Set<AnswerResult>> getAnswers(long questionId)
    {
        Set<Answer> answers = answerService.getAnswersFromQuestionId(questionId);
        if (answers.isEmpty())
        {
            return ResponseEntity.badRequest().build();
        }
        Set<AnswerResult> answerResults = answerService.formatToResult(answers);
        return ResponseEntity.ok(answerResults);
    }

    // Receiving an Answer obj from the client. Sending boolean based on whether
    // the answer is correct or not.
    @PostMapping("/")
    public ResponseEntity<Boolean> postAnswer(@RequestBody long answerId)
    {
        Answer answer = answerService.getAnswerById(answerId);

        // Bad request if no Answer obj with the id exists
        if (answer == null)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(answer.getIsCorrect());
    }
}
