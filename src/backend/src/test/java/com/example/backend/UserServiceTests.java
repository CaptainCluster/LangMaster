package com.example.backend;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class UserServiceTests
{
    @Autowired
    UserService userService;

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
    public void testRegisterUser()
    {
        // Creating a User object
        User user = new User("xxx_testuser_360noscope_xxx", "vododooChild63#");

        // Saving the user and then retrieving the same user
        userService.createUser(user);
        User retrievedUser = userService.findMatchingUser(user.getUsername());

        Assertions.assertNotNull(retrievedUser, "User should be found in the database");
        Assertions.assertEquals(user.getUsername(), retrievedUser.getUsername(), "ERROR! Usernames do not match!");
    }
}
