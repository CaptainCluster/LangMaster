package com.example.backend.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found."));
    }

    /**
     * Handling the given User object.
     * Uses bCrypt to hash the password and storing that hash.
     *
     * @param user The User object (most likely from request body)
     */
    public void createUser(User user) {

        // Hashing the password with bCrypt
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    public boolean checkCredentials(User loggingUser) {

        // Figuring out whether the user exists
        Optional<User> potentialUser = userRepository.findByUsername(loggingUser.getUsername());
        User foundUser = potentialUser.orElse(null);

        if (foundUser == null) {
            return false;
        }

        // Figuring out whether the passwords match. Returning the boolean.
        return BCrypt.checkpw(loggingUser.getPassword(), foundUser.getPassword());
    }

}
