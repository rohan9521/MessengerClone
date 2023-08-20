package com.example.MessengerClone.repository;

import com.example.MessengerClone.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface UserRepository extends MongoRepository<User, String> {
}
