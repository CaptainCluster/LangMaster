package com.example.backend;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.transaction.Transactional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class QuizServiceTests 
{
  
  @BeforeAll
  public static void setUp()
  {
    Dotenv dotenv = Dotenv.load();
    System.setProperty("DB_HOST", dotenv.get("DB_HOST"));
    System.setProperty("DB_PORT", dotenv.get("DB_PORT"));
    System.setProperty("DB_NAME", dotenv.get("DB_NAME"));
    System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
    System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
  }

  @Transactional
  @Test
  public void testCreateNullQuiz()
  {

  }

  @Transactional
  @Test
  public void testCreateEmptyNameQuiz()
  {

  }

  @Transactional
  @Test
  public void testFindEmptyNameQuiz()
  {

  }

  @Transactional
  @Test
  public void testFindCreatedQuiz()
  {

  }

  @Transactional
  @Test
  public void testDeleteCreatedQuiz()
  {

  }

  @Transactional
  @Test 
  public void testAlterQuizName()
  {

  }

  @Transactional 
  public void testPutQuestionInQuiz()
  {

  }
  
  @Transactional
  @Test
  public void testPutNullQuestionInQuiz()
  {

  }
}
