package com.example.MessengerClone.controller;

import com.example.MessengerClone.model.User;
import com.example.MessengerClone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;


    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/saveUser")
    public ResponseEntity<User> saveUser(@RequestBody User user){
       User savedUser = userService.saveUser(user);
       return ResponseEntity.ok(savedUser);
    }

    @DeleteMapping("/deleteAllUsers")
    public ResponseEntity<String> deleteAll(){
            userService.deleteAllUsers();
        return ResponseEntity.ok("DeletedAll");
    }

}
