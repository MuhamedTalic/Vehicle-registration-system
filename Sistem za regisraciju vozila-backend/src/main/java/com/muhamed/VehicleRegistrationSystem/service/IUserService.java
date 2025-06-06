package com.muhamed.VehicleRegistrationSystem.service;

import java.util.List;

import com.muhamed.VehicleRegistrationSystem.model.User;

public interface IUserService {
    List<User> getUsers();

    User getUserById(Long userId);

    User getUserByUserName(String userName);

    void addUser(User user);

    void deleteUser(Long userId);

    void updateUserPassword(Long userId, String oldPassword, String newPassword);
}
