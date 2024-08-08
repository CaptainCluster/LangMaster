package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService
{
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long id)
    {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found."));
    }

    /**
     * Handling the given User object.
     * Uses bCrypt to hash the password and storing that hash.
     *
     * @param user The User object (most likely from request body)
     */
    public void createUser(User user)
    {
        User newUser = new User();
        newUser.setUsername(user.getUsername());

        // Hashing the password with bCrypt
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
    }

    /**
     * Making sure the credentials are valid for successful authentication.
     * @param loggingUser The user object with the credentials
     */
    public boolean checkCredentials(User loggingUser)
    {

        // Figuring out whether the user exists
        Optional<User> potentialUser = userRepository.findByUsername(loggingUser.getUsername());
        User foundUser = potentialUser.orElse(null);

        if (foundUser == null)
        {
            return false;
        }

        // Figuring out whether the passwords match. Returning the boolean.
        return BCrypt.checkpw(loggingUser.getPassword(), foundUser.getPassword());
    }

    public User findMatchingUser(String username)
    {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.orElse(null);
    }
}
