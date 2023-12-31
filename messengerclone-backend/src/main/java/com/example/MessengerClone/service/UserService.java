package com.example.MessengerClone.service;

import com.example.MessengerClone.model.User;
import com.example.MessengerClone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User saveUser(User user) {
       return userRepository.save(user);
    }

    public void deleteAllUsers(){
         userRepository.deleteAll();
    }
}
