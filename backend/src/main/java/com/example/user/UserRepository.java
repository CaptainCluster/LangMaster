package com.example.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findByRegisterDate(LocalDate registerDate);
    User findByUsernameAndPassword(String username, String password);
}
