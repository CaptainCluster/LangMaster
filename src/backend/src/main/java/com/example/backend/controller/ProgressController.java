package com.example.backend.controller;

import com.example.backend.model.Progress;
import com.example.backend.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/progress")
public class ProgressController
{
    @Autowired
    private ProgressService progressService;

    @GetMapping("/")
    public ResponseEntity<Progress> getProgress(@RequestBody String username)
    {
        Progress progress = progressService.getProgressWithUsername(username);
        return ResponseEntity.ok(progress);
    }

    @PostMapping("/success")
    public ResponseEntity<Progress> postSuccess(@RequestBody String username)
    {
        Progress progress = progressService.getProgressWithUsername(username);
        if (progress == null)
        {
            return ResponseEntity.badRequest().build();
        }
        progressService.incrementSuccess(progress);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/fail")
    public ResponseEntity<Progress> postFail(@RequestBody String username)
    {
        Progress progress = progressService.getProgressWithUsername(username);
        if (progress == null)
        {
            return ResponseEntity.badRequest().build();
        }
        progressService.incrementFails(progress);
        return ResponseEntity.ok().build();
    }
}
