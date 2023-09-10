package com.example.MessengerClone.controller;

import com.example.MessengerClone.model.ProfileImageRequest;
import com.example.MessengerClone.model.RequestUserIdList;
import com.example.MessengerClone.model.User;
import com.example.MessengerClone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

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
    @PostMapping("/getUsersByIds")
    public ResponseEntity<List<User>> getUsersByIds(@RequestBody RequestUserIdList userIdList){
        return ResponseEntity.ok(userService.getUsersByIds(userIdList.getUserIdList()));
    }

    @GetMapping("/getUserByEmail/{email}")
    public ResponseEntity<User> getUsersByIds(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        return ResponseEntity.of(userService.getUserById(id));
    }
    @PostMapping("/uploadprofileimage")
    public ResponseEntity<Map> uploadImage(@RequestParam("Image") MultipartFile image){
        System.out.println("UploadImage");
        return ResponseEntity.of(userService.uploadImage(image));
    }
    @PostMapping("/setprofileimage")
    public ResponseEntity<User> uploadImage(@RequestBody ProfileImageRequest profileImageRequest) throws Exception {
        System.out.println("UploadImage");
        return ResponseEntity.of(userService.saveUserProfileUrl(profileImageRequest));
    }
}
