package com.example.backend;

import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {



	@Autowired
	UserRepository userRepository;

	/**
	 * Testing whether the user registration works or not
	 *
	 * Creates a User object, defines the same object when saving,
	 * and again when retrieving the saved User.
	 *
	 * Compares the objects to see if the objects contain the same
	 * data. If they do, registration was successful.
	 */
	@Test
	public void testRegisterUser() {

		// Creating a User object
		User user = new User();
		user.setUsername("xxx_testuser_360noscope_xxx");
		user.setPassword("voodooChild63#");

		// Saving the user and then retrieving the same user
		User savedUser = userRepository.save(user);
		User retrievedUser = userRepository.findByUsernameAndPassword(savedUser.getUsername(), savedUser.getPassword());

		// Making sure the credentials match
		Assertions.assertEquals(savedUser.getUsername(), retrievedUser.getUsername());
		Assertions.assertEquals(savedUser.getPassword(), retrievedUser.getPassword());

		userRepository.delete(retrievedUser);
	}
}
