package com.example.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findByRegisterDate(LocalDate registerDate);
    User findByUsernameAndPassword(String username, String password);
}
