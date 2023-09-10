package com.example.MessengerClone.repository;

import com.example.MessengerClone.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{ 'email': ?0}")
    public User findByEmail(String email);
}
