package com.example.MessengerClone.service;

import com.cloudinary.Cloudinary;
import com.example.MessengerClone.model.ProfileImageRequest;
import com.example.MessengerClone.model.User;
import com.example.MessengerClone.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    Cloudinary cloudinary;

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User saveUser(User user) {
       return userRepository.save(user);
    }

    public void deleteAllUsers(){
         userRepository.deleteAll();
    }
    public Optional<User> getUserById(String userId){
        return userRepository.findById(userId);
    }
    public List<User> getUsersByIds(List<String> userIdList){
      return  userIdList
                .stream()
                .map(userId->{
                    Optional<User> user = userRepository.findById(userId);
                    return user.orElse(null);
                })
                .collect(Collectors.toList());

    }
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public Optional<Map> uploadImage(MultipartFile image)  {
        Optional<Map> optionalMap = Optional.empty();
        try {
            Map map = cloudinary.uploader().upload(image.getBytes(),Map.of());
            optionalMap = Optional.ofNullable(map);
        }catch (Exception e){
          logger.info(e.getMessage());
        }
        return optionalMap;
    }

    public Optional<User> saveUserProfileUrl(ProfileImageRequest profileImageRequest) throws Exception {
        if(profileImageRequest.getProfileImageUrl() == "" || profileImageRequest.getUserId()=="")
            throw new Exception("Image url or userid is not present");
        Optional<User> optionalUser = userRepository.findById(profileImageRequest.getUserId());
        if(optionalUser.isPresent()){
            optionalUser.get().setImageUrl(profileImageRequest.getProfileImageUrl());
            userRepository.save(optionalUser.get());

        }
        return optionalUser;
    }
}
