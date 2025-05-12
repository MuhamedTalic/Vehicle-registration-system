package com.muhamed.VehicleRegistrationSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muhamed.VehicleRegistrationSystem.exception.UserAlreadyExistsException;
import com.muhamed.VehicleRegistrationSystem.exception.UserNotFoundException;
import com.muhamed.VehicleRegistrationSystem.model.User;
import com.muhamed.VehicleRegistrationSystem.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements IUserService {

	private final UserRepository userRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Override
	public User getUserById(Long userId) {
		Optional<User> userOptional = userRepository.findById(userId);
		if (!userOptional.isPresent()) {
			throw new UserNotFoundException();
		}
		return userOptional.get();
	}

	@Override
	public User getUserByUserName(String userName) {
		Optional<User> userOptional = userRepository.findUserByUserName(userName);
		if (!userOptional.isPresent()) {
			throw new UserNotFoundException();
		}
		return userOptional.get();
	}

	@Override
	public void addUser(User user) {
		Optional<User> userOptional = userRepository.findUserByUserName(user.getUserName());
		if (userOptional.isPresent()) {
			throw new UserAlreadyExistsException(user.getUserName());
		} else {
			userRepository.save(user);
		}
	}

	@Override
	public void deleteUser(Long userId) {
		boolean exists = userRepository.existsById(userId);
		if (!exists) {
			throw new IllegalStateException("Korisnik koji ima id " + userId + " ne postoji.");
		}
		userRepository.deleteById(userId);
	}

	@Override
	@Transactional
	public void updateUserPassword(Long userId, String oldPassword, String newPassword) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException());
		if (oldPassword.equals(user.getPassword()) && !newPassword.equals(oldPassword)) {
			user.setPassword(newPassword);
		}

	}

}
